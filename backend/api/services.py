from bson import ObjectId
from .db import plants_collection
from datetime import datetime
from .schemas import PlantRequest
from bson.errors import InvalidId
from .exceptions import DatabaseCreationError, DatabaseDeletionError, DatabaseFindError, InvalidIdError

def serialize_plant(plant: dict) -> dict:
    plant["id"] = str(plant["_id"])
    del plant["_id"]
    return plant

def get_all_plants() -> list[dict]:
    try:
        return [serialize_plant(plant) for plant in plants_collection.find({})]
    except Exception as e:
        raise DatabaseFindError("Failed to find plant data due to an unexpected error") from e

def get_plant(plant_id: str) -> dict | None:
    try:
        my_plant = plants_collection.find_one({"_id": ObjectId(plant_id)})
    except InvalidId:
        raise InvalidIdError(f"{plant_id} is not a valid plant id")
    except Exception as e:
        raise DatabaseFindError("Failed to find plant data due to an unexpected error") from e
    
    if not my_plant:
        return None
    
    return serialize_plant(my_plant)

def create_plant(plant_data: PlantRequest) -> dict | None:
    new_plant = plant_data.model_dump(mode="json")
    new_plant["created_at"] = datetime.now()
    try:
        result = plants_collection.insert_one(new_plant)
    except Exception as e:
        raise DatabaseCreationError("Failed to persist plant data to the database.") from e
    
    return get_plant(str(result.inserted_id))

def delete_plant(plant_id: str) -> int:
    try: 
        result = plants_collection.delete_one({"_id": ObjectId(plant_id)})
    except InvalidId:
        raise InvalidIdError(f"{plant_id} is not a valid plant id")
    except Exception as e:
        raise DatabaseDeletionError("Failed to delete plant data") from e
    
    return result.deleted_count