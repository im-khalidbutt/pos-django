from django.contrib import admin
from items.models import Item, ItemCategory
# Register your models here.


admin.site.register(Item)
admin.site.register(ItemCategory)