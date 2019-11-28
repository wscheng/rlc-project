<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click.prevent="openModal(true)">
        Add a new product
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="100">Category</th>
          <th width="100">Subcategory</th>
          <th>Name</th>
          <th width="100">原價</th>
          <th width="100">售價</th>
          <th width="100">是否啟用</th>
          <th width="100">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.subcategory }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td>
            <span v-if="item.is_enabled == 1" class="text-success">enable</span>
            <span v-else class="text-success text-danger">disabled</span>
          </td>
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
    <Pagination :pagination="pagination" @change-page="getProducts" />
    <!-- Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
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
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input
                    type="text"
                    class="form-control"
                    id="image"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                    v-if="tempProduct.imageUrl"
                  />
                </div>
                <div class="form-group">
                  <label for="customFile">
                    或 上傳圖片
                    <i
                      class="fas fa-spinner fa-spin"
                      v-if="status.fileUploading"
                    ></i>
                  </label>
                  <input
                    type="file"
                    id="customFile"
                    class="form-control"
                    ref="files"
                    @change="uploadImg"
                  />
                </div>
                <img
                  :src="tempProduct.imageUrl"
                  class="img-fluid"
                  v-if="tempProduct.imageUrl"
                  alt
                />
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input
                    type="text"
                    class="form-control"
                    id="title"
                    placeholder="請輸入標題"
                    v-model="tempProduct.title"
                  />
                </div>

                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      autocomplete="on"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      autocomplete="on"
                      v-model="tempProduct.unit"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="category">子分類</label>
                    <input
                      type="text"
                      class="form-control"
                      id="category"
                      placeholder="請輸入分類"
                      autocomplete="on"
                      v-model="tempProduct.subcategory"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">上架日期</label>
                    <input
                      type="unit"
                      class="form-control"
                      id="unit"
                      placeholder="請輸入單位"
                      autocomplete="on"
                      v-model="tempProduct.launched_date"
                    />
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="origin_price"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input
                      type="number"
                      class="form-control"
                      id="price"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />

                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="content"
                    placeholder="請輸入產品說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="is_enabled"
                      v-model="tempProduct.is_enabled"
                      :true-value="1"
                      :false-value="''"
                    />
                    <label class="form-check-label" for="is_enabled"
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
              @click="confirmProduct"
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="delProductModal"
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
            <strong class="text-danger">{{ tempProduct.title }}</strong>
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
              @click="delProduct(tempProduct)"
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
import { mapActions, mapState } from "vuex";
import Vue from "vue";
import Pagination from "@/components/Pagination";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  data() {
    return {
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      },
      pagination: {}
    };
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState("productModule", ["products"])
  },
  methods: {
    ...mapActions("productModule", ["getProducts"]),
    // getProducts(page = 1) {
    //   const api = `${process.env.API_SITE}/api/${process.env.CUSTOM_PATH}/admin/products?page=${page}`;
    //   console.warn("api=", api);
    //   const vm = this;
    //   vm.isLoading = true;
    //   vm.$http.get(api, vm.user).then(response => {
    //     console.warn(response.data);
    //     vm.isLoading = false;
    //     if (response.data.success) {
    //       vm.products = response.data.products;
    //       vm.pagination = response.data.pagination;
    //     } else {
    //       // TODO make this a method
    //       ///vm.$bus.$emit("message:push", response.data.message, "danger");
    //     }
    //   });
    // },
    openModal(isNew, item) {
      $("#productModal").modal("show");
      const vm = this;
      if (isNew) {
        vm.isNew = true;
        vm.tempProduct = {};
      } else {
        vm.isNew = false;
        vm.tempProduct = Object.assign({}, item);
      }
    },
    confirmProduct() {
      let api = `${Vue.prototype.$_ADMIN_API_URL}/product`;
      const vm = this;
      let method = "post";
      if (!vm.isNew) {
        api = `${process.env.API_SITE}/api/${process.env.CUSTOM_PATH}/admin/product/${vm.tempProduct.id}`;
        method = "put";
      }
      console.warn("method=", method, "api=", api, vm.tempProduct);
      vm.$http[method](api, { data: vm.tempProduct }).then(response => {
        console.warn(response.data);
        if (!response.data.success) {
          console.warn("update product failed!");
          vm.$bus.$emit("message:push", response.data.message, "danger");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "success");
        }
        $("#productModal").modal("hide");
        vm.getProducts();
      });
    },
    uploadImg() {
      console.warn(this);
      const api = `${Vue.prototype.$_ADMIN_API_URL}/upload`;
      let formData = new FormData();
      const vm = this;
      formData.append("customFile", vm.$refs.files.files[0]);
      vm.status.fileUploading = true;
      vm.$http
        .post(api, formData, {
          "Content-Type": "multipart/form-data"
        })
        .then(response => {
          console.warn(response.data);
          vm.status.fileUploading = false;
          if (response.data.success) {
            vm.$set(vm.tempProduct, "imageUrl", response.data.imageUrl);
          } else {
            console.warn("failed!", vm);
            vm.$bus.$emit("message:push", response.data.message, "danger");
          }
        });
    },
    openDeleteModal(item) {
      this.tempProduct = Object.assign({}, item);
      $("#delProductModal").modal("show");
    },
    delProduct(item) {
      const api = `${Vue.prototype.$_ADMIN_API_URL}/product/${item.id}`;
      console.warn("api=", api);
      const vm = this;
      vm.isLoading = true;
      vm.$http.delete(api).then(response => {
        $("#delProductModal").modal("hide");
        console.warn(response.data);
        vm.isLoading = false;
        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.getProducts(vm.pagination.current_page);
        } else {
          // TODO make this a method
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    }
  },
  created() {
    console.warn("In pROD");
    this.getProducts();
  }
};
</script>
