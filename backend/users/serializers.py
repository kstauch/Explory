from rest_framework import serializers

from posts.models import Post
from .models import User, Friendship

class FriendshipSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.username')
    receiver_username = serializers.ReadOnlyField(source='receiver.username')

    class Meta:
        model = Friendship
        fields = ['id', 'sender', 'sender_username', 'receiver', 'receiver_username', 'is_accepted', 'created_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'total_points', 'profile_picture', 'bio', 'streak_count']

#turns a Django Post object into JSON with those fields
class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    class Meta:
        model = Post
        fields = ['id', 'title', 'user', 'body', 'image', 'date']