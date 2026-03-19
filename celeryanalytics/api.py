
import logging
from functools import wraps

from django.conf import settings
from ninja import Field, Form, NinjaAPI
from ninja.security import django_auth

import json
from celery.app import app_or_default

logger = logging.getLogger(__name__)


api = NinjaAPI(title="Celery API", version="0.0.1",
               urls_namespace='celery:api', auth=django_auth)  # ,
# openapi_url=settings.DEBUG and "/openapi.json" or "")


def cache_page_data(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        print(f)
        out = f(*args, **kwargs)
        print(out)
        return out
    return decorator


@api.get(
    "celery/queue/",
    response={200: list, 403: str},
    tags=["Admin"]
)
def get_queue_status(request):
    if not request.user.is_superuser:
        return 403, "Permission Denied!"
    pending = {}
    with app_or_default(None) as celery_app:
        try:
            que = [getattr(settings, 'CELERY_DEFAULT_QUEUE', 'celery')]
            routes = celery_app.conf.get("task_routes", {})
            prio_steps = celery_app.conf.get(
                "broker_transport_options", {}).get("priority_steps", [])
            for r, q in routes.items():
                if q['queue'] not in que:
                    que.append(q['queue'])
            for queue_info in que:
                queue_prefix = queue_info
                _join_str = "\x06\x16"
                queues = [f"{queue_prefix}"]
                for q_prio in prio_steps:
                    queues.append(f"{queue_prefix}{_join_str}{q_prio}")
                with celery_app.pool.acquire(block=True) as conn:
                    for queue_name in queues:
                        try:
                            _pending = {}
                            tasks = conn.default_channel.client.lrange(
                                queue_name,
                                0, 
                                -1
                            )
                            for task in tasks:
                                j = json.loads(task)
                                tsk = j['headers']['task']
                                if tsk not in _pending:
                                    _pending[tsk] = {"name": tsk, "total": 0}
                                _pending[tsk]["total"] += 1
                            if len(_pending):
                                _qn = queue_name.split(_join_str)
                                if _qn[0] not in pending:
                                    pending[_qn[0]] = {}
                                _pri = 0
                                if len(_qn) > 1:
                                    _pri = _qn[1]
                                pending[_qn[0]][_pri] = sorted(
                                    _pending.values(),
                                    key=lambda d: d['total'],
                                    reverse=True
                                )
                        except TypeError as e:
                            pass
        except AttributeError as e:
            pass

    output = []
    for q, p in pending.items():
        _q = {
            "name": q,
            "queues": []
        }
        for _p, _it in p.items():
            _q["queues"].append(
                {
                    "name": _p,
                    "tasks": _it
                }
            )
        output.append(_q)
    return 200, output


@api.get(
    "celery/active/",
    response={200: list, 403: str},
    tags=["Admin"]
)
def get_tasks_active(request):
    active = []
    if not request.user.is_superuser:
        return 403, "Permission Denied!"
    with app_or_default(None) as celery_app:
        _ap = celery_app.control.inspect()
        try:
            _act = _ap.active()
            for w, d in _act.items():
                _tasks = []
                for t in d:
                    args = ", ".join(map(str, t['args']))
                    kwargs = ", ".join(
                        [f'{key}={value}' for key, value in t['kwargs'].items()])
                    if len(kwargs):
                        args += ", "
                    _tasks.append(
                        {
                            "name":t['name'],
                            "args": f"[{args}]",
                            "kwargs": f"({kwargs})"
                        }
                    )
                if len(_tasks):
                    active.append({
                        "name": w[7:],
                        "tasks": _tasks
                    })
        except Exception as e:
            logger.exception(e)
    return 200, active


@api.get(
    "celery/status/",
    response={200: list, 403: str},
    tags=["Admin"]
)
def get_worker_status(request):
    workers = []
    if not request.user.is_superuser:
        return 403, "Permission Denied!"
    with app_or_default(None) as celery_app:
        _in = celery_app.control.inspect()
        _ap = _in.stats()
        _aq = _in.active_queues()
        if _ap:
            for w, d in _ap.items():
                _t = 0
                for t, c in d['total'].items():
                    _t += c
                _w = {
                    "name": w[7:],
                    "fields": [],
                }
                _w["fields"].append(
                    ["Total Tasks", _t]
                )
                _w["fields"].append(
                    ["Up Time", d['uptime']]
                )
                _w["fields"].append(
                    ["Type", d['pool']["implementation"].split(":")[0].split(".")[-1]]
                )
                _w["fields"].append(
                    ["Concurrency", d['pool']["max-concurrency"]]
                )
                if _aq:
                    for _q in _aq.get(w, []):
                        _w["fields"].append(
                            ["Queue", _q['name']]
                        )
                workers.append(_w)
    return 200, sorted(workers, key=lambda item: item["name"])


@api.get(
    "celery/eta/",
    response={200: list, 403: str},
    tags=["Admin"]
)
def get_tasks_scheduled(request):
    scheduled = {}
    if not request.user.is_superuser:
        return 403, "Permission Denied!"
    with app_or_default(None) as celery_app:
        _ap = celery_app.control.inspect()
        _scheduled = _ap.scheduled()
        try:
            for q, tasks in _scheduled.items():
                for t in tasks:
                    _tsk = t['request']['type']
                    _queue = t['request']['delivery_info']['routing_key']
                    _prio = t['priority']
                    if _queue not in scheduled:
                        scheduled[_queue] = {}
                    if _prio not in scheduled[_queue]:
                        scheduled[_queue][_prio] = {}
                    if _tsk not in scheduled[_queue][_prio]:
                        scheduled[_queue][_prio][_tsk] = {"name": _tsk, "total": 0}
                    scheduled[_queue][_prio][_tsk]["total"] += 1
        except Exception as e:
            logger.exception(e)
            
    output = []
    for q, p in scheduled.items():
        _q = {
            "name": q,
            "queues": []
        }
        for _p, _it in p.items():
            _q["queues"].append(
                {
                    "name": _p,
                    "tasks": list(_it.values())
                }
            )
        output.append(_q)

    return 200, output
