from celery.signals import task_failure, task_success, task_prerun
from .models import CeleryTaskCompleted, CeleryTaskFailed
from django.utils import timezone
from time import time
import datetime
import traceback as tb
import logging
from . import app_settings
logger = logging.getLogger(__name__)

task_starts = {}


def _calc_runtime(task_id):
    try:
        return time() - task_starts.pop(task_id)
    except KeyError:
        return -1


@task_failure.connect
def process_failure_signal(exception, traceback, sender, task_id,
                           signal, args, kwargs, einfo, **kw):
    logger.info("Celery task_failure! %s" % sender.__class__.__name__)
    runtime = _calc_runtime(task_id)
    CeleryTaskFailed.objects.create(task = sender.__class__.__name__,
                                    time=datetime.datetime.utcnow().replace(tzinfo=timezone.utc),
                                    runtime=runtime,
                                    excep=str(exception if exception else "Unknown"),
                                    trace=str(tb.format_exc() if traceback else "None"))


@task_success.connect
def celery_success_signal(sender, result=None, **kwargs):
    logger.info("Celery task_success! %s" % sender.__class__.__name__)
    runtime = _calc_runtime(sender.request.id)
    result = str(result)
    if app_settings.CA_RESULT_MAX_LEN > 0:
        result = result[:app_settings.CA_RESULT_MAX_LEN]
        
    CeleryTaskCompleted.objects.create(task=sender.__class__.__name__,
                                       result=str(result),
                                       runtime=runtime,
                                       time=datetime.datetime.utcnow().replace(tzinfo=timezone.utc))


@task_prerun.connect
def task_prerun_handler(signal, sender, task_id, task, args, kwargs, **extras):
    task_starts[task_id] = time()
