<template>
  <div class="books" style="background-color: #f1ede9;">
    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <!-- breadcrumb start -->
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb bg-light">
                <li class="breadcrumb-item">
                  <router-link to="/">首頁</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link to="/books">{{
                    current_product.category
                  }}</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link
                    :to="{
                      path: '/books',
                      query: { category: current_product.subcategory }
                    }"
                    >{{ current_product.subcategory }}</router-link
                  >
                </li>

                <li class="breadcrumb-item active">
                  {{ current_product.title }}
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <!-- breadcrumb end -->
            <!-- current_product detail -->
            <div class="sticky-top clear-fix text-center">
              <h3 class="product-title">{{ current_product.title }}</h3>

              <div class="d-flex flex-column" v-if="current_product.unit">
                <div class="text-center">
                  <img class="book-cover" :src="current_product.imageUrl" />
                </div>
                <dl class="text-left mx-auto">
                  <dt>作者：</dt>
                  <dd>test</dd>
                  <dt>出版社：</dt>
                  <dd>test</dd>
                  <dt>出版日期：</dt>
                  <dd>2019/01/01</dd>
                  <dt>定價：</dt>
                  <dd>
                    <del
                      v-if="
                        current_product.price != current_product.origin_price
                      "
                      >{{ current_product.price | currency }}</del
                    >
                    <span v-else>{{
                      current_product.origin_price | currency
                    }}</span>
                  </dd>
                  <dt>售價：</dt>
                  <dd>
                    <template
                      v-if="
                        current_product.price != current_product.origin_price
                      "
                    >
                      <span class="special-price">{{
                        (
                          current_product.price / current_product.origin_price
                        ).toFixed(1)
                      }}</span
                      >折
                      <span class="special-price">{{
                        current_product.price | currency
                      }}</span>
                    </template>
                    <template v-else>{{
                      current_product.price | currency
                    }}</template>
                  </dd>
                  <!-- </dl> -->
                  <dt>
                    <label>數量：</label>
                  </dt>
                  <dd>
                    <form class="form-inline">
                      <select
                        class="custom-select"
                        style="white-space: nowrap; display: inline-block"
                        v-model="qty"
                      >
                        <option v-for="num in 10" :key="num" :value="num"
                          >{{ num }} {{ current_product.unit }}</option
                        >
                      </select>
                    </form>
                  </dd>
                </dl>
                <!-- </div> -->
                <div class="text-center">
                  <button
                    class="btn btn-primary mt-2"
                    @click="
                      addToCart({ productId: current_product.id, qty: qty })
                    "
                  >
                    <font-awesome-icon
                      :icon="['fas', 'shopping-cart']"
                      :style="{ color: 'white' }"
                    />
                    {{ "加入購物車" }}
                  </button>
                  <br />
                  <button
                    class="btn btn-secondary mt-2"
                    @click="toggleFavorite(current_product)"
                  >
                    <font-awesome-icon
                      :style="{
                        color: current_product.isFavorite ? 'red' : 'white'
                      }"
                      :icon="['fas', 'heart']"
                    />
                    {{ current_product.isFavorite ? "取消收藏" : "加到收藏" }}
                  </button>
                </div>
              </div>
              <hr class="d-md-none" />
            </div>
          </div>

          <div class="col-md-8 mt-md-0 mt-5">
            <h4>內容簡介</h4>
            <pre class="product-description">{{
              current_product.description
            }}</pre>
            <h4>本書內容</h4>
            <pre class="product-description">{{ current_product.content }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  data() {
    return {
      productId: "",
      categories: [
        { title: "全部書籍", id: "book-all" },
        { title: "文學小說", id: "book-literalNovel" },
        {
          title: "心理勵志",
          id: "book-motivational"
        },
        { title: "藝術設計", id: "book-artDesign" },
        {
          title: "電腦資訊",
          id: "book-computerScience"
        },
        { title: "教科書", id: "book-textbook" }
      ],
      currentCategory: { title: "全部書籍", id: "book-all" },
      status: {
        loadingItem: ""
      },
      qty: 1
    };
  },
  methods: {
    ...mapMutations(["SET_LOADING"]),
    toggleFavorite() {
      this.$store.dispatch("favoriteModule/toggleFavoriteWithCurrProduct");
    },
    ...mapActions("cartModule", ["addToCart"]),
    ...mapActions("productModule", ["getCurrProduct"])
  },
  computed: {
    ...mapState("productModule", ["current_product"]),
    ...mapState("favoriteModule", ["favorites"])
  },
  created() {
    this.productId = this.$route.params.productId;
    this.getCurrProduct(this.productId);
  }
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  padding: 104px 76px 30px;
  @media (max-width: 820px) {
    padding: 104px 50px 30px;
  }
  @media (max-width: 768px) {
    padding: 20px 10px 30px;
  }
}

.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
}

.sticky-top {
  top: 80px;
  // navbar will be highter when under 878px
  @media (max-width: 878px) {
    top: 100px;
  }
}

.product-title {
  max-height: 100px;
  overflow: auto;
  @media (max-width: 767px) {
    max-width: none;
    overflow: inherit;
  }
}

.book-cover {
  width: 192px;
}

.product-description {
  font-size: 15px;
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  white-space: -pre-wrap; /* Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}
.special-price {
  color: #911400;
}

dl dt {
  float: left;
  font-weight: bold;
  margin-right: 10px;
  padding: 5px;
  width: 100px;
}

dl dd {
  margin: 1px 0;
  padding: 5px 0;
  width: 200px;
}
</style>
