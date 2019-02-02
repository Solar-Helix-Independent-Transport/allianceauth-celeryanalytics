from django.contrib import admin

# Register your models here.
from .models import CeleryTaskCompleted, CeleryTaskFailed

admin.site.register(CeleryTaskCompleted)
admin.site.register(CeleryTaskFailed)

