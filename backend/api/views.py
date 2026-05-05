from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .schemas import PlantRequest
from .exceptions import InvalidIdError
from . import services

class PlantViewSet(ViewSet):
    def list(self, request):
        # GET /api/plants/
        response = {}
        try:
            response["plants"] = services.get_all_plants()
            return Response(response, status=status.HTTP_200_OK)
        except Exception as e:
            response["error"] = str(e)
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def create(self, request):
        # POST /api/plants/
        response = {}
        try:
            plant_data = PlantRequest(**request.data)
        except Exception as e:
            response["error"] = str(e)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            new_plant = services.create_plant(plant_data)
            response["plant"] = new_plant
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            response["error"] = str(e)
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def retrieve(self, request, pk=None):
        # GET /api/plants/:id/
        response = {}
        if not pk:
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            response["plant"] = services.get_plant(pk)
            if not response["plant"]:
                response["error"] = "Plant requested could not be found"
                return Response(response, status=status.HTTP_404_NOT_FOUND)
            return Response(response, status=status.HTTP_200_OK)   
        except InvalidIdError as e:
            response["error"] = str(e)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            response["error"] = str(e)
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, pk=None):
        # DELETE /api/plants/:id/
        response = {}
        try:
            response["deleted_count"] = services.delete_plant(pk)  
            if response["deleted_count"] == 0:
                response["error"] = "Plant requested for deletion could not be found"
                return Response(response, status=status.HTTP_404_NOT_FOUND)
            return Response(status=status.HTTP_204_NO_CONTENT) 
        except Exception as e:
            response["error"] = str(e)
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=["post"], url_path="bulk")
    def bulk_create(self, request):
        # POST /api/plants/bulk/
        response = {}
        try:
            if not isinstance(response.data, list):
                response["error"] = "Expected a list of plants"
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
            plants_data = [PlantRequest(**plant) for plant in request.data]
        except Exception as e:
            response["error"] = str(e)
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            new_plants = services.create_plants(plants_data)
            response["plants"] = new_plants
            return Response(response, status=status.HTTP_201_CREATED)
        except Exception as e:
            response["error"] = str(e)
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

