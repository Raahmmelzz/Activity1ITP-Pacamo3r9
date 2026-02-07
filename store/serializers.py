from rest_framework import serializers
from .models import Customer, Product, Order

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    customerid = CustomerSerializer(read_only=True)
    productid = ProductSerializer(read_only=True)
    
    class Meta:
        model = Order
        fields = '__all__'
