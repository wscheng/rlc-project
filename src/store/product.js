import Vue from "vue";
import axios from "axios";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  strict: true,
  namespaced: true,
  state: {
    products: []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    }
  },
  actions: {
    getProducts(context, category) {
      const allProductUrl = `${Vue.prototype.$_USER_API_URL}/products/all`;
      context.commit("setLoading", true, { root: true });
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
      context.commit("setLoading", false, { root: true });
    }
  }
};
