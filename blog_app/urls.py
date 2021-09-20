from django.conf.urls import url
from rest_framework_simplejwt import views as jwt_views
from django.urls import path
from .views import (
    UpdateBlogAPI,
    ListUserBlogsAPI,
    ListAllBlogsAPI,
    HelloView,
    ListUserBlogsAPI, 
    UserRegister, 
    GetAllUsers,
    CreateBlogAPI
)
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('hello/', HelloView.as_view(), name='hello'),
    path('register/', UserRegister.as_view(), name='register'),
    path('users/', GetAllUsers.as_view(), name='users'),
    path('login/', jwt_views.TokenObtainPairView.as_view(), name="login"),
    path('refresh/', jwt_views.TokenRefreshView.as_view(), name="token_refresh"),
    path('user-blogs/', ListUserBlogsAPI.as_view(), name='all_blogs'),
    path('all-blogs/', ListAllBlogsAPI.as_view(), name='user_blogs'),
    path('blog/<int:id>/', UpdateBlogAPI.as_view(), name='update_blog'),
    path('add-blog/', CreateBlogAPI.as_view(), name='new-blog'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
