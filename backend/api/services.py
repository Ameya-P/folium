from bson import ObjectId
from .db import plants_collection
from datetime import datetime

def serialize_plant(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

def get_all_plants():
    # Hint: pymongo collections have a .find() method
    # It returns a cursor (like an iterator) of documents
    # Each document has an _id that is an ObjectId — 
    # you need to convert it to a string for JSON
    # Hint: return a list, not a cursor
    pass

def get_plant(plant_id):
    # Hint: .find_one() takes a filter dict
    # ObjectId(plant_id) converts a string id to the right type
    # What should you return if the plant doesn't exist?
    pass

def create_plant(data):
    # Hint: .insert_one() takes a dict and returns an object
    # with an .inserted_id attribute
    # Add created_at timestamp here before inserting
    pass

def delete_plant(plant_id):
    # Hint: .delete_one() takes a filter dict
    # Returns an object with .deleted_count attribute
    # deleted_count of 0 means nothing was found to delete
    pass