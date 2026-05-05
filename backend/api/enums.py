from enum import Enum

class Light(Enum):
    BRIGHT_DIRECT_LIGHT = "bright direct light"
    BRIGHT_INDIRECT_LIGHT = "bright indirect light"
    MEDIUM_INDIRECT_LIGHT = "medium indirect light"
    LOW_LIGHT = "low light"
    
class Water(Enum):
    DROUGHT_TOLERANT = "drought tolerant"
    LOW_MODERATE = "low to moderate"
    MOIST_EVEN = "keep moist"
    HIGH_WET = "keep wet"