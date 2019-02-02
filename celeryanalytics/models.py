from django.db import models


class CeleryTaskCompleted(models.Model):
    task = models.TextField()
    result = models.TextField()
    time = models.DateTimeField()

    def __str__(self):
        return "%s completed at:%s"(str(self.task), self.time.strftime("%Y-%m-%d %H:%M:%S"))


class CeleryTaskFailed(models.Model):
    task = models.TextField()
    excep = models.TextField()
    trace = models.TextField()
    time = models.DateTimeField()

    def __str__(self):
        return "%s failed at:%s with error %s"(str(self.task), self.time.strftime("%Y-%m-%d %H:%M:%S"), excep)
