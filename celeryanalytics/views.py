from django.shortcuts import render
from django.contrib.auth.decorators import user_passes_test
from . import __version__

# Create your views here.
@user_passes_test(lambda u: u.is_superuser)
def react_main(request):
    # get available models
    return render(request, 'celeryanalytics/react_base.html', context={"version": __version__, "app_name": "celeryanalytics", "page_title": "Celery Queue"})
