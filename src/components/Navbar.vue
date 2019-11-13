<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark transparent fixed-top">
      <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light"> -->
      <div class="container">
        <div class="logo-area">
          <a class="navbar-brand" href="#">
            <img src="../assets/logo.svg" alt />
          </a>
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
              <a class="nav-link" href="#">書籍</a>
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
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            <i class="fas fa-shopping-cart"></i>
          </ul>
        </div>
      </div>

      <div class="dropdown ml-auto">
        <button class="btn btn-sm btn-cart" data-toggle="dropdown" data-flip="false">
          <font-awesome-icon
            :icon="['fas', 'shopping-cart']"
            size="2x"
            :style="{ color: '#565656' }"
          />
          <i class="fas fa-shopping-cart text-dark fa-2x"></i>
          <span class="badge badge-pill badge-danger">1</span>
          <span class="sr-only">unread messages</span>
        </button>
        <div
          class="dropdown-menu dropdown-menu-right p-3"
          style="min-width: 300px"
          data-offset="400"
        >
          <h6>已選擇商品</h6>
          <table class="table table-sm">
            <tbody>
              <tr>
                <td class="align-middle text-center">
                  <a href="#" class="text-muted">
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </a>
                </td>
                <td class="align-middle">title</td>
                <td class="align-middle">1 unit</td>
                <td class="align-middle text-right"></td>
              </tr>
            </tbody>
          </table>
          <button class="btn btn-primary btn-block">
            <i class="fa fa-cart-plus" aria-hidden="true"></i> 結帳去
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>


<script>
import $ from "jquery";

export default {
  // data() {
  //   return {
  //     cartVal: 0,
  //   }
  // },
  created() {
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
    //購物車數值
    // const vm = this;
    // vm.$bus.$on('get:cartval',(val) => {
    //   vm.cartVal = val;
    // })
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
    background-image: url("../assets/logo.svg");
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
    color: #fff;
    transition: all 0.2s;
    padding: 8px 15px;
    text-align: center;
    &.router-link-exact-active {
      color: #555;
      font-weight: bold;
    }
    @media (max-width: 992px) {
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
}
.navbar-dark .navbar-toggler {
  border: none;
  color: #fff;
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
  top: 0px;
  transition: top 0.1s ease-in-out;
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
</style>