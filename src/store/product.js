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
    },
    updateFavoriteProduct(state, { index, product }) {
      console.warn("UP", index, state.products[index], product);
      state.products[index].isFavorite = product.isFavorite;
      if (product.isFavorite) {
        state.products[index].addedToFavoriteTime = product.addedToFavoriteTime;
      } else {
        state.products[index].addedToFavoriteTime = 0;
      }
      console.warn("AUP", index, state.products[index], product);
    }
  },
  actions: {
    //  should call getFavorites() before getProducts(), if you'd like to maintain
    //  favorite in products array
    getProducts(context, category) {
      const allProductUrl = `${Vue.prototype.$_USER_API_URL}/products/all`;
      context.commit("setLoading", true, { root: true });
      axios.get(allProductUrl).then(response => {
        if (response.data.success) {
          let filterProducts = [];
          const favoritesMap = new Map(
            context.rootState.favoriteModule.favorites
          );
          // we should setup isFavorite, lastFavoriteEditedTime at object creation time, or
          // vue can't get the state change.
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
          console.warn("R", response.data.products[1]);
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
        context.commit("setLoading", false, { root: true });
      });
    }
  }
};
