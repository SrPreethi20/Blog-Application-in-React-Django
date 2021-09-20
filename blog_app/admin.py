from blog_app.serializers import BlogSerializer
from django.contrib import admin
from .models import Blog

# Register your models here.
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'status', 'author', 'created_on')
    list_filter = ('author',)
    search_fields = ('title', 'content'),
    prepopulated_fields = ({'slug': ('title',)})

admin.site.register(Blog, BlogAdmin)
