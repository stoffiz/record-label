export const newsService = {
    getAll,
    getById,
    addNews,
    updateNews,
    deleteNews
}

function getAll() {
    return fetch("https://localhost:5001/api/news")
    .then(handleResponse)
}

function getById(id) {
    return fetch("https://localhost:5001/api/news/" + id)
    .then(handleResponse)
}

function addNews(newsPost) {
    const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newsPost)
    }
    return fetch("https://localhost:5001/api/news", requestOptions)
        .then(handleResponse)
}

function updateNews(newsPost) {
    console.log(newsPost)
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newsPost)
    }
    return fetch("https://localhost:5001/api/news/" + newsPost.id, requestOptions)
    .then(handleResponse)
}

function deleteNews(id) {
    const requestOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }
    return fetch("https://localhost:5001/api/news/" + id, requestOptions)
    .then(handleResponse)
}


//HANDLE RESPONSE
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