from django.contrib.auth.models import User
from .models import Blog
from django.contrib.auth.models import User
from rest_framework import serializers
# from rest_framework import authenticate

class BlogSerializer(serializers.ModelSerializer):
    #  To get object from foreign key
    # author_name = serializers.CharField(source='author.username', null=True, blank=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'created_on', 'author', 'content', 'img', 'status']


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username', 'email', 'password')
        extra_kwargs = {"password":{'write_only': True}}


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(required=True, write_only=True)
    class Meta:
        model = User
        fields = ['id','username', 'password', 'email']
