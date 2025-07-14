
from django.shortcuts import render, get_object_or_404

from django.core.exceptions import ObjectDoesNotExist
from rest_framework.views import APIView
from shops.models import Shop, ShopUser
# from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from shops.serializers import ShopListSerializer, ShopSerializer


class ShopListView(APIView):
    # permission_classes = [IsAuthenticated]
    
    def  get(self, request):
        if request.user.is_shop_owner:
            shop_user = ShopUser.objects.get(user__id=request.user.id)
            querySet = Shop.objects.filter(id=shop_user.shop.id,is_deleted=False)
            response_data = ShopListSerializer(querySet, many=True).data
            return Response(response_data, status=status.HTTP_200_OK)
        else:
            querySet = Shop.objects.filter(is_deleted=False).order_by("-created_at")
            response_data = ShopListSerializer(querySet, many=True).data
            return Response(response_data, status=status.HTTP_200_OK)
        
    
    def post(self, request, *args, **kwargs):
        serializer = ShopSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "Shop created successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(
            {"errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    def delete(self, request, *args, **kwargs):
        shop_uuid = request.data.get('shop_uuid')
        try:
            Shop.objects.get(id=shop_uuid).delete()
        except ObjectDoesNotExist:
            return Response(
                {
                    "errors": "Shop doesn't exist."
                }
            )
        return Response(
            {"message": "Shop deleted successfully...!!!"},
            status=status.HTTP_200_OK
        )


class ShopDeltailsView(APIView):
    def get(self, request, shop_uuid):
        querySet = Shop.objects.get(id=shop_uuid,is_deleted=False)
        response_data = ShopSerializer(querySet).data

        # response_data = ShopListSerializer(querySet, many=True).data
        return Response(response_data, status=status.HTTP_200_OK)
    
    def post(self, request, shop_uuid):
        try:
            shop = Shop.objects.get(id=shop_uuid)
            shop.is_deleted = True
            shop.is_active = False
            shop.save()
        except Shop.DoesNotExist:
            return Response(
                {
                    "errors": "Shop doesn't exist."
                }
            )
        return Response(
            {"message": "Shop deleted successfully...!!!"},
            status=status.HTTP_200_OK
        )

    def put(self, request, shop_uuid):
        payload = request.data
        try:
            shop = Shop.objects.get(id=shop_uuid)
            shop.name = payload.get('name')
            shop.address = payload.get('address')
            shop.email = payload.get('email')
            shop.description = payload.get('description')
            shop.is_active = payload.get('is_active')
            shop.phone = payload.get('phone')
            shop.save()
        except Shop.DoesNotExist:
            return Response(
                {
                    "errors": "Shop doesn't exist."
                }
            )
        return Response(
            {"message": "Shop updated successfully...!!!"},
            status=status.HTTP_200_OK
        )

class ShopActivateView(APIView):
    def post(self, request, shop_uuid):
        try:
            shop = Shop.objects.get(id=shop_uuid)
            shop.is_deleted = False
            shop.is_active = True
            shop.save()
        except Shop.DoesNotExist:
            return Response(
                {
                    "errors": "Shop doesn't exist."
                }
            )
        return Response(
            {"message": "Shop activeated successfully...!!!"},
            status=status.HTTP_200_OK
        )
        