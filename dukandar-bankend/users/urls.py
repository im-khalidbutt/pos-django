from django.urls import path
from .views import Home, CurrentUserView


urlpatterns = [
    path('', Home.as_view()),
    path('currentuser/', CurrentUserView.as_view(), name='current-user'),

]