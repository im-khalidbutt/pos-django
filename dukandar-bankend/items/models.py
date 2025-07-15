import uuid
from django.db import models
from users.models import TimeStampMixin
from shops.models import Shop, Category, Company
# Create your models here.


class ItemCategory(TimeStampMixin):
    name = models.CharField(max_length=255)
    is_archived = models.BooleanField(default=False)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    shop = models.ForeignKey(
        Shop, on_delete=models.CASCADE, related_name="shop_item_cat", null=True, blank=True, default=None
    )
    shop_category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="shopcat_item_cat", default=None, blank=True, null=True
    )
    order = models.IntegerField(default=1)

    def __str__(self):
        return self.name




class Item(TimeStampMixin):
    class Meta:
        ordering = ('-created_at',)

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    # parent = models.ForeignKey('self', blank=True, null=True, 
    #                            related_name='children', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company, on_delete=models.DO_NOTHING,
                                related_name="company_items",
                                null=True, blank=True)
    item_category = models.ForeignKey(ItemCategory,
                                      on_delete=models.CASCADE,
                                      related_name="category_items",
                                      default=None, null=True,
                                      blank=True,
                                      )
    shop = models.ForeignKey(Shop, on_delete=models.CASCADE,
                             related_name="shop_items" )
    quantity = models.IntegerField()
    buying_price = models.DecimalField(decimal_places=2, max_digits=10)
    selling_price = models.DecimalField(decimal_places=2, max_digits=10)
    description = models.TextField(null=True, blank=True)
    bar_code = models.CharField(max_length=20, null=True, blank=True)
    supply_rate = models.DecimalField(decimal_places=2, max_digits=10, null=True, blank=True)
    is_archived = models.BooleanField(default=False)
    publish = models.BooleanField(default=True)
    tax = models.DecimalField(
        default=0.00, decimal_places=2, max_digits=10, null=True, blank=True
    )
    formula = models.CharField(max_length=250, null=True, blank=True)
    tags = models.CharField(max_length=500, null=True, blank=True)
    variant = models.BooleanField(default=False)
    charge_tax = models.BooleanField(default=False)
    def __str__(self):
        return self.name