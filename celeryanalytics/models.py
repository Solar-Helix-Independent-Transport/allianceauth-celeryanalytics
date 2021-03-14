from django.db import models


class CeleryTaskCompleted(models.Model):
    task = models.CharField(max_length=500)
    result = models.TextField()
    time = models.DateTimeField()
    runtime = models.FloatField(default=0)
    def __str__(self):
        return "%s completed at: %s" % (self.task, self.time.strftime("%Y-%m-%d %H:%M:%S"))

    class Meta:
        indexes = (
            models.Index(fields=['task']),
            models.Index(fields=['time'])
        )


class CeleryTaskFailed(models.Model):
    task = models.CharField(max_length=500)
    excep = models.TextField()
    trace = models.TextField()
    time = models.DateTimeField()
    runtime = models.FloatField(default=0)

    def __str__(self):
        return "%s failed at: %s with error %s" % (self.task, self.time.strftime("%Y-%m-%d %H:%M:%S"), self.excep)

    class Meta:
        indexes = (
            models.Index(fields=['task']),
            models.Index(fields=['time'])
        )

