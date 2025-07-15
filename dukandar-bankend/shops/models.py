import uuid
from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from users.models import TimeStampMixin
from django.db.models import Max

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
    

class Category(TimeStampMixin):
    name = models.CharField(max_length=150, unique=True)
    code = models.CharField(max_length=255, null=True, blank=True, )
    is_active = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    order = models.IntegerField(default=1)

    def save(self, *args, **kwargs):
        if not self.pk and (self.order is None or self.order == 1):
            max_order = Category.objects.aggregate(Max('order'))['order__max'] or 0
            self.order = max_order + 1
        super().save(*args, **kwargs)
        
    class Meta:
        ordering = ("order",)
        
    def __str__(self):
        return self.name
      
class Company(TimeStampMixin):
    name = models.CharField(max_length=150, unique=True)
    code = models.CharField(max_length=255, null=True, blank=True )
    retailer_name = models.CharField(max_length=150)
    retailer_email = models.CharField(max_length=255, null=True, blank=True)
    retailer_phone = models.CharField(max_length=255, default=0, blank=True)
    is_active = models.BooleanField(default=False)
    is_archived = models.BooleanField(default=False)

    def __str__(self):
        return self.name