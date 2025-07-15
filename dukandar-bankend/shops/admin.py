from django.contrib import admin
from shops.models import Shop, ShopUser, Category, Company
# Register your models here.


admin.site.register(Shop)
admin.site.register(ShopUser)
admin.site.register(Category)
admin.site.register(Company)
