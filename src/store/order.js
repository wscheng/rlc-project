import Vue from "vue";
import axios from "axios";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  strict: true,
  namespaced: true,
  state: {
    order: {
      user: {}
    }
  },
  mutations: {
    setOrder(state, order) {
      state.order = order;
    }
  },
  actions: {
    getOrder(context, orderId) {
      const getOrderUrl = `${Vue.prototype.$_USER_API_URL}/order/${orderId}`;
      axios.get(getOrderUrl).then(response => {
        console.warn(response.data);
        if (response.data.success) {
          context.commit("setOrder", response.data.order);
        } else {
          console.warn("get order failed", response.data.message);
        }
      });
    },
    payOrder(context, orderId) {
      const payOrderapi = `${Vue.prototype.$_USER_API_URL}/pay/${orderId}`;
      axios.post(payOrderapi).then(response => {
        console.warn(response.data);
        if (response.data.success) {
          context.dispatch("getOrder", orderId);
        } else {
          console.warn("pay order failed", response.data.message);
        }
      });
    }
  }
};
