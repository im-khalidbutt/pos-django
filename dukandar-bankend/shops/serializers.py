from rest_framework import serializers
from .models import Shop, Company
from django.core.validators import validate_email

class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'
        read_only_fields = ['id', 'slug', 'created_at', 'updated_at', 'is_deleted']

    def validate_email(self, value):
        if not value or '@' not in value:
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def validate_name(self, value):
        if not value:
            raise serializers.ValidationError("Shop name is required.")
        if len(value) > 150:
            raise serializers.ValidationError("Name must be 150 characters or fewer.")
        return value

    def validate_phone(self, value):
        if value and not value.isdigit():
            raise serializers.ValidationError("Phone number must contain only digits.")
        return value

    # def validate_slug(self, value):
    #     if Shop.objects.filter(slug=value).exists():
    #         raise serializers.ValidationError("Slug must be unique.")
    #     return value


class ShopListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'
        

class CompanyListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name', 'uuid']
        # read_only_fields = ['id', 'slug', 'created_at', 'updated_at', 'is_deleted']