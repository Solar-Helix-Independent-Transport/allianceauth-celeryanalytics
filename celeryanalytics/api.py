
import logging
from functools import wraps

from django.conf import settings
from ninja import Field, Form, NinjaAPI
from ninja.security import django_auth

import json
from celery.app import app_or_default

logger = logging.getLogger(__name__)


api = NinjaAPI(title="Celery API", version="0.0.1",
               urls_namespace='celery:api', auth=django_auth, csrf=True,
               openapi_url=settings.DEBUG and "/openapi.json" or "")


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
def get_character_status(request):
    pending = {}
    if not request.user.is_superuser:
        return 403, "Permission Denied!"
    with app_or_default(None) as celery_app:
        try:
            que = [getattr(settings, 'CELERY_DEFAULT_QUEUE', 'celery')]
            try:
                for queue_info in celery_app.control.inspect().active_queues().values():
                    que.append(queue_info[0]['name'])
            except AttributeError:
                pass # just the defaults...
            for queue_info in que:
                queue_prefix = queue_info
                queues = [f"{queue_prefix}",  # TODO check the config for this and build properly...
                        f"{queue_prefix}\x06\x161",
                        f"{queue_prefix}\x06\x162",
                        f"{queue_prefix}\x06\x163",
                        f"{queue_prefix}\x06\x164",
                        f"{queue_prefix}\x06\x165",
                        f"{queue_prefix}\x06\x166",
                        f"{queue_prefix}\x06\x167",
                        f"{queue_prefix}\x06\x168",
                        f"{queue_prefix}\x06\x169"]
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
