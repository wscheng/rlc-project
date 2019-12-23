<template>
  <div class="checkout" style="background-color: #f1ede9;">
    <div class="content">
      <div class="container">
        <div class="row mb-4">
          <div
            class="col-sm-4 text-center"
            :class="{ 'd-sm-block d-none other-step': currentStep!=1, 'current-step': currentStep==1 }"
          >
            <h5 class="text-center mt-2">
              步驟一
              <br />確認購物車內容
            </h5>
          </div>
          <div
            class="col-sm-4 text-center"
            :class="{ 'd-sm-block d-none other-step': currentStep!=2, 'current-step': currentStep==2 }"
          >
            <h5 class="text-center mt-2">
              步驟二
              <br />填寫訂購資訊
            </h5>
          </div>
          <div
            class="col-sm-4 text-center"
            :class="{ 'd-sm-block d-none other-step': currentStep!=3, 'current-step': currentStep==3 }"
          >
            <h5 class="text-center mt-2">
              步驟三
              <br />付款/完成訂單
            </h5>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="step1" v-if="currentStep == 1">
              <h6 class="text-center">購物車清單</h6>

              <template v-if="totalQtyInCarts > 0">
                <div class="cotainer-fluid">
                  <div class="row justify-content-center">
                    <table class="table table-sm">
                      <thead>
                        <th class="align-middle text-center">商品照片</th>
                        <th class="align-middle">商品名稱</th>
                        <th class="align-middle">數量</th>
                        <th class="align-middle text-right">金額</th>
                        <th></th>
                      </thead>
                      <tbody>
                        <tr v-for="cart in cart.carts" :key="cart.id">
                          <td class="align-middle">
                            <div
                              class="favorite-image mx-auto"
                              :style="{
                      backgroundImage: `url(${cart.product.imageUrl})`
                    }"
                            />
                          </td>
                          <td class="align-middle">
                            {{ cart.product.title }}
                            <div
                              class="text-success"
                              v-if="cart.coupon"
                            >已套用{{ cart.coupon.title }}折價券 - [{{cart.coupon.code}}]</div>
                          </td>
                          <td class="align-middle">{{ cart.qty }} {{ cart.product.unit }}</td>
                          <td class="align-middle text-right">
                            <template
                              v-if="cart.total == cart.final_total"
                            >{{ cart.total | currency }}</template>
                            <template v-else>
                              <del>{{ cart.total | currency }}</del>
                              <div class="text-success">{{ cart.final_total | currency }}</div>
                            </template>
                          </td>
                          <td class="align-middle text-center">
                            <a href="#" class="text-muted" @click.prevent="removeCart(cart.id)">
                              <font-awesome-icon :icon="['fas', 'trash']" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="3" class="text-right">總計</td>
                          <td
                            class="text-right"
                            v-if="cart.total==cart.final_total"
                          >{{ cart.total | currency }}</td>
                          <td class="text-right" v-else>
                            <del>{{ cart.total | currency }}</del>
                          </td>
                        </tr>
                        <tr v-if="cart.total != cart.final_total">
                          <td colspan="3" class="text-right text-success">折扣價</td>
                          <td class="text-right text-success">{{ cart.final_total | currency }}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div
                  class="input-group mb-3 input-group-sm"
                  v-if="cart.carts && cart.carts.length > 0"
                >
                  <input v-model="couponCode" type="text" class="form-control" placeholder="請輸入優惠碼" />
                  <div class="input-group-append">
                    <button
                      class="btn btn-success btn-outline-secondary text-white"
                      type="button"
                      @click="applyCoupon(couponCode)"
                    >套用優惠碼</button>
                  </div>
                </div>
                <div class="text-right">
                  <router-link
                    class="btn btn-danger"
                    :to="{ name: 'Checkout', query: { step: 2 } }"
                  >下一步，填寫訂單資訊</router-link>
                </div>
              </template>
              <template v-else>
                <div class="text-center h7">
                  <br />購物車沒有東西
                  <br />
                  <br />
                  <BackToShopBtn />
                </div>
              </template>
            </div>
            <!-- step 2 -->
            <div class="step2" v-else-if="currentStep == 2">
              <UserDataInput :form-data="userData" ref="userDataForm" />
              <router-link
                class="btn btn-primary"
                :to="{ name: 'Checkout', query: { step: 1 } }"
              >回上一步</router-link>
              <button class="btn btn-danger" style="float:right;" @click="submitOrder">送出訂單</button>
            </div>
            <!-- step 3 -->
            <div class="step3" v-else-if="currentStep == 3">
              <OrderDetail :order="order" />
              <div class="text-right" v-if="order.is_paid === false">
                <button class="btn btn-danger" @click="payOrderAndUpdateOrder(order.id)">確認付款去</button>
              </div>
            </div>
            <!-- other ambiguous input -->
            <div class="step3" v-else>
              <BackToShopBtn />
            </div>
          </div>
        </div>
      </div>
    </div>
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
    ...mapActions("orderModule", ["getOrder", "payOrder"]),
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
          // NOTE: getOrder should be placed before router.push
          vm.getOrder(response.data.orderId);
          console.warn("ORDER", vm.order, response.data);
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
    },
    payOrderAndUpdateOrder(orderId) {
      const vm = this;
      vm.payOrder(orderId);
      vm.getOrder(orderId);
    }
  },

  watch: {
    "$route.query.step": function(step) {
      this.currentStep = Number(step);
      console.warn("curr Step");
      if (!this.isLegalStep()) {
        this.$router.push({ name: "Home" });
        return;
      }
    }
  },
  created() {
    this.currentStep = Number(this.$route.query.step);
    this.orderId = this.$route.query.order_id;
    this.getOrder(this.orderId);
    if (!this.isLegalStep()) {
      this.$router.push({ name: "Home" });
    }
    // TODO if cart is empty go back to previous page
  }
};
</script>

<style lang="scss" scoped>
.checkout {
  margin-top: 104px;
  padding: 30px 50px 30px 50px;
  @media (max-width: 820px) {
    padding: 30px 50px 30px;
  }
  @media (max-width: 768px) {
    margin-top: 20px;
    padding: 30px 10px 30px;
  }
}
.favorite-image {
  width: 60px;
  height: 80px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
.current-step {
  color: white;
  background: #7b2f3d;
  border: 3px solid #f1ede9;
}
.other-step {
  color: white;
  background: #a6bbc2;
  border: 3px solid #f1ede9;
}
</style>
