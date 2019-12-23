<template>
  <div>
    <table class="table mt-4" v-if="orders.length > 0">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.create_at | moment("YYYY-MM-DD HH:mm:ss") }}</td>
          <td class="user-email" v-if="item.user">{{ item.user.email }}</td>
          <td v-else>NO EMAIL</td>
          <td>
            <div v-for="product in item.products" :key="product.id">
              {{ product.product.title }}x {{ product.qty }}
            </div>
          </td>
          <td class="text-md-right">{{ item.total | currency }}</td>
          <td>
            <span v-if="!item.is_paid" class="text-danger">尚未付款</span>
            <span v-else class="text-success">
              {{ item.paid_date | moment("YYYY-MM-DD HH:mm:ss") }}
              <br />付款完成
            </span>
          </td>
          <td>
            <button class="btn btn-primary" @click="openModal(item)">
              訂單明細
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pagination="pagination"
      @change-page="getOrders"
      v-if="orders.length > 0"
    />
    <!-- modal start -->
    <div
      class="modal fade"
      id="detailModal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">訂單明細</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <OrderDetail :order="selectedOrder" />
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="payOrderAndUpdateOrders(selectedOrder.id)"
              v-if="!selectedOrder.is_paid"
            >
              確認已經付款
            </button>
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
    openModal(order) {
      const vm = this;
      vm.selectedOrder = order;
      vm.getOrder(order.id);
      $("#detailModal").modal("show");
    },
    payOrderAndUpdateOrders(orderId) {
      const vm = this;
      vm.payOrder(orderId);
      vm.getOrders(vm.pagination.current_page);
      $("#detailModal").modal("hide");
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

///////
@media only screen and (max-width: 768px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  /* Force table to not be like tables anymore */
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  tr {
    border: 1px solid #ccc;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    border-bottom: 1px solid #eee;
    position: relative;
    padding-left: 50%;
  }

  td:before {
    /* Now like a table header */
    position: absolute;
    /* Top/left values mimic padding */
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
  }

  /*
	Label the data
	*/
  td:nth-of-type(1):before {
    content: "購買時間";
  }
  td:nth-of-type(2):before {
    content: "Email";
  }
  td:nth-of-type(3):before {
    content: "購買款項";
  }
  td:nth-of-type(4):before {
    content: "應付金額";
  }
  td:nth-of-type(5):before {
    content: "是否付款";
  }
  .user-email {
    word-break: break-all;
  }
}
</style>
