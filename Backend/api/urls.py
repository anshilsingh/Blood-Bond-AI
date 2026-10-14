from django.urls import path
from .views import (
    get_donors,
    add_donor,
    delete_donor,
    update_donor,
    register_user,
    login_user,
    create_request
)

urlpatterns = [
    path('donors/', get_donors),
    path('add/', add_donor),
    path('delete/<int:id>/', delete_donor),
    path('update/<int:id>/', update_donor),
    path('request/', create_request),

    path('register/', register_user),
    path('login/', login_user),
]