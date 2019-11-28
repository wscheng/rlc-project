import Vue from "vue";
import axios from "axios";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  strict: true,
  namespaced: true,

  state: {
    orders: [],
    pagination: {},
    order: {
      user: {}
    }
  },
  mutations: {
    SET_ORDERS(state, { orders, pagination }) {
      state.orders = orders;
      state.pagination = pagination;
    },
    setOrder(state, order) {
      state.order = order;
    }
  },
  actions: {
    getOrders(context, page) {
      console.warn("SSSS", page);
      const getOrdersUrl = `${Vue.prototype.$_USER_API_URL}/orders?page=${page}`;
      axios.get(getOrdersUrl).then(response => {
        console.warn(response.data);
        if (response.data.success) {
          context.commit("SET_ORDERS", {
            orders: response.data.orders,
            pagination: response.data.pagination
          });
        } else {
          console.warn("get orders failed", response.data.message);
        }
      });
    },
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
