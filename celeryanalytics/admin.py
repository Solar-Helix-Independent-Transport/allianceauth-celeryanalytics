from django.contrib import admin

# Register your models here.
from .models import CeleryTaskCompleted, CeleryTaskFailed
from .app_settings import CA_LOG_SUCCESS_TO_DB, CA_LOG_FAILURE_TO_DB

class FailedAdmin(admin.ModelAdmin):
    list_display=('task', 'time', 'excep')
    date_hierarchy = 'time'
    list_filter=('task',)

class CompleteAdmin(admin.ModelAdmin):
    list_display=('task', 'time')
    date_hierarchy = 'time'
    list_filter=('task',)

if CA_LOG_SUCCESS_TO_DB:
    admin.site.register(CeleryTaskCompleted, CompleteAdmin)
if CA_LOG_FAILURE_TO_DB:
    admin.site.register(CeleryTaskFailed, FailedAdmin)
