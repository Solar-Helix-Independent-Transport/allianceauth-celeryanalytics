from celery import shared_task
from datetime import timedelta
from django.utils import timezone
from celeryanalytics.models import CeleryTaskCompleted, CeleryTaskFailed
from celeryanalytics.app_settings import CA_HOUSEKEEPING_DB_BACKLOG


@shared_task
def run_housekeeping():
    """
    Cleanup Database
    :return:
    """

    comp_qs = CeleryTaskCompleted.objects.filter(
        time__lte=timezone.now() - timedelta(days=CA_HOUSEKEEPING_DB_BACKLOG)
    )

    if comp_qs.exists():
        comp_qs._raw_delete(comp_qs.db)

    fail_qs = CeleryTaskFailed.objects.filter(
        time__lte=timezone.now() - timedelta(days=CA_HOUSEKEEPING_DB_BACKLOG)
    )

    if fail_qs.exists():
        fail_qs._raw_delete(fail_qs.db)
