import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

import { alert } from './alert.module';
import { release } from './release.module'
import { news } from './news.module'
import { cart } from './cart.module'
import { message } from './message.module'


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        release,
        news,
        cart,
        message
    }, plugins: [createPersistedState({
        paths: ["cart"]
    })]
});