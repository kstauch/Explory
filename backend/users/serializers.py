from rest_framework import serializers

from posts.models import Post
from .models import User, Friendship


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'total_points', 'profile_picture', 'bio', 'streak_count']

class FriendshipSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)

    class Meta:
        model = Friendship
        fields = ['id', 'sender', 'receiver', 'is_accepted', 'created_at']

#turns a Django Post object into JSON with those fields so that it could transfer
#data between Django and React
class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source='user.username')
    class Meta:
        model = Post
        fields = ['id', 'title', 'user', 'body', 'image', 'date']