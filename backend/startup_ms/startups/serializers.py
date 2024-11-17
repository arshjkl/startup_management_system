from rest_framework.serializers import ModelSerializer

from .models import Startup, Employee, Job

from users.serializers import ProfileSerializer


class StartupListSerializer(ModelSerializer):
        
    class Meta:
        model = Startup
        fields = ["static_id","name","founding_date","domain","valuation","description"]
        read_only_fields = ["static_id"]


class StartupCreateSerializer(ModelSerializer):
    
    class Meta:
        model = Startup
        fields = ["name","founding_date","domain","valuation","description","founders","investors"]
        read_only_fields = ["founders"]
        
    def create(self,validated_data):
        founder = self.context["request"].user.profile
        if founder.user_type.upper() != "FOUNDER":
            raise Exception("Only founders can create startups")
        startup = Startup.objects.create(**validated_data)
        startup.founders.add(founder)
        return startup
    

class StartupDetailSerializer(ModelSerializer):
    
    founders = ProfileSerializer(many=True)
    
    class Meta:
        model = Startup
        fields = "__all__"
        
        
class EmployeeSerializer(ModelSerializer):
    
    class Meta:
        model = Employee
        fields = "__all__"
        read_only_fields = ["static_id"]
        
class JobSerializer(ModelSerializer):
    
    class Meta:
        model = Job
        fields = "__all__"
        read_only_fields = ["static_id"]