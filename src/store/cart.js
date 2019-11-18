import Vue from "vue";
import axios from "axios";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  strict: true,
  namespaced: true,
  state: {
    carts: [],
    carts_total_price: 0,
    carts_findal_total_price: 0
  },
  mutations: {
    setCarts(state, carts, total, final_total) {
      state.carts = carts;
      state.carts_total_price = total;
      state.carts_findal_total_price = final_total;
    }
  },
  actions: {
    getCarts(context) {
      const cartUrl = `${Vue.prototype.$_USER_API_URL}/carts`;
      context.commit("setLoading", true, { root: true });
      axios.get(cartUrl).then(response => {
        if (response.data.success) {
          context.commit(
            "setCarts",
            response.data.carts,
            response.data.total,
            response.data.final_total
          );
        } else {
          console.error("cant get carts");
        }
        context.commit("setLoading", false, { root: true });
      });
    }
  }
};
