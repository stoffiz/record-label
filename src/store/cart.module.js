import { cartService } from "../services"

const state = {
    all: []
};

const actions = {
    add({dispatch, commit}, item) {

        commit("addItemRequest")
        commit("addItemSuccess", item)
        dispatch("alert/success", item.artist, {root: true})
    },

    delete({dispatch, commit}, index) {
        commit("deleteItemRequest")
        commit("deleteItemSuccess", index)
    },

    deleteAll({dispatch, commit}, cart) {
        commit("deleteAllRequest")
        commit("deleteAllSuccess", cart)
    }
}


const mutations = {
    addItemRequest(state) {
        state = { loading: true };
    },
    addItemSuccess(state, item) {
        let found = state.all.find(i => i.id == item.id)
        if(found) {
            found.quantity++;
        } else {
            state.all.push(item)
        }
    },
    addItemFailure(state, error) {
        state = { error};
    },
    deleteItemRequest(state) {
        state = { loading: true };
    },
    deleteItemSuccess(state, index) {
        state.all.splice(index, 1)
    },
    deleteItemFailure(state, error) {
        state = { error};
    },
    deleteAllRequest(state) {
        state = { loading: true };
    },
    deleteAllSuccess(state, cart) {
        state = state.all.splice(0, cart.length)
    },
    deleteAllFailure(state, error) {
        state = { error};
    },
}

export const cart = {
    namespaced: true,
    state,
    actions,
    mutations
}

function checkExist(id) {
    return
}