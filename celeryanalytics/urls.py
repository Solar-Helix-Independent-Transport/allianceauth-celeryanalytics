from django.conf.urls import url
from django.urls import path

from . import views

app_name = 'celery'

urlpatterns = [
    #url(r'^celery/$', views.celery_admin_view, name='celery_mon'),
]