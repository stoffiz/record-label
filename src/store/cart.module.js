import { cartService } from "../services"

const state = {
    cart: []
};

const actions = {
    add({dispatch, commit}, item) {

        commit("addItemRequest")
        commit("addItemSuccess", item)
        dispatch("alert/success", item.artist, {root: true})
    }
}

const mutations = {
    addItemRequest(state) {
        state = { loading: true };
    },
    addItemSuccess(state, item) {
        let found = state.cart.find(i => i.id == item.id)
        if(found) {
            found.quantity++;
        } else {
            state.cart.push(item)
        }
        
    },
    addItemFailure(state, error) {
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