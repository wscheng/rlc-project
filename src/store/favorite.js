import Vue from "vue";
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  strict: true,
  namespaced: true,
  state: {
    favorites: []
  },
  mutations: {
    setFavorites(state, favorites) {
      state.favorites = favorites;
    }
  },
  actions: {
    toggleFavoriteWithoutUpdateProducts(context, product) {
      let favoriteMap = new Map(context.state.favorites);
      let newProduct = JSON.parse(JSON.stringify(product));
      let currentTimestamp = new Date().getTime();
      console.warn("currentTimestamp", currentTimestamp);
      newProduct.addedToFavoriteTime = currentTimestamp;
      if (product.isFavorite) {
        favoriteMap.delete(product.id);
        newProduct.isFavorite = false;
      } else {
        favoriteMap.set(product.id, product);
        newProduct.isFavorite = true;
      }

      context.commit("setFavorites", [...favoriteMap]);
      Vue.prototype.$setFavoritesToLocalStorage(context.state.favorites);
    },
    // side effect will affect product.js
    toggleFavorite(context, product) {
      const products = context.rootState.productModule.products;
      console.warn("B", products[0], products);
      let favoriteMap = new Map(context.state.favorites);
      let newProduct = JSON.parse(JSON.stringify(product));
      let currentTimestamp = new Date().getTime();
      console.warn("currentTimestamp", currentTimestamp);
      newProduct.addedToFavoriteTime = currentTimestamp;
      console.warn("A", products[0], currentTimestamp);
      if (product.isFavorite) {
        favoriteMap.delete(product.id);
        newProduct.isFavorite = false;
      } else {
        favoriteMap.set(product.id, product);
        newProduct.isFavorite = true;
      }

      // update product in product.js
      for (let i = 0; i < products.length; i++) {
        if (products[i].id == product.id) {
          console.warn("BUP", products[i], newProduct);
          context.commit(
            "productModule/updateFavoriteProduct",
            { index: i, product: newProduct },
            { root: true }
          );
          break;
        }
      }
      context.commit("setFavorites", [...favoriteMap]);
      Vue.prototype.$setFavoritesToLocalStorage(context.state.favorites);
    },
    getFavorites(context) {
      const favorites = Vue.prototype.$readFavoritesFromLocalStorage() || [];
      context.commit("setFavorites", favorites);
    }
  }
};
