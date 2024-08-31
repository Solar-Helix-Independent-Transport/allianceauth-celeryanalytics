from django.db import models


class CeleryTaskCompleted(models.Model):
    task = models.CharField(max_length=500, help_text="This is the Full path to the python function module.name. Not the Celery Registered Task name")
    result = models.TextField()
    time = models.DateTimeField()
    runtime = models.FloatField(default=0)

    def __str__(self):
        return "{} completed at: {}".format(self.task, self.time.strftime("%Y-%m-%d %H:%M:%S"))

    class Meta:
        indexes = (
            models.Index(fields=['task']),
            models.Index(fields=['time'])
        )


class CeleryTaskFailed(models.Model):
    task = models.CharField(max_length=500, help_text="This is the Full path to the python function module.name. Not the Celery Registered Task name")
    excep = models.TextField()
    trace = models.TextField()
    time = models.DateTimeField()
    runtime = models.FloatField(default=0)

    def __str__(self):
        return "{} failed at: {} with error {}".format(self.task, self.time.strftime("%Y-%m-%d %H:%M:%S"), self.excep)

    class Meta:
        indexes = (
            models.Index(fields=['task']),
            models.Index(fields=['time'])
        )
