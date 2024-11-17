from rest_framework import status,viewsets,generics
# Create your views here.


from .models import Startup,Employee,Job
from .serializers import EmployeeSerializer, StartupListSerializer,StartupCreateSerializer,StartupDetailSerializer,JobSerializer
from .permissions import IsFounder,IsStudent
from rest_framework.permissions import AllowAny,IsAuthenticated

class StartupListView(generics.ListAPIView):
    
    serializer_class = StartupListSerializer
    permission_classes = [IsAuthenticated]
    ordering = ["-founding_date"]
    
    def get_queryset(self):
        if self.request.user.profile.user_type == "Founder":
            return self.request.user.profile.startups.all()
        return Startup.objects.all()
    
class StartupCreateView(generics.CreateAPIView):
    
    serializer_class = StartupCreateSerializer
    permission_classes = [IsFounder]
    
class StartupDetailView(generics.RetrieveAPIView):

    serializer_class = StartupDetailSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "static_id"
    lookup_url_kwarg = "static_id"
    
    
    def get_queryset(self):
        if self.request.user.profile.user_type == "Founder":
            return self.request.user.profile.startups.all()
        return Startup.objects.all()
    
    def get_object(self):
        return self.get_queryset().get(static_id=self.kwargs["static_id"])
    
class EmployeeListCreateAPI(generics.ListCreateAPIView):
    
    serializer_class = EmployeeSerializer
    permission_classes = [IsFounder]
    
    def get_queryset(self):
        return Startup.objects.get(static_id = self.kwargs.get("static_id")).employees.all()
    
    def create(self, request, *args, **kwargs):
        request.data["startup"] = self.kwargs.get("static_id")
        return super().create(request, *args, **kwargs)
    
class EmployeeDeleteAPI(generics.DestroyAPIView):
    
    serializer_class = EmployeeSerializer
    permission_classes = [IsFounder]
    lookup_field = "static_id"
    lookup_url_kwarg = "static_id"
    queryset = Employee.objects.all()


class JobListCreateAPI(generics.ListCreateAPIView):
        
        serializer_class = JobSerializer
        permission_classes = [IsAuthenticated]
        
        def get_queryset(self):
            return Startup.objects.get(static_id = self.kwargs.get("static_id")).jobs.all()
        
        def create(self, request, *args, **kwargs):
            request.data["startup"] = self.kwargs.get("static_id")
            return super().create(request, *args, **kwargs)


class JobDeleteAPI(generics.DestroyAPIView):
        
        serializer_class = JobSerializer
        permission_classes = [IsFounder]
        lookup_field = "static_id"
        lookup_url_kwarg = "static_id"
        queryset = Job.objects.all()
