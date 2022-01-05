from django.core.management.base import BaseCommand
from celeryanalytics.tasks import run_housekeeping

class Command(BaseCommand):
    help = 'Run the Celery Analytics Housekeeping task.'

    def add_arguments(self, parser):
        parser.add_argument('--task', action='store_true',
                            help='Run update via Celery')

    def handle(self, *args, **options):
        if options.get("tasks", False):
            self.stdout.write("Cleaning up, Please wait this may take some time.")
            run_housekeeping()
        else:
            self.stdout.write("Sending Housekeeping task to the Celery Queue.")
            run_housekeeping.apply_async(priority=9)
