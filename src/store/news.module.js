import { newsService } from "../services"

const state = {
    all: {}
}

const actions = {
    getAll({dispatch, commit}) {
        commit("getAllRequest");

        newsService.getAll()
        .then(
            res => commit("getAllSuccess", res),
            error => commit("getAllFailure", error)
        )        
    },

    getById({dispatch, commit}, id) {
        commit("getByIdRequest", id);
        newsService.getById(id)
        .then(
            res => commit("getByIdSuccess", res),
            error => commit("getByIdFailure", error)
        )
    },

    addNews({dispatch, commit}, release) {
        commit("addNewsRequest");
        newsService.addNews(release)
        .then(
            res => {
                commit("addNewsSuccess", res),
                dispatch("alert/success", res.message, {root: true})
                dispatch("getAll")
            },
            error =>  {
                commit("addNewsFailure", error),
                dispatch("alert/error", error, {root: true})
                dispatch("getAll")
            }
        )
    },

    updateNews({dispatch, commit}, newsPost) {
        commit("updateNewsRequest",);
        newsService.updateNews(newsPost)
        .then(
            res => {
                commit("updateNewsSuccess", res),
                dispatch("alert/success", `${res.title} updated`, {root: true})
                dispatch("getById", newsPost.id)
            },
            error => {
                commit("updateNewsFailure", error),
                dispatch("alert/error", error, {root: true})
                dispatch("getById", newsPost.id)
            }
        )
    },

    deleteNews({dispatch, commit}, id) {
        commit("deleteNewsRequest", id);
        newsService.deleteNews(id)
        .then(
            res => {
                commit("deleteNewsSuccess", res),
                dispatch("alert/success", "News post deleted", {root: true})
                dispatch("getAll")
            },
            error => {
                commit("deleteNewsFailure", {id, error}),
                dispatch("alert/error", error, {root: true})
                dispatch("getAll")
            }
        )
    }

}

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, news) {
        state.all = { items: news };
    },
    getAllFailure(state, error) {
        state.all = { error, loading: true };
    },
    getByIdRequest(state) {
        state.all = { loading: true };
    },
    getByIdSuccess(state, news) {
        state.all = { items: news };
    },
    getByIdFailure(state, error) {
        state.all = { error, loading: true };
    },
    addNewsRequest(state) {
        state.all = { loading: true };
    },
    addNewsSuccess(state, news) {
        state.all = { news };
    },
    addNewsFailure(state, error) {
        state.all = { error };
    },
    updateNewsRequest(state) {
        state.all = { loading: true };
    },
    updateNewsSuccess(state, news) {
        state.all = { news };
    },
    updateNewsFailure(state, error) {
        state.all = { error };
    },
    deleteNewsRequest(state) {
        state.all = { loading: true };
    },
    deleteNewsSuccess(state, news) {
        state.all = { news }
    },
    deleteNewsFailure(state, error) {
        state.all = { error };
    }
}

export const news = {
    namespaced: true,
    state,
    actions,
    mutations
}