import pytest
from pymongo import MongoClient
import os
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

PLANT = {
        "common_name": "Pothos",
    }

PLANTS = [
    {"common_name": "Pothos"},
    {"common_name": "Philodendron"},
    {"common_name": "Monstera"},
]

@pytest.fixture
def plants_col(monkeypatch):
    client = MongoClient(os.environ.get("MONGO_URI"))
    test_db = client["folium_test"]
    test_collection = test_db["plants"]
    
    monkeypatch.setattr("api.services.plants_collection", test_collection)
    
    yield test_collection 
    
    test_collection.drop()
    client.close()
    
@pytest.fixture
def existing_plant(plants_col):
    insert_plant = PLANT.copy()
    insert_plant["created_at"] = datetime.now()
    result = plants_col.insert_one(insert_plant)
    return str(result.inserted_id)

@pytest.fixture
def existing_plants(plants_col):
    insert_plants = []
    for plant in PLANTS:
        insert_plant = plant.copy()
        insert_plant["created_at"] = datetime.now()
        insert_plants.append(insert_plant)
    result = plants_col.insert_many(insert_plants)
    return [str(id) for id in result.inserted_ids]