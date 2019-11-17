import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    carts: [],
    carts_total_price: 0,
    carts_findal_total_price: 0,
    products: []
  },
  mutations: {
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setCarts(state, carts, total, final_total) {
      state.carts = carts;
      state.carts_total_price = total;
      state.carts_findal_total_price = final_total;
    },
    setProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    getCarts(context) {
      const cartUrl = `${Vue.prototype.$_USER_API_URL}/carts`;
      context.commit("setLoading", true);
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
        context.commit("setLoading", false);
      });
    },
    getProducts(context, category) {
      const allProductUrl = `${Vue.prototype.$_USER_API_URL}/products/all`;
      context.commit("setLoading", true);
      axios.get(allProductUrl).then(response => {
        if (response.data.success) {
          let filterProducts = [];
          console.warn(category.slice(0, category.indexOf("-")));
          if (category.endsWith("-all")) {
            filterProducts = response.data.products.filter(product => {
              //
              let subCategoryStartPos = product.category.indexOf("-");
              if (subCategoryStartPos == -1) {
                return (
                  product.category == category.slice(0, category.indexOf("-"))
                );
              } else {
                return (
                  product.category.slice(0, subCategoryStartPos) ==
                  category.slice(0, category.indexOf("-"))
                );
              }
            });
          } else {
            filterProducts = response.data.products.filter(
              product => product.category == category
            );
          }
          context.commit("setProducts", filterProducts);
        } else {
          console.error("cant get products");
        }
      });
      context.commit("setLoading", false);
    }
  },
  modules: {}
});
