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