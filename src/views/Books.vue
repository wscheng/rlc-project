<template>
  <div class="books" style="background-color: #f1ede9;">
    <loading :active.sync="isLoading"></loading>

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
                <li v-for="category in categories" :key="category.id">
                  <a
                    href="#"
                    @click.prevent="changeCategory(category)"
                    :class="{active: category.id == currentCategory.id }"
                  >{{category.title}}</a>
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
                    <li class="breadcrumb-item">
                      <router-link to="/books">書籍</router-link>
                    </li>
                    <li class="breadcrumb-item active">{{currentCategory.title}}</li>
                    <li class="breadcrumb-item active" v-if="filterText">搜尋 {{ filterText }}</li>
                  </ol>
                </nav>
              </div>

              <div class="col-lg-4 menu-optional-area">
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
              <div class="col-xl-4 col-lg-4 col-md-4 col-6" v-for="item in products" :key="item.id">
                <div class="card border-0 shadow-sm mb-5">
                  <div class="pro-pic" :style="{backgroundImage: `url(${item.imageUrl})`}">
                    <span class="badge badge-warning float-right ml-2">{{ item.category }}</span>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">
                      <a href="#" class="text-dark">{{ item.title }}</a>
                    </h5>
                    <div class="d-flex justify-content-between align-items-baseline">
                      <div class="h5" v-if="!item.origin_price">{{ item.price | currency }} 元</div>
                      <del class="h6" v-if="item.origin_price">原價 {{ item.origin_price | currency }}</del>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
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
      orderOptions: [],
      orderBy: "",
      status: {
        loadingItem: ""
      }
    };
  },
  methods: {
    ...mapActions(["getProducts"]),
    changeCategory(category) {
      this.currentCategory = category;
      this.getProducts(this.currentCategory.id);
    }
  },
  computed: {
    ...mapState(["isLoading", "products"])
  },
  created() {
    this.getProducts(this.currentCategory.id);
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
  background-image: url("../assets/img/banner1.jpg");
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
.card {
  .pro-pic {
    height: 150px;
    background-size: cover;
    background-position: center;
  }
  .card-body {
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