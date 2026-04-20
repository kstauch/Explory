from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

#makes a user with an id, username, and password which is hashed and at least 8 characters long
#also handles python to JSON
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    class Meta:
        model = User
        fields = ('id', 'username', 'password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)