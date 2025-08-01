from django.urls import path
from .views import ItemCategorySearchView


urlpatterns = [
    # path('shop/', ShopListView.as_view(), name='shops-list'),
    path('shop/<uuid:shop_uuid>/item-category', ItemCategorySearchView.as_view(), name='item-category'),

]