import { releaseService } from '../services'
import  router from '../router'

const state = {
    all: {},
    nav: {},
    one: {}
}

const actions = {
    getAll({dispatch, commit}) {
        commit('getAllRequest');

        releaseService.getAll()
        .then(
            res => {
                commit('getAllSuccess', res)
            },
            error => commit('getAllFailure', error)
        )
    },

    getById({dispatch, commit}, id ) {
        commit('getByIdRequest', id);
        releaseService.getById(id)
        .then(
            res => commit('getByIdSuccess', res),
            error => commit('getByIdFailure', error)
        )
    },

    addRelease({dispatch, commit}, release) {
        commit("addReleaseRequest");
        releaseService.addRelease(release)
        .then(
            res => {
                commit("addReleaseSuccess", res),
                dispatch("alert/success", res.message, {root: true})
                dispatch("getAll")
            },
            error =>  {
                commit("addReleaseFailure", error),
                dispatch("alert/error", error, {root: true})
                dispatch("getAll")
            }
        )
    },

    updateRelease({dispatch, commit}, release) {
        commit("updateReleaseRequest");
        releaseService.updateRelease(release)
        .then(
            res => {
                commit("updateReleaseSuccess", res),
                dispatch("alert/success", `${res.artist} - ${res.title} was updated`, {root: true}) 
            },
            error => {
                commit("updateReleaseFailure", error),
                dispatch("alert/error", error, { root: true })
                dispatch("getById", release.id)
            }
        )
    },

    deleteRelease({dispatch, commit}, id) {
        commit("deleteReleaseRequest", id);
        releaseService.deleteRelease(id)
        .then(
            res => {
                commit("deleteReleaseSuccess", res),
                dispatch("alert/success", `Release deleted!`, {root: true})
                dispatch("getAll")
            },
            error => {
                commit("deleteReleaseFailure", { id, error}),
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
    getAllSuccess(state, releases) {
        state.all = { items: releases };
        state.nav = { items: releases }
    },
    getAllFailure(state, error) {
        state.all = { error, loading: true };
    },
    getByIdRequest(state) {
        state.all = { loading: true };
    },
    getByIdSuccess(state, release) {
        state.one = { release };
    },
    getByIdFailure(state, error) {
        state.all = { error };
    },
    addReleaseRequest(state) {
        state.all = { loading: true };
    },
    addReleaseSuccess(state, release) {
        state.all = { release };
    },
    addReleaseFailure(state, error) {
        state.all = { error };
    },
    updateReleaseRequest(state) {
        state.all = { loading: true };
    },
    updateReleaseSuccess(state, release) {
        state.all = { release };
    },
    updateReleaseFailure(state, error) {
        state.all = { error, loading: true };
    },
    deleteReleaseRequest(state) {
        state.all = { loading: true };
    },
    deleteReleaseSuccess(state, releases) {
        state.all = { releases }
    },
    deleteReleaseFailure(state, error) {
        state.all = { error };
    }
}

export const release = {
    namespaced: true,
    state,
    actions,
    mutations
}