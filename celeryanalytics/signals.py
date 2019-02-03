from celery.signals import task_failure, task_success
from .models import CeleryTaskCompleted, CeleryTaskFailed
from django.utils import timezone
import datetime
import traceback as tb



@task_failure.connect
def process_failure_signal(exception, traceback, sender, task_id,
                           signal, args, kwargs, einfo, **kw):
    print("Celery task_failure! %s" % sender.__class__.__name__ , flush=True)
    CeleryTaskFailed.objects.create(task = sender.__class__.__name__,
                                    time=datetime.datetime.utcnow().replace(tzinfo=timezone.utc),
                                    excep=str(exception if exception else "Unknown"),
                                    trace=str(tb.print_tb(traceback) if traceback else "None"))


@task_success.connect
def celery_success_signal(sender, result=None, **kwargs):
    print("Celery task_success! %s" % sender.__class__.__name__ , flush=True)
    CeleryTaskCompleted.objects.create(task = sender.__class__.__name__,
                                       result=str(result),
                                       time=datetime.datetime.utcnow().replace(tzinfo=timezone.utc))