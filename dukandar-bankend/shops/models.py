import uuid
from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from users.models import TimeStampMixin
# Create your models here.
class Shop(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    slug = models.SlugField(max_length=255, unique=True, null=True, blank=True)
    name = models.CharField(max_length=150)
    email = models.CharField(max_length=150)
    phone = models.CharField(max_length=15, null=True, blank=True)
    address = models.CharField(max_length=500)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    is_deleted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Shop.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.slug = slug
        super().save(*args, **kwargs)
        
    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

class ShopUser(TimeStampMixin):
    shop = models.ForeignKey(
        Shop,
        on_delete=models.CASCADE,
        related_name="shops_users",
    )
    user = models.OneToOneField(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="user_shop"
    )

    def __str__(self):
        return self.shop.name + " " + self.user.name

    is_archived = models.BooleanField(default=False)