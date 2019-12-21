<template>
  <div class="front-orders" style="background-color: #f1ede9;">
    <div class="orders-title-block text-center">
      <h5 class="py-2">訂單列表</h5>
    </div>
    <table class="table mt-4" v-if="orders.length > 0">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th width="120">Email</th>
          <th width="120">購買款項</th>
          <th width="120">應付金額</th>
          <th width="120">是否付款</th>
          <th width="120"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.create_at | moment("YYYY-MM-DD") }}</td>
          <td v-if="item.user">{{ item.user.email }}</td>
          <td v-else>NO EMAIL</td>
          <td>
            <div
              v-for="product in item.products"
              :key="product.id"
            >{{ product.product.title }}x {{ product.qty }}</div>
          </td>
          <td class="text-right">{{ item.total }}</td>
          <td>
            <span v-if="!item.is_paid">尚未付款</span>
            <span v-else class="text-success">付款完成</span>
          </td>
          <td>
            <button @click="openModal(item.id)">訂單明細</button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination :pagination="pagination" @change-page="getOrders" v-if="orders.length > 0" />

    <!-- modal start -->
    <div class="modal fade" id="detailModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <OrderDetail :need-loading="false" :order-passed-in="selectedOrder" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">關閉</button>
            <button
              type="button"
              class="btn btn-danger"
              @click="payOrderAndUpdateOrders(selectedOrder.id)"
              v-if="!selectedOrder.is_paid"
            >確認已經付款</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal end -->
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/Pagination";
import OrderDetail from "@/components/OrderDetail";
import { mapState, mapActions } from "vuex";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  components: {
    Pagination,
    OrderDetail
  },
  data() {
    return {
      selectedOrder: {}
    };
  },
  computed: {
    ...mapState("orderModule", ["orders", "pagination"])
  },
  methods: {
    ...mapActions("orderModule", ["getOrder", "getOrders", "payOrder"]),
    openModal(orderId) {
      const vm = this;
      vm.getOrder(orderId);
      $("#detailModal").modal("show");
    },
    payOrderAndUpdateOrders(orderId) {
      const vm = this;
      vm.payOrder(orderId);
      $("#detailModal").modal("hide");
      vm.getOrders(vm.pagination.current_page);
    }
  },
  created() {
    this.getOrders(1);
  }
};
</script>

<style lang="scss" scoped>
.front-orders {
  margin-top: 104px;
  padding: 20px 50px 20px 50px;
  @media (max-width: 820px) {
    padding: 20px 50px 20px;
  }
  @media (max-width: 768px) {
    margin-top: 0px;
    padding: 20px 10px 20px;
  }
}

.orders-title-block {
  color: white;
  background: #7b2f3d;
}
</style>
