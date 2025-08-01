from django.urls import path
from shops.views import ShopListView, ShopDeltailsView, ShopActivateView, CompanyViewSet
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    # path('register/', UserViews.RegisterView.as_view()),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('shop/', ShopListView.as_view(), name='shops-list'),
    path('company/', CompanyViewSet.as_view(), name='company-list'),
    path('shop/<uuid:shop_uuid>/', ShopDeltailsView.as_view(), name='shop-details'),
    path('shop/<uuid:shop_uuid>/active', ShopActivateView.as_view(), name='shop-active'),

]