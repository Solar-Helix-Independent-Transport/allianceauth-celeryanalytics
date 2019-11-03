from django.contrib import admin

# Register your models here.
from .models import CeleryTaskCompleted, CeleryTaskFailed


class FailedAdmin(admin.ModelAdmin):
    list_display=('task', 'time', 'excep')
    date_hierarchy = 'time'
    list_filter=('task',)

class CompleteAdmin(admin.ModelAdmin):
    list_display=('task', 'time')
    date_hierarchy = 'time'
    list_filter=('task',)

admin.site.register(CeleryTaskCompleted, CompleteAdmin)
admin.site.register(CeleryTaskFailed, FailedAdmin)
