from . import urls
from allianceauth import hooks
from allianceauth.services.hooks import UrlHook

@hooks.register('url_hook')
def register_url():
    return UrlHook(urls, 'celery', r'^celery/')