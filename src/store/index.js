import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import { alert } from './alert.module';
import { releases } from './release.module'
import { news } from './news.module'
import { cart } from './cart.module'


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        releases,
        news,
        cart
    }, plugins: [createPersistedState({
        paths: ["cart"]
    })]
});