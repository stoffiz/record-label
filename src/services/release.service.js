import { authHeader } from "../helpers"

export const releaseService = {
    getAll,
    getById,
    addRelease,
    updateRelease,
    deleteRelease
}

function getAll() {
    return fetch("https://localhost:5001/api/release")
    .then(handleResponse)
}

function getById(id) {
    return fetch("https://localhost:5001/api/release/" + id)
    .then(handleResponse)
}

function addRelease(release) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(release)
    }
    return fetch("https://localhost:5001/api/release", requestOptions)
        .then(handleResponse)
}

function updateRelease(release) {
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(release)
    }
    return fetch("https://localhost:5001/api/release/" + release.id, requestOptions)
    .then(handleResponse)
}

function deleteRelease(id) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch("https://localhost:5001/api/release/" + id, requestOptions)
    .then(handleResponse)
}





function handleResponse(response) {

    return response.text().then(text => {

        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}