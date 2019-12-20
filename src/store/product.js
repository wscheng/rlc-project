import Vue from "vue";
import axios from "axios";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  strict: true,
  namespaced: true,
  state: {
    products: [],
    current_product: {}
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    updateFavoriteInProducts(state, { index, product }) {
      console.warn("UP", index, state.products[index], product);
      state.products[index].isFavorite = product.isFavorite;
      if (product.isFavorite) {
        state.products[index].addedToFavoriteTime = product.addedToFavoriteTime;
      } else {
        state.products[index].addedToFavoriteTime = 0;
      }
      console.warn("AUP", index, state.products[index], product);
    },
    updateCurrProduct(state, product) {
      state.current_product = product;
    }
  },
  actions: {
    //  should call getFavorites() before getProducts(), if you'd like to maintain
    //  favorite in products array
    getProducts(context) {
      const allProductUrl = `${Vue.prototype.$_USER_API_URL}/products/all`;
      context.commit("setLoading", true, { root: true });
      // TODO implement axios error function
      axios.get(allProductUrl).then(response => {
        if (response.data.success) {
          const favoritesMap = new Map(
            context.rootState.favoriteModule.favorites
          );
          // we should setup isFavorite, lastFavoriteEditedTime at object creation time, or
          // vue can't get the state change.
          console.warn("getProducts", response.data.products);
          response.data.products.forEach(product => {
            if (favoritesMap.has(product.id)) {
              product.isFavorite = true;
              product.addedToFavoriteTime = favoritesMap.get(
                product.id
              ).addedToFavoriteTime;
            } else {
              product.isFavorite = false;
              product.addedToFavoriteTime = 0;
            }
          });
          context.commit("setProducts", response.data.products);
        } else {
          console.error("cant get products");
        }
        context.commit("setLoading", false, { root: true });
      });
    },
    getCurrProduct(context, productId) {
      const singleProductUrl = `${Vue.prototype.$_USER_API_URL}/product/${productId}`;
      console.warn("url", singleProductUrl);
      context.commit("setLoading", true, { root: true });
      axios.get(singleProductUrl).then(response => {
        if (response.data.success) {
          let product = response.data.product;
          const favoritesMap = new Map(
            context.rootState.favoriteModule.favorites
          );
          if (favoritesMap.has(productId)) {
            product.isFavorite = true;
            product.addedToFavoriteTime = favoritesMap.get(
              product.id
            ).addedToFavoriteTime;
          } else {
            product.isFavorite = false;
            product.addedToFavoriteTime = 0;
          }
          context.commit("updateCurrProduct", product);
        } else {
          console.error("cant get products! reason: ", response.data.message);
        }
        context.commit("setLoading", false, { root: true });
      });
    }
  }
};
