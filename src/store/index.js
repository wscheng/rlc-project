import Vue from "vue";
import Vuex from "vuex";

import productModule from "./product";
import favoriteModule from "./favorite";
import cartModule from "./cart";
import orderModule from "./order";

Vue.use(Vuex);

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default new Vuex.Store({
  // TODO refactor naming convention
  // https://docs.vuestorefront.io/guide/vuex/vuex-conventions.html#actions
  strict: true,
  state: {
    isLoading: false
  },
  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    }
  },
  actions: {},
  modules: {
    productModule,
    favoriteModule,
    cartModule,
    orderModule
  }
});
