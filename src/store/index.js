import Vue from 'vue'
import Vuex from 'vuex'

import { alert } from './alert.module';
import { releases } from './release.module'
import { news } from './news.module'


Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        alert,
        releases,
        news
    }
});