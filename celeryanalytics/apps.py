from django.apps import AppConfig

class CeleryAnalyticsConfig(AppConfig):
    name = 'celeryanalytics'
    label = 'celeryanalytics'

    def ready(self):
        import celeryanalytics.signals
