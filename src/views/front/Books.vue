<template>
  <div class="books">
    <div class="opacity-bg-layer page-banner">
      <h1 style="color:black;">書籍 | Books</h1>
    </div>

    <div class="content" style="background-color: #f1ede9;">
      <div class="container">
        <div class="row">
          <div class="col-lg-3 menu-area sticky-top clear-fix">
            <div class="menu">
              <h3>商品分類</h3>
              <ul>
                <li v-for="category in categories" :key="category">
                  <a
                    href="#"
                    @click.prevent="changeCategory(category)"
                    :class="{ active: category == currentCategory }"
                  >{{ category }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-9">
            <div class="row">
              <div class="col-lg-7">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb bg-light">
                    <li class="breadcrumb-item">
                      <router-link to="/">首頁</router-link>
                    </li>
                    <li class="breadcrumb-item active">書籍</li>
                    <li class="breadcrumb-item active">{{ currentCategory }}</li>
                    <li class="breadcrumb-item active" v-if="filterText">搜尋 {{ filterText }}</li>
                  </ol>
                </nav>
              </div>

              <div class="col-lg-5 menu-optional-area mx-auto">
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
                        <font-awesome-icon :icon="currSortByAction.icon" />
                      </span>
                      {{currSortByAction.text}}
                    </button>
                    <div class="dropdown-menu dropdown-menu-right sort-action-group">
                      <button
                        class="dropdown-item"
                        type="button"
                        @click="changeSortBy(sortByAction)"
                        v-for="sortByAction in sortByActions"
                        :key="sortByAction.text"
                      >
                        <span>
                          <font-awesome-icon :icon="sortByAction.icon" />
                        </span>
                        {{sortByAction.text}}
                      </button>
                    </div>
                  </div>
                  <div class="btn-group btn-group-toggle" role="group" data-toggle="buttons">
                    <label class="btn btn-secondary active" @click="changeDisplayStyle('grid')">
                      <input type="radio" name="options" checked />
                      <font-awesome-icon :icon="['fas', 'th-large']" />
                    </label>
                    <label class="btn btn-secondary" @click="changeDisplayStyle('list')">
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
                <div class="col-12 mt-3 mt-lg-0">
                  <div class="row">
                    <div
                      class="col-xl-4 col-lg-4 col-md-4 col-6 grid-card-container"
                      v-for="book in filteredBooks"
                      :key="book.id"
                    >
                      <div class="card border-0 shadow-sm mb-5">
                        <div class="grid-card-actions">
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
                            @click="addToCart({ productId: book.id })"
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
                          <!-- TODO FIX If some book cover is absolutely fit the above card area, the border will be a sharp corner, not rounded. -->
                          <div
                            class="book-cover"
                            :style="{ backgroundImage: `url(${book.imageUrl})` }"
                          >
                            <span class="badge badge-warning float-right ml-2">
                              {{
                              book.subcategory
                              }}
                            </span>
                          </div>
                          <div class="card-body">
                            <p class="product-title">{{ book.title }}</p>
                            <!-- <h5 class="card-title">{{ book.title }}</h5> -->
                            <div
                              class="d-flex justify-content-between align-items-baseline product-price"
                            >
                              <del
                                class="h6 del-price"
                                v-if="book.origin_price!= book.price"
                              >原價 {{ book.origin_price | currency }}</del>
                              <div class="h5" v-else>{{ book.price | currency }} 元</div>
                              <div class="h5 special-price" v-if="book.origin_price!= book.price">
                                <i>特價 {{ book.price | currency }}</i>
                              </div>
                            </div>
                          </div>
                          <!-- TODO display only on mobile device(those can't hover device) -->
                          <!-- <div class="card-footer d-flex">                       
                          </div>-->
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <!-- ListView display -->
              <template v-if="displayStyle == 'list'">
                <div class="col-12 list-group mt-3 mt-lg-0">
                  <div
                    class="list-group-item list-card-container"
                    v-for="book in filteredBooks"
                    :key="book.id"
                  >
                    <div class="list-card-actions ml-sm-4 ml-4">
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
                        @click="addToCart({ productId: book.id })"
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
                      <div class="d-flex w-100 justify-content-start">
                        <div
                          class="book-cover"
                          :style="{ backgroundImage: `url(${book.imageUrl})` }"
                        >
                          <span class="badge badge-warning float-left ml-2">
                            {{
                            book.subcategory
                            }}
                          </span>
                        </div>
                        <div class="ml-3">
                          <div class="mb-1 list-card-title">{{book.title}}</div>
                          <div
                            class="d-flex justify-content-start align-items-baseline product-price"
                          >
                            <del
                              class="h6 del-price mr-2"
                              v-if="book.origin_price!= book.price"
                            >原價 {{ book.origin_price | currency }}</del>
                            <div class="h5 mr-1" v-else>{{ book.price | currency }} 元</div>
                            <div class="h5 special-price" v-if="book.origin_price!= book.price">
                              <i>特價 {{ book.price | currency }}</i>
                            </div>
                          </div>
                          <p class="list-card-description mb-1">{{book.description}}</p>
                        </div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </template>
              <!-- ListView end -->
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
      sortByActions: [
        {
          sortBy: "hot",
          descending: false,
          icon: ["fab", "hotjar"],
          text: "暢銷度"
        },
        {
          sortBy: "price",
          descending: true,
          icon: ["fas", "dollar-sign"],
          text: "價格(低→高)"
        },
        {
          sortBy: "price",
          descending: false,
          icon: ["fas", "dollar-sign"],
          text: "價格(高→低)"
        }
      ],
      currentCategory: "全部書籍",
      currSortByAction: {
        sortBy: "price",
        descending: false,
        icon: ["fab", "hotjar"],
        text: "暢銷度"
      },
      displayStyle: "grid",
      filterText: "",
      status: {
        loadingItem: ""
      }
    };
  },
  methods: {
    changeSortBy(sortByAction) {
      this.currSortByAction = sortByAction;
    },
    changeDisplayStyle(displayStyle) {
      this.displayStyle = displayStyle;
    },
    changeCategory(category) {
      this.currentCategory = category;
    },
    ...mapActions("productModule", ["getProducts"]),
    ...mapActions("favoriteModule", ["toggleFavorite"]),
    ...mapActions("cartModule", ["addToCart"])
  },
  computed: {
    filteredBooks() {
      const vm = this;
      let filteredBooks;
      if (vm.currentCategory == "全部書籍") {
        filteredBooks = vm.products.filter(
          product => product.category == "書籍"
        );
      } else {
        filteredBooks = vm.products.filter(
          product =>
            product.category == "書籍" &&
            product.subcategory == vm.currentCategory
        );
      }
      if (vm.currSortByAction.sortBy == "price") {
        if (vm.currSortByAction.descending) {
          filteredBooks.sort(function(a, b) {
            return a.price - b.price;
          });
        } else {
          filteredBooks.sort(function(a, b) {
            return b.price - a.price;
          });
        }
      }
      return filteredBooks;
    },
    ...mapState("productModule", ["products"])
  },
  created() {
    let categoryIndex = this.categories.indexOf(this.$route.query.category);
    if (categoryIndex != -1) {
      this.currentCategory = this.categories[categoryIndex];
    }
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
          background-color: #7b2f3d;
          text-decoration: none;
        }
        &.active {
          background-color: #7b2f3d;
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
////////
.page-banner {
  position: relative;
  padding: 104px 76px 30px;
  @media (max-width: 820px) {
    padding: 104px 50px 30px;
  }
  @media (max-width: 768px) {
    padding: 20px 10px 30px;
  }
  height: 25vh;
}
.page-banner::after {
  content: "";
  background-image: url("../../assets/img/banner1.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  opacity: 0.6;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  z-index: -1;
}
///////
.menu-area {
  position: relative;
  //padding-top: 220px;
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
      width: 5vw;
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

/// grid card area
.grid-card-container {
  .grid-card-actions {
    z-index: 11;
    height: 0px;
    transition: all 0.3s;
    width: 100%;
    position: absolute;
    margin-top: 250px;
    visibility: hidden;
    background-color: rgba(19, 19, 19, 0.64);
    button {
      // position: relative;
      // width: 50%;
      // height: 100%;
      z-index: 11;
      position: relative;
      margin-top: 0px;
      width: 50%;
      height: 100%;
    }
  }
  .card {
    transition: all 1s;
    .book-cover {
      position: relative;
      height: 250px;
      background-image: url("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");
      background-color: transparent;
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }

    .card-body {
      position: relative;
      background-color: white;
      border-bottom-left-radius: 0.25rem;
      border-bottom-right-radius: 0.25rem;
      z-index: 12;
      .product-title {
        color: black;
        font-size: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: 20px;
      }
      .product-price {
        height: 50px;
        .del-price {
          color: grey;
        }
        .special-price {
          color: #911400;
        }
      }
    }
  }
}
.grid-card-container:hover {
  .grid-card-actions {
    display: block;
    visibility: visible;
    height: 50px;
    margin-top: 200px;
  }
  .card {
    background-color: #a6bbc2;
    transition: all 1s;

    .card-body {
      transition: all 1s;
      background-color: #414e53;
      .product-title {
        color: white;
      }
      .special-price {
        color: red;
      }
    }
  }
}

/// list card container
.list-card-container {
  .book-cover {
    position: relative;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: 200px;
    @media (max-width: 576px) {
      width: 110px;
      height: 110px;
      flex-basis: 110px;
    }
    background-image: url("https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png");
    background-color: transparent;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .list-card-title {
    color: #1b6180;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    font-size: 1.5rem;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    @media (max-width: 576px) {
      font-size: 1.2rem;
    }
  }
  .del-price {
    color: grey;
  }
  .special-price {
    color: #911400;
  }
  .list-card-description {
    font-size: 16px;
    color: black;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    @media (max-width: 576px) {
      display: none;
    }
  }
  .list-card-actions {
    position: absolute;
    bottom: 0;
    left: 200px;
    right: 0;
    background-color: rgba(19, 19, 19, 0.64);

    button {
      position: relative;
      width: 50%;
    }
    @media (max-width: 576px) {
      left: 110px;
    }
  }
}
.list-group .list-card-container:last-child .list-card-actions {
  border-bottom-right-radius: 0.25rem;
}
.list-card-container:hover {
  background-color: #a6bbc2;
  transition: all 1s;
  .list-card-title {
    color: white;
  }
  .special-price {
    color: red;
  }
}
</style>
