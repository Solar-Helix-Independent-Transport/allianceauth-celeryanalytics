from django.shortcuts import render
from . import __version__

# Create your views here.
def react_main(request):
    # get available models
    return render(request, 'celeryanalytics/react_base.html', context={"version": __version__, "app_name": "celeryanalytics", "page_title": "Celery Queue"})
