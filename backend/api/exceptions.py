class DatabaseCreationError(Exception):
    """Raised when a plant document fails to insert into MongoDB."""
    pass

class DatabaseDeletionError(Exception):
    """Raised when a plant document fails to delete from MongoDB."""
    pass

class DatabaseFindError(Exception):
    """Raised when a database read operation fails unexpectedly."""
    pass


class InvalidIdError(Exception):
    """Raised when a provided plant ID is not a valid ObjectId format."""
    pass