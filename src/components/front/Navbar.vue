<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
      <div class="container">
        <div class="logo-area">
          <router-link class="navbar-brand" to="/">
            <img src="../../assets/logo.svg" alt />
          </router-link>
        </div>

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
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0 ml-lg-3">
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
          <ul class="navbar-nav mr-auto tmp">
            <form class="form-inline my-2 my-lg-0">
              <input
                class="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                class="btn btn-outline-success my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
            <i class="fas fa-shopping-cart"></i>
          </ul>
        </div>
      </div>

      <!-- user start -->
      <div class="dropdown ml-auto">
        <button
          class="btn btn-sm btn-cart"
          data-toggle="dropdown"
          data-flip="false"
        >
          <font-awesome-icon
            :icon="['fas', 'user']"
            size="2x"
            :style="{ color: '#565656' }"
          />
        </button>
        <div class="dropdown-menu dropdown-menu-right p-3 text-center">
          <router-link :to="{ name: 'Orders' }">
            訂單列表
          </router-link>
        </div>
      </div>
      <!-- user end -->
      <!-- like start -->
      <div class="dropdown ml-auto">
        <button
          class="btn btn-sm btn-cart"
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
          style="min-width: 300px"
          data-offset="400"
        >
          <h6 class="text-center">追蹤清單</h6>
          <table class="table table-sm">
            <template v-if="favorites.length > 0">
              <thead>
                <th class="align-middle">商品照片</th>
                <th class="align-middle">商品名稱</th>
                <th class="align-middle text-right">折扣</th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="favorite in favorites" :key="favorite[0]">
                  <div
                    class="favorite-image"
                    :style="{
                      backgroundImage: `url(${favorite[1].imageUrl})`
                    }"
                  />
                  <td class="align-middle">{{ favorite[1].title }}</td>
                  <td class="align-middle">
                    {{ favorite[1].origin_price }} {{ favorite[1].price }}
                  </td>
                  <!-- TODO don't hide the drop-down menu after delete button clicked -->
                  <td class="align-middle text-center">
                    <a
                      href="#"
                      class="text-muted"
                      @click.prevent="toggleFavorite(favorite[1])"
                    >
                      <font-awesome-icon :icon="['fas', 'trash']" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </template>
            <template v-else>
              <tr>
                <td class="align-middle text-center">沒有追蹤的商品</td>
              </tr>
            </template>
          </table>
        </div>
      </div>
      <!-- like end -->
      <!-- cart start -->
      <div class="dropdown ml-auto">
        <button
          class="btn btn-sm btn-cart"
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
          style="min-width: 300px"
          data-offset="400"
        >
          <h6 class="text-center">購物車清單</h6>
          <table class="table table-sm">
            <template v-if="totalQtyInCarts > 0">
              <thead>
                <th class="align-middle">商品名稱</th>
                <th class="align-middle">數量</th>
                <th class="align-middle text-right">金額</th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="cartItem in cart.carts" :key="cartItem.id">
                  <td class="align-middle">{{ cartItem.product.title }}</td>
                  <td class="align-middle">
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
          >
            結帳去
          </router-link>
        </div>
      </div>
      <!-- cart end -->
    </nav>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  methods: {
    ...mapActions("favoriteModule", ["getFavorites", "toggleFavorite"]),
    ...mapActions("cartModule", ["getCart", "removeCart"])
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
      } else {
        $(".navbar").removeClass("scrolled");
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.logo-area {
  width: 92px;
  position: relative;
  transition: all 0.3s ease-in-out;
  .navbar-brand {
    height: 5vw;
    min-height: 59px;
    background-color: transparent;
    background-image: url("../../assets/logo.svg");
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    box-shadow: none;
    img {
      display: none;
    }
  }

  @media (min-width: 991px) {
    .navbar-brand {
      // background: #fcf3d7;
      background-image: none;
      position: absolute;
      border-radius: 0 0 10px 10px;
      top: -30px;
      padding: 20px;
      height: auto;
      img {
        display: block;
        width: 100%;
      }
    }
  }
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
    @media (max-width: 992px) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
}
.navbar-dark .navbar-toggler {
  border: none;
  color: black;
  &:focus {
    outline: none;
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
.fixed-top {
  // top: 0px;
  // transition: top 0.1s ease-in-out;
}
.scrolled {
  background-color: #fff;
  box-shadow: 0 1px 13px 2px rgba(0, 0, 0, 0.11);

  // background-image: url("../assets/img/paper_bg.jpg");
  @media (min-width: 992px) {
    .logo-area {
      width: 72px;
      .navbar-brand {
        padding: 10px;
      }
    }
  }
}

.btn-cart {
  background-color: transparent;
  position: relative;
}

// cart badge position
.btn-cart .badge {
  position: absolute;
  top: 1px;
  right: 1px;
}
.favorite-image {
  width: 60px;
  height: 80px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
