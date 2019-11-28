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
                  <router-link to="/books">{{ product.category }}</router-link>
                </li>
                <li class="breadcrumb-item">
                  <router-link
                    :to="{
                      path: '/books',
                      query: { category: product.subcategory }
                    }"
                    >{{ product.subcategory }}</router-link
                  >
                </li>

                <li class="breadcrumb-item active">
                  {{ product.title }}
                </li>
              </ol>
            </nav>
            <!-- breadcrumb end -->
          </div>
          <!-- product detail -->
          <h1>{{ product.title }}</h1>
          <select v-model="qty"
            ><option v-for="num in 10" :key="num" :value="num"
              >{{ num }} 份</option
            ></select
          >
          <button @click="addToCart({ productId: product.id, qty: qty })">
            加入購物車
          </button>
          <img :src="product.imageUrl" />
          <p>{{ product.content }}</p>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapMutations } from "vuex";
import axios from "axios";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  data() {
    return {
      productId: "",
      product: {},
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
    ...mapMutations(["setLoading"]),
    getProduct(productId) {
      const vm = this;
      const singleProductUrl = `${Vue.prototype.$_USER_API_URL}/product/${productId}`;
      console.warn("url", singleProductUrl);
      vm.setLoading(true);
      axios.get(singleProductUrl).then(response => {
        if (response.data.success) {
          console.warn(response.data.product);
          vm.product = response.data.product;
        } else {
          console.error("cant get products! reason: ", response.data.message);
        }
        vm.setLoading(false);
      });
    },
    ...mapActions("cartModule", ["addToCart"])
  },
  computed: {},
  created() {
    this.productId = this.$route.params.productId;
    this.getProduct(this.productId);
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 20px 0;
  .menu {
    h3 {
      color: #a6bbc2;
      font-weight: bold;
      font-size: 18px;
      text-align: center;
    }
    ul {
      list-style: none;
      padding: 0;
      li a {
        background-color: #a6bbc2;
        display: block;
        text-align: center;
        margin-bottom: 8px;
        padding: 10px;
        color: white;
        transition: all 0.2s ease-in;
        &:hover {
          background-color: red;
          text-decoration: none;
        }
        &.active {
          background-color: red;
        }
      }
    }
    @media (max-width: 992px) {
      ul {
        display: flex;
        justify-content: space-between;
        li {
          width: 20%;
          margin: 0 5px;
          &:nth-child(1) {
            margin: 0 5px 0 0;
          }
          &:last-child {
            margin: 0 0 0 5px;
          }
        }
      }
    }
    @media (max-width: 576px) {
      width: 100%;
      overflow: overlay;
      h3 {
        display: none;
      }
      ul {
        width: max-content;
        li {
          width: 22vw;
          // when scroll to the 1st child & the last child
          // the element won't have the gradient effect
          &:nth-child(1),
          &:last-child {
            position: relative;
            z-index: 1;
          }
        }
      }
    }
    @media (max-width: 372px) {
      ul li {
        width: 65px;
        height: 65px;
      }
    }
  }
}
.page-banner {
  //background-image: url("@/assets/img/banner1.jpg");
  height: 30vw;
}
.menu-area {
  position: relative;
  @media (max-width: 576px) {
    &::after,
    &::before {
      content: "";
      background: linear-gradient(
        to left,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
      );
      position: absolute;
      top: 0;
      right: 15px;
      width: 15vw;
      height: 100%;
    }
    &::before {
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 1),
        rgba(255, 255, 255, 0)
      );
      right: auto;
      left: 15px;
    }
  }
}
.breadcrumb-item + .breadcrumb-item::before {
  content: ">";
}
.menu-optional-area {
  position: relative;
}
a.card-link:hover {
  .card {
    .book-cover {
      .hover-card-actions {
        display: block;
        visibility: visible;
        height: 15%;
        button {
          z-index: 1;
        }
      }
    }
  }
}
.card {
  transition: all 1s;
  .book-cover {
    position: relative;
    height: 250px;
    background-image: url("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;

    .hover-card-actions {
      transition: all 0.3s;
      width: 100%;
      height: 0%;
      bottom: 0;
      visibility: hidden;
      position: absolute;
      background-color: rgba(19, 19, 19, 0.64);
      button {
        width: 50%;
        height: 100%;
      }
    }
  }

  .card-body {
    z-index: 12;
    background-color: white;
    .card-text {
      white-space: nowrap;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      min-height: 20px;
    }
  }
}
</style>
