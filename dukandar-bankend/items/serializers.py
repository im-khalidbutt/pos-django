from rest_framework import serializers
from .models import ItemCategory
from django.core.validators import validate_email

class ItemCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCategory
        fields = ['name','uuid', 'is_archived']
        # read_only_fields = ['id', 'slug', 'created_at', 'updated_at', 'is_deleted']