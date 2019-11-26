import Vue from "vue";
import axios from "axios";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  strict: true,
  namespaced: true,
  state: {
    cart: {}
  },
  mutations: {
    setCart(state, cart) {
      state.cart = cart;
    }
  },
  actions: {
    getCart(context) {
      const getCartUrl = `${Vue.prototype.$_USER_API_URL}/cart`;
      axios.get(getCartUrl).then(response => {
        if (response.data.success) {
          console.warn("setCart response", response.data);
          context.commit("setCart", response.data.data);
        } else {
          console.error("cant get carts", response.data.message);
        }
      });
    },
    addToCart(context, productId, qty = 1) {
      context.commit("setLoading", true, { root: true });
      let productQtyInCart = 0;
      let productCartId = "";
      console.warn(
        "PRODUCT ID",
        productId,
        ", cart=",
        context.state.cart,
        ",carts=",
        context.state.cart.carts
      );
      console.warn("CARTNOW", context.state.cart.carts);
      for (let cart of context.state.cart.carts) {
        if (cart) {
          console.warn("PRODUCT ID for", cart);
          if (cart.product_id == productId) {
            console.warn("PRODUCT QTY FOUND!");
            productQtyInCart = cart.qty;
            productCartId = cart.id;
            break;
          }
        } else {
          console.warn("PRODUCT ID undefined");
        }
      }
      function axiosAddToCart(productId, qty = 1) {
        const addToCartUrl = `${Vue.prototype.$_USER_API_URL}/cart`;
        return axios.post(addToCartUrl, {
          data: { product_id: productId, qty: qty }
        });
      }
      function addToCartNoException(response) {
        if (response.data.success) {
          console.warn("addToCart response", response.data);
          context.dispatch("getCart");
        } else {
          console.error("failed to add to cart", response.data.message);
        }
        context.commit("setLoading", false, { root: true });
      }
      console.warn("PRODUCT QTY", productQtyInCart);
      if (productQtyInCart == 0) {
        axiosAddToCart(productId, qty).then(addToCartNoException);
      } else {
        // remove product in cart
        const deleteCartUrl = `${Vue.prototype.$_USER_API_URL}/cart/${productCartId}`;
        axios
          .delete(deleteCartUrl, { data: { product_id: productId, qty: qty } })
          .then(response => {
            if (response.data.success) {
              console.warn("deleteCart response", response.data);
              return axiosAddToCart(productId, productQtyInCart + qty);
            } else {
              console.error("deleteCart failed", response.data.message);
              context.commit("setLoading", false, { root: true });
            }
          })
          .then(addToCartNoException);
      }
    },
    removeCart(context, cartId) {
      const deleteCartUrl = `${Vue.prototype.$_USER_API_URL}/cart/${cartId}`;
      context.commit("setLoading", true, { root: true });
      axios.delete(deleteCartUrl).then(response => {
        if (response.data.success) {
          console.warn("deleteCart success");
          context.dispatch("getCart");
        } else {
          console.error("cant delete cart", response.data.message);
        }
        context.commit("setLoading", false, { root: true });
      });
    },
    applyCoupon(context, couponCode) {
      const applyCouponUrl = `${Vue.prototype.$_USER_API_URL}/coupon`;
      context.commit("setLoading", true, { root: true });
      axios
        .post(applyCouponUrl, { data: { code: couponCode } })
        .then(response => {
          if (response.data.success) {
            context.dispatch("getCart");
          } else {
            console.error("apply coupon failed", response.data.message);
          }
          context.commit("setLoading", false, { root: true });
        });
    }
  },
  getters: {
    totalQtyInCarts(state) {
      let qty = 0;
      if (state.cart.carts) {
        state.cart.carts.forEach(cart => {
          qty += cart.qty;
        });
      }
      return qty;
    }
  }
};
