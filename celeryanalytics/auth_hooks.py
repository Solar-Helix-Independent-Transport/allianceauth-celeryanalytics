from . import urls
from allianceauth import hooks
from allianceauth.services.hooks import MenuItemHook, UrlHook

"""
class CeleryMenu(MenuItemHook):
    def __init__(self):
        MenuItemHook.__init__(self, 'Celery',
                              'fas fa-address-book fa-fw',
                              'celery:celery_mon',
                              navactive=['celery:celery_mon'])

    def render(self, request):
        if request.user.is_superuser:
            return MenuItemHook.render(self, request)
        return ''




@hooks.register('menu_item_hook')
def register_menu():
    return CeleryMenu()


@hooks.register('url_hook')
def register_url():
    return UrlHook(urls, 'celery', r'^celery/')
"""