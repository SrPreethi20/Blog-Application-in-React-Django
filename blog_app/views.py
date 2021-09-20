from enum import auto
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import serializers, status

from .models import Blog

from .serializers import BlogSerializer
from .serializers import UserSerializer

# Create your views here.
class HelloView(APIView):
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        print('REQUEST ----------', request.headers)
        return Response({'msg': 'Hello World !!!'})


class UserRegister(APIView):
    permission_classes = (AllowAny, )
    def post(self, request):
        password = request.data['password']
        user_serializer = UserSerializer(data={**request.data})
        if user_serializer.is_valid():
            user = User.objects.create(**request.data)
            user.set_password(password)
            user.save()
            final_res = UserSerializer(user)
            return Response(data={'user': final_res.data})
        return Response({'msg': 'Create user is failed', 'error': user_serializer.errors})


class GetAllUsers(APIView):
    permssion_classes = [AllowAny, ]
    authentication_classes = []
    def get(self, request):
        users = User.objects.all()
        print('USERS-----', users)
        user_serializer = UserSerializer(users, many=True)
        return Response({'user data': user_serializer.data})


class ListUserBlogsAPI(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        print(f'request.user ----- {request.user}')
        if request.user.is_authenticated:
            print('USER NAME---', request.user)
            blogs = Blog.objects.filter(author=request.user)
            blog_serializer = BlogSerializer(blogs, many=True)
        return Response(blog_serializer.data)


class ListAllBlogsAPI(APIView):
    def get(self, request):
        blogs = Blog.objects.all()
        blog_serializer = BlogSerializer(blogs, many=True)
        return Response(blog_serializer.data)


class UpdateBlogAPI(APIView):
    def put(self, request, id=None):
        print('user ****',request.user)
        blog = Blog.objects.get(id=id)
        author = blog.author
        print('Author *****', author)
        if request.user == blog.author:
            blog_Serializer = BlogSerializer(blog, data=request.data)
            if blog_Serializer.is_valid():
                blog_Serializer.save()
                return Response(blog_Serializer.data)
            return Response(blog_Serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'msg': 'Unauthorized request'})

    def delete(self, request, id):
        blog = Blog.objects.get(id=id)
        print('USER *****', request.user)
        print('AUTHOR ****', blog.author)
        if request.user == blog.author:
            blog.delete()
            return Response({'msg': 'Blog deleted successfully'})
        return Response({'msg': 'Unauthorized request'})

    
class CreateBlogAPI(APIView):
    permission_classes = (IsAuthenticated, )
    def post(self, request):
        blog = request.data
        print('UID ****', request.user.id)
        blog_serializer = BlogSerializer(data=blog)
        if blog_serializer.is_valid():
            blog_serializer.save()
            return Response({'msg': 'Created Blog successfully'})
        return Response({'msg': 'Invalid data', 'err': blog_serializer.errors})