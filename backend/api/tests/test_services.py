import pytest
from .conftest import PLANT, PLANTS
from api import exceptions
from api import services
from unittest.mock import patch
from api import schemas

MOCK_GOOD_ID = "67a8b2c3d4e5f6a7b8c9d0e1"
MOCK_BAD_ID = "invalid_id"

@pytest.mark.usefixtures("plants_col")
class TestGetPlant:
    def test_happy_path(self, existing_plant):
        result = services.get_plant(existing_plant)
        assert result is not None
        assert "_id" not in result
        assert result["id"] == existing_plant
        assert result["common_name"] == PLANT["common_name"]
    
    def test_invalid_id(self):
        with pytest.raises(exceptions.InvalidIdError):
            services.get_plant(MOCK_BAD_ID)
    
    def test_database_error(self):
        with patch("api.services.plants_collection.find_one") as mock_find:
            mock_find.side_effect = Exception("connection timeout")
            with pytest.raises(exceptions.DatabaseFindError):
                services.get_plant(MOCK_GOOD_ID)
    
    def test_not_found(self):
        result = services.get_plant(MOCK_GOOD_ID)
        assert result is None

@pytest.mark.usefixtures("plants_col")
class TestGetPlants:
    def test_happy_path(self, existing_plants):
        results = services.get_all_plants()
        
        for result_plant, test_plant_id, test_plant in zip(results, existing_plants, PLANTS):
            assert "_id" not in result_plant
            assert result_plant["id"] == test_plant_id
            assert result_plant["common_name"] == test_plant["common_name"]
    
    def test_database_error(self):
        with patch("api.services.plants_collection.find") as mock_find:
            mock_find.side_effect = Exception("connection timeout")
            with pytest.raises(exceptions.DatabaseFindError):
                services.get_all_plants()
    
    def test_empty_collection(self):
        results = services.get_all_plants()
        assert results == []

@pytest.mark.usefixtures("plants_col")
class TestCreatePlant:
    plant_request = schemas.PlantRequest(**PLANT)
    def test_happy_path(self):
        result = services.create_plant(self.plant_request)
        assert "_id" not in result
        assert "id" in result  
        assert "created_at" in result
        assert result["common_name"] == PLANT["common_name"]
    
    def test_database_error(self):
        with patch("api.services.plants_collection.insert_one") as mock_find:
            mock_find.side_effect = Exception("connection timeout")
            with pytest.raises(exceptions.DatabaseCreationError):
                services.create_plant(self.plant_request)

@pytest.mark.usefixtures("plants_col")   
class TestBulkCreatePlants:
    plant_requests = [schemas.PlantRequest(**plant) for plant in PLANTS]
    
    def test_happy_path(self):
        results = services.create_plants(self.plant_requests)
        for result_plant, test_plant in zip(results, PLANTS):
            assert "_id" not in result_plant
            assert "id" in result_plant
            assert "created_at" in result_plant
            assert result_plant["common_name"] == test_plant["common_name"]
    
    def test_database_error(self):
        with patch("api.services.plants_collection.insert_many") as mock_find:
            mock_find.side_effect = Exception("connection timeout")
            with pytest.raises(exceptions.DatabaseCreationError):
                services.create_plants(self.plant_requests)

@pytest.mark.usefixtures("plants_col")
class TestDeletePlant:
    def test_happy_path(self, existing_plant):
        result = services.delete_plant(existing_plant)
        assert result > 0
    
    def test_not_found(self):
        result = services.delete_plant(MOCK_GOOD_ID)
        assert result == 0
    
    def test_invalid_id(self):
        with pytest.raises(exceptions.InvalidIdError):
            services.delete_plant(MOCK_BAD_ID)
    
    def test_database_error(self):
        with patch("api.services.plants_collection.delete_one") as mock_find:
            mock_find.side_effect = Exception("connection timeout")
            with pytest.raises(exceptions.DatabaseDeletionError):
                services.delete_plant(MOCK_GOOD_ID)