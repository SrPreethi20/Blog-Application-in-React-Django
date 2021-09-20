from django.db import models
from django.contrib.auth.models import User

# Create your models here.

STATUS = (
    (0, "Draft"),
    (1, "Publish")
)

class Blog(models.Model):
    title = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts',blank=True, null=True)
    updated_on = models.DateTimeField(auto_now=True)
    content = models.TextField(blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    status = models.IntegerField(choices=STATUS, default=0)
    img = models.ImageField(upload_to='Images/%Y/%m/%d', max_length=255, blank=True, null=True)

    class Meta:
        ordering = ['-created_on']  # show the recently added post first

    def __str__(self):
        return self.title
