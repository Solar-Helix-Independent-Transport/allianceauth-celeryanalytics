from django.urls import re_path
from django.urls import path

from . import views
from .api import api

app_name = 'celery'

urlpatterns = [
    re_path(r'^queue/$', views.react_main, name='celery_mon'),
    re_path(r'^api/', api.urls),

]