
from django.shortcuts import render, get_object_or_404

from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from shops.models import Shop, ShopUser, Company
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from shops.serializers import CompanyListSerializer
from items.models import ItemCategory
from items.serializers import ItemCategorySerializer

class ItemCategorySearchView(APIView):
    def get(self, request, shop_uuid):
        search = request.GET.get('search', '')
        itemcategories = ItemCategory.objects.filter(shop__id = shop_uuid, name__icontains=search)[:20]  # Limit results
        response_data = ItemCategorySerializer(itemcategories, many=True).data
        return Response(response_data, status=status.HTTP_200_OK)
