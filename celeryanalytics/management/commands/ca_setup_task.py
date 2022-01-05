from django.core.management.base import BaseCommand, CommandError
from django_celery_beat.models import CrontabSchedule, PeriodicTask

class Command(BaseCommand):
    help = 'Setup and Reset the Celery Analytics Tasks schedules'

    def add_arguments(self, parser):
        parser.add_argument('--inline', action='store_true',
                            help='Run update in this Console not via Celery')

    def handle(self, *args, **options):
        schedule_hk, _ = CrontabSchedule.objects.get_or_create(minute='0',
                                                                hour='11',
                                                                day_of_week='*',
                                                                day_of_month='*',
                                                                month_of_year='*',
                                                                timezone='UTC'
                                                                )


        housekeeping = PeriodicTask.objects.update_or_create(
            task='celeryanalytics.tasks.run_housekeeping',
            defaults={
                'crontab': schedule_hk,
                'name': 'Celery Analyitics Housekeeping',
                'enabled': True,
                'priority': 9
            }
        )

        self.stdout.write("Added housekeeping task to run daily at Down Time 1100 UTC")
        self.stdout.write("You can change the run time from within the periodic tasks menu in auth > admin > periodic tasks")