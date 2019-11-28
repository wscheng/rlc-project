<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click.prevent="openModal(true)">
        Add a new coupon
      </button>
    </div>
    <table class="table mt-4" v-if="coupons.length > 0">
      <thead>
        <tr>
          <th width="120">Category</th>
          <th>Name</th>
          <th width="120">折扣</th>
          <th width="120">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.percent }}</td>
          <td>
            <span v-if="item.is_enabled == 1" class="text-success">enable</span>
            <span v-else class="text-success text-danger">disabled</span>
          </td>
          <td class="text-right">{{ item.dueDate | moment("YYYY-MM-DD") }}</td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click.prevent="openModal(false, item)"
              >
                edit
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click.prevent="openDeleteModal(item)"
              >
                delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Pagination
      :pagination="pagination"
      @change-page="getCoupons"
      v-if="coupons.length > 0"
    />
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增優惠券</span>
            </h5>
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
            <div class="row">
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempCoupon.title"
                  />
                </div>
                <div class="form-group">
                  <label for="percent">折扣</label>
                  <input
                    type="text"
                    class="form-control"
                    id="percent"
                    placeholder="請輸入折扣"
                    v-model="tempCoupon.percent"
                  />
                </div>
                <div class="form-group">
                  <label for="percent">到期日</label>
                  <datepicker
                    v-model="dueDate"
                    :format="'yyyy-MM-dd'"
                  ></datepicker>
                </div>
                <div class="form-group">
                  <label for="code">折扣代碼</label>
                  <input
                    type="text"
                    class="form-control"
                    id="code"
                    placeholder="請輸入折扣"
                    v-model="tempCoupon.code"
                  />
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempCoupon.is_enabled"
                      :true-value="1"
                      :false-value="''"
                    />
                    <label
                      class="form-check-label"
                      for="is_enabled"
                      :format="'YYYY-MM-DD'"
                      >是否啟用</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="confirmCoupon"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
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
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong>
            商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="delCoupon(tempCoupon)"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from "@/components/Pagination";
import Vue from "vue";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      pagination: {},
      dueDate: new Date()
    };
  },
  components: {
    Pagination
  },
  methods: {
    getCoupons(page = 1) {
      const api = `${Vue.prototype.$_ADMIN_API_URL}/coupons?page=${page}`;
      console.warn("api=", api);
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api, vm.user).then(response => {
        console.warn(response.data);
        vm.isLoading = false;
        if (response.data.success) {
          vm.coupons = response.data.coupons;
          vm.pagination = response.data.pagination;
        } else {
          // TODO make this a method
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    openModal(isNew, item) {
      $("#couponModal").modal("show");
      const vm = this;
      if (isNew) {
        vm.isNew = true;
        vm.tempCoupon = {};
      } else {
        vm.isNew = false;
        vm.tempCoupon = Object.assign({}, item);
        vm.tempCoupon.dueDate = new Date(item.dueDate);
        vm.dueDate = new Date(item.dueDate);
      }
    },
    confirmCoupon() {
      let api = `${Vue.prototype.$_ADMIN_API_URL}/coupon`;
      const vm = this;
      let method = "post";
      if (!vm.isNew) {
        api = `${Vue.prototype.$_ADMIN_API_URL}/coupon/${vm.tempCoupon.id}`;
        method = "put";
      }
      console.warn("method=", method, "api=", api, vm.tempCoupon);
      const coupon = { data: vm.tempCoupon };
      coupon.data.dueDate = vm.dueDate.getTime();
      vm.$http[method](api, coupon).then(response => {
        console.warn(response.data);
        if (!response.data.success) {
          console.warn("update Coupon failed!");
          vm.$bus.$emit("message:push", response.data.message, "danger");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "success");
        }
        $("#couponModal").modal("hide");
        vm.getCoupons();
      });
    },
    openDeleteModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $("#delCouponModal").modal("show");
    },
    delCoupon(item) {
      const api = `${Vue.prototype.$_ADMIN_API_URL}/coupon/${item.id}`;
      console.warn("api=", api);
      const vm = this;
      vm.isLoading = true;
      vm.$http.delete(api).then(response => {
        $("#delCouponModal").modal("hide");
        console.warn(response.data);
        vm.isLoading = false;
        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.getCoupons(vm.pagination.current_page);
        } else {
          // TODO make this a method
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>
