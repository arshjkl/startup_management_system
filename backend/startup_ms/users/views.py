from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Profile,User
from django.contrib.auth import login,authenticate

# Create your views here.


class RegisterAPI(APIView):
    
    authentication_classes = []
    
    def post(self,request,*args,**kwargs):

        data = request.data

        try:
            user = User.objects.create_user(username=data["email"],email=data["email"],password=data["password"])
            profile = Profile.objects.create(user = user,user_type = data["type"])
            login(request=request,user=user)
            return Response({"message":"User registered successfully"},status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"message":"Please provide all fields"},status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"message":"Some error occured: " + str(e)},status=status.HTTP_400_BAD_REQUEST)

class LoginAPI(APIView):
    
    authentication_classes = []

    def post(self,request,*args,**kwargs):
        user = authenticate(request,**request.data)
        if user is None:
            return Response({"message":"Invalid credentials"},status=status.HTTP_400_BAD_REQUEST)
        login(request,user)
        user_type = user.profile.user_type
        return Response({"message":"Logged in successfully","user_type":user_type},status=status.HTTP_200_OK)