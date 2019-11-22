import Vue from "vue";
import Vuex from "vuex";

import productModule from "./product";
import favoriteModule from "./favorite";

Vue.use(Vuex);

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {},
  modules: {
    productModule,
    favoriteModule
  }
});
