<template>
  <div>
    <div>
      CurrentSteps
    </div>

    <div class="step1" v-if="currentStep == 1">
      <h1>確認訂單</h1>
      <h6 class="text-center">購物車清單</h6>
      <BackToShopBtn />

      <template v-if="totalQtyInCarts > 0">
        <table class="table table-sm">
          <thead>
            <th class="align-middle">商品名稱</th>
            <th class="align-middle">數量</th>
            <th class="align-middle text-right">金額</th>
            <th></th>
          </thead>
          <tbody>
            <tr v-for="cart in cart.carts" :key="cart.id">
              <td class="align-middle">{{ cart.product.title }}</td>
              <td class="align-middle">
                {{ cart.qty }} {{ cart.product.unit }}
              </td>
              <td class="align-middle text-right">
                {{ cart.total | currency }}
              </td>
              <td class="align-middle text-center">
                <a
                  href="#"
                  class="text-muted"
                  @click.prevent="removeCart(cart.id)"
                >
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </a>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total }}</td>
            </tr>
            <tr v-if="cart.total != cart.final_total">
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total }}</td>
            </tr>
          </tfoot>
          <div
            class="input-group mb-3 input-group-sm"
            v-if="cart.carts && cart.carts.length > 0"
          >
            <input
              v-model="couponCode"
              type="text"
              class="form-control"
              placeholder="請輸入優惠碼"
            />
            <div class="input-group-append">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="applyCoupon"
              >
                套用優惠碼
              </button>
            </div>
          </div>
        </table>
        <router-link
          class="btn btn-primary"
          :to="{ name: 'Checkout', query: { step: 2 } }"
        >
          下一步，填寫訂單資訊
        </router-link>
      </template>
    </div>
    <!-- step 2 -->
    <div class="step2" v-else-if="currentStep == 2">
      <UserDataInput :form-data="userData" ref="userDataForm" />
      <router-link
        class="btn btn-primary"
        :to="{ name: 'Checkout', query: { step: 1 } }"
      >
        回上一步
      </router-link>
      <button @click="submitOrder">
        送出訂單
      </button>
    </div>
    <!-- step 3 -->
    <div class="step3" v-else-if="currentStep == 3">
      <OrderDetail :order-id="orderId" />
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-danger">確認付款去</button>
      </div>
    </div>
    <!-- other ambiguous input -->
    <div class="step3" v-else><BackToShopBtn /></div>
  </div>
</template>

<script>
// import $ from "jquery";
import Vue from "vue";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import UserDataInput from "@/components/UserDataInput.vue";
import OrderDetail from "@/components/OrderDetail.vue";
import BackToShopBtn from "@/components/BackToShopBtn.vue";
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  components: {
    UserDataInput,
    OrderDetail,
    BackToShopBtn
  },
  data() {
    return {
      currentStep: 1,
      couponCode: "",
      userData: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      },
      orderId: ""
    };
  },
  computed: {
    ...mapState("cartModule", ["cart"]),
    ...mapState("orderModule", ["order"]),
    ...mapGetters("cartModule", ["totalQtyInCarts"])
  },
  methods: {
    ...mapMutations(["setLoading"]),
    ...mapActions("cartModule", ["getCart", "removeCart", "applyCoupon"]),
    async submitOrder() {
      const vm = this;
      const isValid = await vm.$refs.userDataForm.$refs.observer.validate();
      if (!isValid) {
        return;
      } else if (!vm.cart.carts || vm.cart.carts.length == 0) {
        console.warn("購物車為空");
        return;
      }
      const postOrderUrl = `${Vue.prototype.$_USER_API_URL}/order`;
      vm.setLoading(true);
      console.warn("vm.userData=", vm.userData);
      vm.$http.post(postOrderUrl, { data: vm.userData }).then(response => {
        console.warn(response.data);
        if (response.data.success) {
          vm.getCart();
          // go to third page and
          this.$router.push({
            name: "Checkout",
            query: { step: 3, order_id: response.data.orderId }
          });
        } else {
          console.warn("post order failed", response.data.message);
        }
        vm.setLoading(false);
      });
    },
    isLegalStep() {
      switch (Number(this.currentStep)) {
        case 1:
          break;
        case 2:
          if (!this.cart.carts || this.cart.carts.length == 0) return false;
          break;
        case 3:
          if (!this.$route.query.order_id || this.$route.query.length == 0)
            return false;
          break;
      }
      return true;
    }
  },

  watch: {
    "$route.query.step": function(step) {
      this.currentStep = Number(step);
      if (!this.isLegalStep()) {
        this.$router.push({ name: "Home" });
      }
    }
  },
  created() {
    this.currentStep = Number(this.$route.query.step);
    this.orderId = this.$route.query.order_id;
    if (!this.isLegalStep()) {
      this.$router.push({ name: "Home" });
    }
    // TODO if cart is empty go back to previous page
  }
};
</script>

<style lang="scss" scoped></style>
