<template>
  <div class="books" style="background-color: #f1ede9;">
    <div class="page-banner">
      <h1>書籍 | Books</h1>
    </div>

    <div class="content">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 menu-area">
            <div class="menu">
              <h3>商品分類</h3>
              <ul>
                <li v-for="category in categories" :key="category">
                  <a
                    href="#"
                    @click.prevent="changeCategory(category)"
                    :class="{ active: category == currentCategory }"
                    >{{ category }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-8">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-light">
                    <li class="breadcrumb-item">
                      <router-link to="/">首頁</router-link>
                    </li>
                    <li class="breadcrumb-item active">
                      書籍
                    </li>
                    <li class="breadcrumb-item active">
                      {{ currentCategory }}
                    </li>
                    <li class="breadcrumb-item active" v-if="filterText">
                      搜尋 {{ filterText }}
                    </li>
                  </ol>
                </nav>
              </div>

              <div class="col-lg-4 menu-optional-area mb-2">
                <div
                  class="btn-toolbar justify-content-end"
                  role="toolbar"
                  aria-label="Toolbar with button groups"
                >
                  <div
                    class="btn-group mr-2"
                    role="group"
                    aria-label="First group"
                  >
                    <button
                      type="button"
                      class="btn btn-secondary dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span>
                        <font-awesome-icon :icon="['fab', 'hotjar']" />
                      </span>
                      暢銷度
                    </button>
                    <div class="dropdown-menu dropdown-menu-right">
                      <button class="dropdown-item" type="button">
                        <span>
                          <font-awesome-icon :icon="['fab', 'hotjar']" />
                        </span>
                        暢銷度
                      </button>
                      <button class="dropdown-item" type="button">
                        <span>
                          <font-awesome-icon :icon="['fas', 'dollar-sign']" />
                        </span>
                        價格(高→低)
                      </button>
                      <button class="dropdown-item" type="button">
                        <span>
                          <font-awesome-icon :icon="['fas', 'dollar-sign']" />
                        </span>
                        價格(低→高)
                      </button>
                    </div>
                  </div>
                  <div
                    class="btn-group btn-group-toggle"
                    role="group"
                    data-toggle="buttons"
                  >
                    <label
                      class="btn btn-secondary active"
                      @click="changeDisplayStyle('grid')"
                    >
                      <input type="radio" name="options" checked />
                      <font-awesome-icon :icon="['fas', 'th-large']" />
                    </label>
                    <label
                      class="btn btn-secondary"
                      @click="changeDisplayStyle('list')"
                    >
                      <input type="radio" name="options" />
                      <font-awesome-icon :icon="['fas', 'list']" />
                    </label>
                  </div>
                </div>
              </div>

              <!-- <div class="col-lg-9">
            <div class="row">
              <div class="col-12">
                <nav class="navbar secondary-color">
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb bg-light">
                      <li class="breadcrumb-item">
                        <router-link to="/">首頁</router-link>
                      </li>
                      <li class="breadcrumb-item">
                        <router-link to="/books">書籍</router-link>
                      </li>
                      <li class="breadcrumb-item active">{{currentCategory.title}}</li>
                      <li class="breadcrumb-item active" v-if="filterText">搜尋 {{ filterText }}</li>
                    </ol>
                  </nav>
                  <div
                    class="btn-toolbar justify-content-end"
                    role="toolbar"
                    aria-label="Toolbar with button groups"
                  >
                    <div class="btn-group mr-2" role="group" aria-label="First group">
                      <button
                        type="button"
                        class="btn btn-secondary dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span>
                          <font-awesome-icon :icon="['fab', 'hotjar']" />
                        </span>
                        暢銷度
                      </button>
                      <div class="dropdown-menu dropdown-menu-right">
                        <button class="dropdown-item" type="button">
                          <span>
                            <font-awesome-icon :icon="['fab', 'hotjar']" />
                          </span>
                          暢銷度
                        </button>
                        <button class="dropdown-item" type="button">
                          <span>
                            <font-awesome-icon :icon="['fas', 'dollar-sign']" />
                          </span>
                          價格(高→低)
                        </button>
                        <button class="dropdown-item" type="button">
                          <span>
                            <font-awesome-icon :icon="['fas', 'dollar-sign']" />
                          </span>
                          價格(低→高)
                        </button>
                      </div>
                    </div>
                    <div class="btn-group" role="group" aria-label="Second group">
                      <button type="button" class="btn btn-secondary active">
                        <font-awesome-icon :icon="['fas', 'th-large']" />
                      </button>
                      <button type="button" class="btn btn-secondary">
                        <font-awesome-icon :icon="['fas', 'list']" />
                      </button>
                    </div>
                  </div>
                </nav>
              </div>-->

              <!-- GridView display -->
              <template v-if="displayStyle == 'grid'">
                <div
                  class="col-xl-4 col-lg-4 col-md-4 col-6"
                  v-for="book in filteredBooks"
                  :key="book.id"
                >
                  <div class="hover-card-actions">
                    <!-- boostrap bug: border-right border-white won't work! -->
                    <button
                      type="button"
                      title="加入我的最愛"
                      class="btn border-left-0 border-top-0 border-bottom-0 border-white rounded-0"
                      @click="toggleFavorite(book)"
                      :style="{
                        color: book.isFavorite ? 'red' : 'white'
                      }"
                    >
                      <font-awesome-icon :icon="['fas', 'heart']" />
                    </button>
                    <button
                      type="button"
                      title="加入購物車"
                      class="btn border-right-0 border-top-0 border-bottom-0 border-white rounded-0"
                      @click.prevent="addtoCart(book.id)"
                    >
                      <font-awesome-icon
                        :icon="['fas', 'shopping-cart']"
                        :style="{ color: 'white' }"
                      />
                    </button>
                  </div>
                  <router-link
                    class="card-link"
                    :to="{ name: 'Book', params: { productId: book.id } }"
                  >
                    <div class="card border-0 shadow-sm mb-5">
                      <div
                        class="book-cover"
                        :style="{ backgroundImage: `url(${book.imageUrl})` }"
                      >
                        <span class="badge badge-warning float-right ml-2">{{
                          book.subcategory
                        }}</span>
                      </div>
                      <div class="card-body">
                        <h5 class="card-title">
                          <a href="#" class="text-dark">{{ book.title }}</a>
                        </h5>
                        <div
                          class="d-flex justify-content-between align-items-baseline"
                        >
                          <div class="h5" v-if="!book.origin_price">
                            {{ book.price | currency }} 元
                          </div>
                          <del class="h6" v-if="book.origin_price"
                            >原價 {{ book.origin_price | currency }}</del
                          >
                          <div class="h5" v-if="book.origin_price">
                            特價 {{ book.price | currency }}
                          </div>
                        </div>
                      </div>
                      <!-- TODO display only on mobile device(those can't hover device) -->
                      <div class="card-footer d-flex">
                        <router-link
                          class="btn btn-outline-secondary btn-sm"
                          :to="'/book/' + book.id"
                          >查看更多</router-link
                        >
                        <button
                          type="button"
                          class="btn btn-outline-danger btn-sm ml-auto"
                          @click="addtoCart(book.id)"
                        >
                          <i
                            class="fas fa-spinner fa-spin"
                            v-if="book.id === status.loadingItem"
                          ></i>
                          加到購物車
                        </button>
                      </div>
                    </div>
                  </router-link>
                </div>
              </template>
              <!-- ListView display -->
              <template v-if="displayStyle == 'list'">
                <div class="col-12 list-group">
                  <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">List group item heading</h5>
                      <small class="text-muted">3 days ago</small>
                    </div>
                    <p class="mb-1">
                      Donec id elit non mi porta gravida at eget metus. Maecenas
                      sed diam eget risus varius blandit.
                    </p>
                    <small class="text-muted"
                      >Donec id elit non mi porta.</small
                    >
                  </a>
                  <a href="#" class="list-group-item list-group-item-action">
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">List group item heading</h5>
                      <small class="text-muted">3 days ago</small>
                    </div>
                    <p class="mb-1">
                      Donec id elit non mi porta gravida at eget metus. Maecenas
                      sed diam eget risus varius blandit.
                    </p>
                    <small class="text-muted"
                      >Donec id elit non mi porta.</small
                    >
                  </a>
                  <!-- <div class="card border-0 shadow-sm mb-5">
                    <div class="book-cover" :style="{backgroundImage: `url(${item.imageUrl})`}">
                      <span class="badge badge-warning float-right ml-2">{{ item.category }}</span>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">
                        <a href="#" class="text-dark">{{ item.title }}</a>
                      </h5>
                      <div class="d-flex justify-content-between align-items-baseline">
                        <div class="h5" v-if="!item.origin_price">{{ item.price | currency }} 元</div>
                        <del
                          class="h6"
                          v-if="item.origin_price"
                        >原XXX {{ item.origin_price | currency }}</del>
                        <div class="h5" v-if="item.origin_price">特價 {{ item.price | currency }}</div>
                      </div>
                    </div>
                    <div class="card-footer d-flex">
                      <router-link
                        class="btn btn-outline-secondary btn-sm"
                        :to="'/item/'+item.id"
                      >查看更多</router-link>
                      <button
                        type="button"
                        class="btn btn-outline-danger btn-sm ml-auto"
                        @click="addtoCart(item.id)"
                      >
                        <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
                        加到購物車
                      </button>
                    </div>
                  </div>-->
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  data() {
    return {
      categories: [
        "全部書籍",
        "文學小說",
        "心理勵志",
        "藝術設計",
        "電腦資訊",
        "教科書"
      ],
      currentCategory: "全部書籍",
      orderOptions: [],
      orderBy: "",
      displayStyle: "grid",
      filterText: "",
      status: {
        loadingItem: ""
      }
    };
  },
  methods: {
    changeDisplayStyle(displayStyle) {
      this.displayStyle = displayStyle;
    },
    changeCategory(category) {
      this.currentCategory = category;
    },
    ...mapActions("productModule", ["getProducts"]),
    ...mapActions("cartModule", ["addToCart"]),
    ...mapActions("favoriteModule", ["toggleFavorite", "getFavorites"])
  },
  computed: {
    filteredBooks() {
      const vm = this;
      if (vm.currentCategory == "全部書籍") {
        return vm.products.filter(product => product.category == "書籍");
      }
      return vm.products.filter(
        product =>
          product.category == "書籍" &&
          product.subcategory == vm.currentCategory
      );
    },
    ...mapState("productModule", ["products"])
  },
  created() {
    let categoryIndex = this.categories.indexOf(this.$route.query.category);
    if (categoryIndex != -1) {
      this.currentCategory = this.categories[categoryIndex];
    }
    this.getFavorites();
    this.getProducts();
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
  background-image: url("../../assets/img/banner1.jpg");
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

.hover-card-actions {
  z-index: 100;
  height: 250px;
  transition: all 0.3s;
  width: 100%;
  bottom: 0;
  visibility: visible;
  // visibility: hidden;
  position: absolute;
  background-color: rgba(19, 19, 19, 0.64);
  button {
    width: 50%;
    height: 50%;
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
