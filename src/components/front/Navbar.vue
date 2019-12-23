<template>
  <div>
    <!-- <nav class="navbar navbar-light bg-light">
      <a class="navbar-brand">Navbar</a>
      <form class="form-inline">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </nav>-->
    <nav
      class="navbar navbar-expand-md transparent navbar-inverse navbar-light"
    >
      <router-link class="navbar-brand" to="/">
        <img
          src="../../assets/logo.svg"
          width="54"
          height="54"
          class="d-inline-block"
          alt
        />
        <span class="align-bottom">
          <i>ReaListiC Store</i>
        </span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- display left navbar part above md screen start -->
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ml-lg-3 d-none d-md-flex">
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/books">書籍</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">音樂</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">活動</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">店鋪資訊</a>
          </li>
        </ul>
        <!-- display left navbar part above md screen end -->
        <!-- display navbar part under md screen start -->
        <ul
          class="nav mr-auto mt-2 mt-lg-0 ml-lg-3 d-md-none justify-content-center"
        >
          <li class="nav-item">
            <router-link class="nav-link" to="/">首頁</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/books">書籍</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">音樂</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">活動</a>
          </li>
        </ul>
        <div class="search-area text-center d-md-none">
          <div class="search-inner-area mx-auto">
            <input
              class="search-input"
              type="text"
              placeholder="想找什麼？"
              v-model.trim="searchInput"
            />
            <div class="btn btn-sm search-btn" @click="redirectToSearchPage">
              <font-awesome-icon
                :icon="['fas', 'search']"
                size="2x"
                :style="{ color: '#565656' }"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- display right navbar part above md screen start -->
      <div class="d-none d-md-block header-action-area">
        <ul class="navbar-nav">
          <li class="nav-item mx-auto">
            <div class="search-area">
              <form @submit.prevent="redirectToSearchPage">
                <input
                  class="search-input"
                  type="text"
                  placeholder="想找什麼？"
                  v-model.trim="searchInput"
                />
                <!-- NOTE: click won't work here, because mouseup event can't be detected -->
                <div
                  class="btn btn-sm search-btn"
                  @mousedown="redirectToSearchPage"
                >
                  <font-awesome-icon
                    :icon="['fas', 'search']"
                    size="2x"
                    :style="{ color: '#565656' }"
                  />
                </div>
              </form>
            </div>
          </li>
          <!-- user start -->
          <li class="nav-item dropdown mx-auto">
            <button class="btn btn-sm" data-toggle="dropdown" data-flip="false">
              <font-awesome-icon
                :icon="['fas', 'user']"
                size="2x"
                :style="{ color: '#565656' }"
              />
            </button>
            <div class="dropdown-menu dropdown-menu-right p-3">
              <router-link class="dropdown-item" :to="{ name: 'Orders' }"
                >訂單列表</router-link
              >
              <router-link class="dropdown-item" :to="{ name: 'AdminLogin' }"
                >後台管理</router-link
              >
            </div>
          </li>
          <!-- user end -->
          <!-- like start -->
          <div class="dropdown ml-auto">
            <button
              class="btn action-btn btn-sm"
              data-toggle="dropdown"
              data-flip="false"
            >
              <font-awesome-icon
                :icon="['fas', 'heart']"
                size="2x"
                :style="{ color: '#565656' }"
              />
              <span
                class="badge badge-pill badge-danger"
                v-if="favorites.length > 0"
                >{{ favorites.length }}</span
              >
            </button>
            <div
              class="dropdown-menu dropdown-menu-right p-3"
              style="min-width: 300px; max-height: 600px; overflow:auto;"
              data-offset="400"
            >
              <h6 class="text-center">我的收藏</h6>
              <FavoriteList @remove-favorite="toggleFavorite" />
            </div>
          </div>
          <!-- like end -->
          <!-- cart start -->
          <div class="dropdown ml-auto">
            <button
              class="btn btn-sm action-btn"
              data-toggle="dropdown"
              data-flip="false"
            >
              <font-awesome-icon
                :icon="['fas', 'shopping-cart']"
                size="2x"
                :style="{ color: '#565656' }"
              />
              <span
                class="badge badge-pill badge-danger"
                v-if="totalQtyInCarts > 0"
                >{{ totalQtyInCarts }}</span
              >
            </button>
            <div
              class="dropdown-menu dropdown-menu-right p-3"
              style="min-width: 300px; max-height: 600px; overflow:auto;"
              data-offset="400"
            >
              <h6 class="text-center">購物車清單</h6>
              <table class="table table-sm">
                <template v-if="totalQtyInCarts > 0">
                  <thead>
                    <th class="align-middle">商品名稱</th>
                    <th class="align-middle" style="min-width">數量</th>
                    <th class="align-middle text-right">金額</th>
                    <th></th>
                  </thead>
                  <tbody>
                    <tr v-for="cartItem in cart.carts" :key="cartItem.id">
                      <td class="align-middle">{{ cartItem.product.title }}</td>
                      <td
                        class="align-middle text-center"
                        style="min-width: 45px"
                      >
                        {{ cartItem.qty }} {{ cartItem.product.unit }}
                      </td>
                      <td class="align-middle text-right">
                        {{ cartItem.total | currency }}
                      </td>
                      <td class="align-middle text-center">
                        <a
                          href="#"
                          class="text-muted"
                          @click.prevent="removeCart(cartItem.id)"
                        >
                          <font-awesome-icon :icon="['fas', 'trash']" />
                        </a>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right">總計</td>
                      <td class="text-right">{{ cart.total }}</td>
                    </tr>
                  </tfoot>
                </template>
                <template v-else>
                  <tr>
                    <td class="align-middle text-center">購物車沒有商品</td>
                  </tr>
                </template>
              </table>
              <router-link
                :to="{ name: 'Checkout', query: { step: 1 } }"
                class="btn btn-primary btn-block"
                v-if="totalQtyInCarts > 0"
                >結帳去</router-link
              >
            </div>
          </div>
          <!-- cart end -->
        </ul>
      </div>
      <!-- display right navbar part above md screen end -->
    </nav>

    <!-- temp start -->
    <div class="container d-md-none">
      <ul class="nav footer-action-area d-flex justify-content-between">
        <li class="nav-item">
          <router-link class="btn btn-sm text-center" :to="{ name: 'Home' }">
            <font-awesome-icon
              :icon="['fas', 'home']"
              size="2x"
              :style="{ color: '#565656' }"
            />
            <div>首頁</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="btn btn-sm action-btn text-center"
            :to="{ name: 'Home' }"
          >
            <font-awesome-icon
              :icon="['fas', 'map-marked-alt']"
              size="2x"
              :style="{ color: '#565656' }"
            />
            <div>店鋪資訊</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="btn btn-sm action-btn text-center"
            :to="{ name: 'MemberCenter' }"
          >
            <font-awesome-icon
              :icon="['fas', 'user']"
              size="2x"
              :style="{ color: '#565656' }"
            />
            <div>會員中心</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="btn btn-sm action-btn text-center"
            :to="{ name: 'Favorites' }"
          >
            <div class="action-pic-area">
              <font-awesome-icon
                :icon="['fas', 'heart']"
                size="2x"
                :style="{ color: '#565656' }"
              />
              <span
                class="badge badge-pill badge-danger"
                v-if="favorites.length > 0"
                >{{ favorites.length }}</span
              >
            </div>
            <div>我的收藏</div>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="btn btn-sm action-btn text-center"
            :to="{ name: 'Checkout', query: { step: 1 } }"
          >
            <div class="action-pic-area">
              <font-awesome-icon
                :icon="['fas', 'shopping-cart']"
                size="2x"
                :style="{ color: '#565656' }"
              />
              <span
                class="badge badge-pill badge-danger"
                v-if="totalQtyInCarts > 0"
                >{{ totalQtyInCarts }}</span
              >
            </div>
            <div>購物車</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions, mapState, mapGetters } from "vuex";
