
import logging
from functools import wraps

from django.conf import settings
from ninja import Field, Form, NinjaAPI
from ninja.security import django_auth

import json
from celery.app import app_or_default

logger = logging.getLogger(__name__)


api = NinjaAPI(title="Celery API", version="0.0.1",
               urls_namespace='celery:api', auth=django_auth, csrf=True)#,
               #openapi_url=settings.DEBUG and "/openapi.json" or "")


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
    response={200: dict, 403: str},
    tags=["Admin"]
)
def get_queue_status(request):
    pending = {}
    if not request.user.is_superuser:
        return 403, "Permission Denied!"
    with app_or_default(None) as celery_app:
        try:
            que = [getattr(settings, 'CELERY_DEFAULT_QUEUE', 'celery')]
            routes = celery_app.conf.get("task_routes", {})
            prio_steps = celery_app.conf.get("broker_transport_options", {}).get("priority_steps", [])
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
                        _pending = {}
                        tasks = conn.default_channel.client.lrange(
                            queue_name, 0, -1)
                        try:
                            for task in tasks:
                                j = json.loads(task)
                                tsk = j['headers']['task']
                                if tsk not in _pending:
                                    _pending[tsk] = {"name":tsk, "total":0}
                                _pending[tsk]["total"] += 1
                            if len(_pending):
                                pending[queue_name] = sorted(_pending.values(), key=lambda d: d['total'], reverse=True)
                        except TypeError as e:
                            pass
        except AttributeError as e:
            pass

    return 200, pending


@api.get(
    "celery/active/",
    response={200: dict, 403: str},
    tags=["Admin"]
)
def get_tasks_active(request):
    active = {}
    if not request.user.is_superuser:
        return 403, "Permission Denied!"
    with app_or_default(None) as celery_app:
        _ap = celery_app.control.inspect()
        active = _ap.active()
    return 200, active


@api.get(
    "celery/status/",
    response={200: dict, 403: str},
    tags=["Admin"]
)
def get_tasks_status(request):
    active = {}
    if not request.user.is_superuser:
        return 403, "Permission Denied!"
    with app_or_default(None) as celery_app:
        _ap = celery_app.control.inspect().stats()
    return 200, _ap


@api.get(
    "celery/eta/",
    response={200: dict, 403: str},
    tags=["Admin"]
)
def get_tasks_scheduled(request):
    scheduled = {}
    if not request.user.is_superuser:
        return 403, "Permission Denied!"
    with app_or_default(None) as celery_app:
        _ap = celery_app.control.inspect()
        _scheduled = _ap.scheduled()
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
                    scheduled[_queue][_prio][_tsk] = 0
                scheduled[_queue][_prio][_tsk] += 1
    return 200, scheduled
