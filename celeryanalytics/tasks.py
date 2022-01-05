from celery import shared_task
from django.db import transaction
from datetime import datetime, timedelta
import pytz
from celeryanalytics.models import CeleryTaskCompleted, CeleryTaskFailed
from celeryanalytics.app_settings import CA_HOUSEKEEPING_DB_BACKLOG


@shared_task
def run_housekeeping():
    """
    Cleanup Database
    :return:
    """

    with transaction.atomic():
        CeleryTaskCompleted.objects.filter(
            time__lte=pytz.utc.localize(
                datetime.now() - timedelta(days=CA_HOUSEKEEPING_DB_BACKLOG)
            )
        ).delete()

    with transaction.atomic():
        CeleryTaskFailed.objects.filter(
            time__lte=pytz.utc.localize(
                datetime.now() - timedelta(days=CA_HOUSEKEEPING_DB_BACKLOG)
            )
        ).delete()