import FavoriteList from "@/components/front/FavoriteList.vue";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  data() {
    return {
      searchInput: ""
    };
  },
  components: {
    FavoriteList
  },
  methods: {
    ...mapActions("favoriteModule", ["getFavorites", "toggleFavorite"]),
    ...mapActions("cartModule", ["getCart", "removeCart"]),
    redirectToSearchPage() {
      if (this.searchInput.length == 0) {
        return;
      }
      this.$router.push({
        name: "Books",
        query: { search: this.searchInput }
      });
      this.searchInput = "";
    }
  },
  computed: {
    ...mapState("cartModule", ["cart"]),
    ...mapState("favoriteModule", ["favorites"]),
    ...mapGetters("cartModule", ["totalQtyInCarts"])
  },
  created() {
    this.getCart();
    this.getFavorites();
    //選單效果
    $(window).on("scroll", function() {
      var scrollValue = $(window).scrollTop();
      var offset = 1;
      if (scrollValue > offset) {
        $(".navbar").addClass("scrolled");
        // $(".navbar").removeClass("py-1");
        $(".navbar").removeClass("transparent");
        $(".navbar").removeClass("navbar-inverse");
      } else {
        $(".navbar").removeClass("scrolled");
        // $(".navbar").addClass("py-1");
        $(".navbar").addClass("transparent");
        $(".navbar").addClass("navbar-inverse");
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  max-height: none;
  @media (min-width: 769px) {
    // while width is 769~793, the height will bigger than 104px
    max-height: 104px;
    // extract from fixed-top class
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
  }

  .action-btn {
    background-color: transparent;
    position: relative;
  }

  // cart badge position
  .action-btn .badge {
    position: absolute;
    top: 1px;
    right: 1px;
  }
}
.navbar-brand {
  color: black;
  background-color: transparent;
  box-shadow: none;
  font-size: 1.2rem;
  transition: all 0.3s ease-in-out;
  a {
    color: black;
  }
  a:hover {
    text-decoration: none;
  }
  img {
    width: 64px;
    height: 64px;
  }
  span {
    text-decoration: none;
    //border-bottom: 1px solid #000;
  }
}

.scrolled {
  background-color: #fff;
  box-shadow: 0 1px 13px 2px rgba(0, 0, 0, 0.11);
  .navbar-brand {
    padding: 0;
    img {
      width: 54px;
      height: 54px;
    }
    @media (max-width: 768px) {
      span {
        display: none;
      }
    }
  }
}

#navbarSupportedContent {
  min-width: 270px;
}

.navbar-nav {
  font-size: 16px;
  .nav-link {
    // TODO make the better hover animation effect and color
    color: #565656;
    transition: all 0.2s;
    transition: 0.3s ease-in-out;
    padding: 8px 15px;
    text-align: center;
    &:hover {
      color: black;
    }
    &.router-link-exact-active {
      color: black;
      font-weight: bold;
      border-bottom: 1px solid black;
    }
    // @media (max-width: 992px) {
    //   border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    // }
  }
}
.nav {
  font-size: 16px;
  .nav-link {
    // TODO make the better hover animation effect and color
    color: #565656;
    transition: all 0.2s;
    transition: 0.3s ease-in-out;
    padding: 8px 15px;
    text-align: center;
    &:hover {
      color: black;
    }
    &.router-link-exact-active {
      color: black;
      font-weight: bold;
      border-bottom: 1px solid black;
    }
    @media (max-width: 992px) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
}

.tmp {
  display: flex;
  justify-content: center;
  margin-bottom: 0;
  padding: 0;
  li {
    list-style: none;
    &::before {
      content: "/";
      display: inline;
      color: rgba(255, 255, 255, 0.3);
    }
    &:nth-child(1)::before {
      content: "";
    }
    .nav-link {
      color: rgba(255, 255, 255, 0.8);
      padding: 10px;
      font-size: 15px;
      display: inline-block;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: #ffe26d;
      }
    }
  }
}

.footer-action-area {
  width: 100%;
  height: 50px;
  background: #000;
  border-top: 1px solid #cccccc;
  position: fixed;
  bottom: 0px;
  left: 0px;
  // same as fixed-top class
  z-index: 1030;

  // let click part be 20% area
  li {
    width: 20%;
    a {
      // this font-size is for font-awesome-icon
      font-size: 0.75rem;
      width: 100%;
    }
  }

  // make the 4 chinese word in 1 line
  .btn-sm {
    padding-left: 0.25rem;
    padding-right: 0.25rem;
  }

  // action button with badge
  .action-btn {
    background-color: transparent;
    position: relative;
  }
  .action-pic-area {
    display: inline-block;
    position: relative;
    font-size: 0.75rem;
  }
  .action-btn .action-pic-area .badge {
    position: absolute;
    top: -5px;
    right: -15px;
  }
}

////

@import url("https://fonts.googleapis.com/css?family=Lato:500", 300, 400, 700);
@import url("https://raw.github.com/FortAwesome/Font-Awesome/master/docs/assets/css/font-awesome.min.css");
// search area when above md screen size
.header-action-area {
  .search-area:focus-within {
    z-index: 1;
  }
  .search-area {
    width: 150px;
    height: 100%;
    padding: 0;
    position: relative;
    .search-input {
      height: 100%;
      font-family: "Lato";
      font-weight: 100;
      border: none;
      outline: none;
      color: black;
      padding: 3px;
      padding-right: 44px;
      width: 0px;
      position: absolute;
      top: 0;
      right: 0;
      background: none;
      z-index: 3;
      transition: width 0.4s cubic-bezier(0, 0.795, 0, 1);
      cursor: pointer;
    }

    // .search-input:focus:hover {
    //   border-bottom: 1px solid red;
    // }
    .search-input::placeholder {
      color: black;
      opacity: 0.8;
    }

    .search-input:focus {
      width: 100%;
      z-index: 1;
      border-bottom: 1px solid#565656;
      cursor: text;
    }

    .search-btn {
      border: none;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      cursor: pointer;
      transition: opacity 0.4s ease;
    }

    .search-btn:hover {
      opacity: 0.8;
    }
  }
}

// search area when under md screen size
.navbar-collapse {
  .search-area {
    .search-inner-area {
      position: relative;
      width: 200px;
      .search-input {
        font-size: 1rem;
        font-family: "Lato";
        font-weight: 100;
        // width 100% to fix firefox overflow
        width: 100%;
        height: 40px;
        border: none;
        outline: none;
        padding: 3px;
        padding-right: 44px;
        background: none;
        border-bottom: 1px solid#565656;
      }

      .search-btn {
        border: none;
        position: absolute;
        top: 0;
        right: 0;
      }
    }
  }
}
</style>
