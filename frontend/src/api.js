import { namesListToJSON } from "./utils";

const BASE_URL = "http://localhost:8000/api"

export async function getPlants() {
    // GET /api/plants/
    try {
        const response = await fetch(`${BASE_URL}/plants/`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export async function getPlant(id) {
    // GET /api/plants/{id}/
    try {
        const response = await fetch(`${BASE_URL}/plants/${id}/`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export async function createPlant(data) {
    // POST /api/plants/
    // Hint: method, headers, body
    try {
        const response = await fetch(`${BASE_URL}/plants/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export async function bulkCreatePlants(names) {
    // POST /api/plants/bulk/
    try {
        const response = await fetch(`${BASE_URL}/plants/bulk/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: namesListToJSON(names)
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export async function deletePlant(id) {
    // DELETE /api/plants/{id}/
    try {
        const response = await fetch(`${BASE_URL}/plants/${id}/`, {
            method: "DELETE"
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        return true
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export const IMAGE_SERVICE = "https://image-microservice-9whq.onrender.com"

export async function uploadImage(file) {
    const formData = new FormData()
    formData.append("file", file)

    try {
        const response = await fetch(`${IMAGE_SERVICE}/image/`, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const image_id = await response.text()
        return image_id
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export const EXPLORER_SERVICE = "https://house-plant-explorer-microservice.onrender.com"

export async function getHouseplants(category, size) {
    try {
        const params = new URLSearchParams()
        
        if (category) {
            params.append("category", category)
        }

        if (size) {
            params.append("size", size)
        }

        const response = await fetch(`${EXPLORER_SERVICE}/plants/?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error.message)
        throw error
    }
}

export const RNG_SERVICE = "https://cs361-rng-microservice.onrender.com"

export async function getRandomNumber(min, max) {
    try {
        const response = await fetch(`${RNG_SERVICE}/random/?min=${min}&max=${max}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error.message)
        throw error
    }
}