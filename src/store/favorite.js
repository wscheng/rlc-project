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
    removeFavorite(context, product) {
      let favoriteMap = new Map(context.state.favorites);
      favoriteMap.delete(product.id);
      context.commit("setFavorites", [...favoriteMap]);
      Vue.prototype.$setFavoritesToLocalStorage(context.state.favorites);
    },
    toggleFavoriteWithCurrProduct(context) {
      let favoriteMap = new Map(context.state.favorites);
      let currProduct = context.rootState.productModule.current_product;
      let newObjOfCurrProduct = JSON.parse(JSON.stringify(currProduct));
      let currentTimestamp = new Date().getTime();
      console.warn(
        "currentTimestamp:",
        currentTimestamp,
        "product:",
        currProduct
      );
      newObjOfCurrProduct.addedToFavoriteTime = currentTimestamp;
      if (currProduct.isFavorite) {
        favoriteMap.delete(newObjOfCurrProduct.id);
        newObjOfCurrProduct.isFavorite = false;
      } else {
        newObjOfCurrProduct.isFavorite = true;
        favoriteMap.set(currProduct.id, newObjOfCurrProduct);
      }
      context.commit("productModule/updateCurrProduct", newObjOfCurrProduct, {
        root: true
      });
      context.commit("setFavorites", [...favoriteMap]);
      Vue.prototype.$setFavoritesToLocalStorage(context.state.favorites);
    },
    // side effect will affect product.js
    toggleFavorite(context, product) {
      const products = context.rootState.productModule.products;
      const currentProduct = context.rootState.productModule.current_product;
      console.warn("B", products[0], products, product);
      let favoriteMap = new Map(context.state.favorites);
      let newObjOfSelectedProduct = JSON.parse(JSON.stringify(product));
      let currentTimestamp = new Date().getTime();
      console.warn("currentTimestamp", currentTimestamp);
      newObjOfSelectedProduct.addedToFavoriteTime = currentTimestamp;
      console.warn("A", products[0], currentTimestamp);
      if (product.isFavorite) {
        favoriteMap.delete(newObjOfSelectedProduct.id);
        newObjOfSelectedProduct.isFavorite = false;
      } else {
        newObjOfSelectedProduct.isFavorite = true;
        favoriteMap.set(product.id, newObjOfSelectedProduct);
      }

      // update current_product in product.js
      if (currentProduct.id && currentProduct.id == product.id) {
        context.commit(
          "productModule/updateCurrProduct",
          newObjOfSelectedProduct,
          {
            root: true
          }
        );
      }
      // update product in product.js
      for (let i = 0; i < products.length; i++) {
        if (products[i].id == product.id) {
          console.warn("BUP", products[i], newObjOfSelectedProduct);
          context.commit(
            "productModule/updateFavoriteInProducts",
            { index: i, product: newObjOfSelectedProduct },
            { root: true }
          );
          break;
        }
      }
      console.warn("favorties", [...favoriteMap]);
      context.commit("setFavorites", [...favoriteMap]);
      Vue.prototype.$setFavoritesToLocalStorage(context.state.favorites);
    },
    getFavorites(context) {
      const favorites = Vue.prototype.$readFavoritesFromLocalStorage() || [];
      context.commit("setFavorites", favorites);
    }
  }
};
