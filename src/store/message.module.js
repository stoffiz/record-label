import { messageService } from '../services'

const state = {
    all: {}
}

const actions = {
    getAll({ dispatch, commit }) {
        commit('getAllRequest');

        messageService.getAll()
            .then(
                res => {
                    commit('getAllSuccess', res)
                },
                error => commit('getAllFailure', error)
            )
    },

    getById({ dispatch, commit }, id) {
        commit("getByIdRequest", id);
        messageService.getById(id)
            .then(
                res => commit("getByIdSuccess", res),
                error => commit("getByIdFailure", error)
            )
    },

    addMessage({ dispatch, commit }, message) {
        commit("addMessageRequest");
        messageService.addMessage(message)
            .then(
                res => {
                    commit("addMessageSuccess", res)
                },
                error => {
                    commit("addMessageFailure", error),
                    dispatch("alert/error", error, { root: true })
                }
            )
    },

    updateMessage({ dispatch, commit }, message) {
        commit("updateMessageRequest")
        messageService.updateMessage(message)
        .then(
            res => {
                commit("updateMessageSuccess", res),
                dispatch("getById", message.id)
            },
            error => {
                commit("updateMessageFailure", error),
                dispatch("alert/error", error, { root: true })
            }
        )
    },

    deleteMessage({dispatch, commit}, id) {
        commit("deleteMessageRequest", id);
        messageService.deleteMessage(id)
        .then(
            res => {
                commit("deleteMessageSuccess", res),
                dispatch("alert/success", `Message deleted!`, {root: true})
                dispatch("getAll")
            },
            error => {
                commit("deleteMessageFailure", { id, error}),
                dispatch("alert/error", error, { root: true })
                dispatch("getAll")
            }
        )
    }
}

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, messages) {
        state.all = { items: messages };
    },
    getAllFailure(state, error) {
        state.all = { error, loading: true };
    },
    getByIdRequest(state) {
        state.all = { loading: true };
    },
    getByIdSuccess(state, messages) {
        state.all = { items: messages };
    },
    getByIdFailure(state, error) {
        state.all = { error, loading: true };
    },
    addMessageRequest(state) {
        state.all = { loading: true };
    },
    addMessageSuccess(state, message) {
        state.all = { message };
    },
    addMessageFailure(state, error) {
        state.all = { error, loading: true };
    },
    updateMessageRequest(state) {
        state.all = { loading: true };
    },
    updateMessageSuccess(state, message) {
        state.all = { message };
    },
    updateMessageFailure(state, error) {
        state.all = { error, loading: true };
    },
    deleteMessageRequest(state) {
        state.all = { loading: true };
    },
    deleteMessageSuccess(state, message) {
        state.all = { message };
    },
    deleteMessageFailure(state, error) {
        state.all = { error, loading: true };
    }
}

export const message = {
    namespaced: true,
    state,
    actions,
    mutations
}