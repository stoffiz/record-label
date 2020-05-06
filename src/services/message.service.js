export const messageService = {
    getAll,
    getById,
    addMessage,
    updateMessage,
    deleteMessage
}

function getAll() {
    return fetch("https://localhost:5001/api/message")
    .then(handleResponse)
}

function getById(id) {
    return fetch("https://localhost:5001/api/message/" + id)
    .then(handleResponse)
}

function addMessage(message) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    }
    return fetch("https://localhost:5001/api/message", requestOptions)
        .then(handleResponse)
}

function updateMessage(message) {
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    }
    return fetch("https://localhost:5001/api/message/" + message.id, requestOptions)
    .then(handleResponse)
}

function deleteMessage(id) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch("https://localhost:5001/api/message/" + id, requestOptions)
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