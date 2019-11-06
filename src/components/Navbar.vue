<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light"> -->
      <div class="container">
        <div class="logo-area">
          <a class="navbar-brand" href="#">
            <img src="../assets/logo.png" alt />
          </a>
        </div>
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
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              Home
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Dropdown</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
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
.marquee {
  background: #333;
  color: #fff;
  padding: 2px 5%;
  display: flex;
  marquee {
  }
  span {
    display: inline-block;
    padding: 0px 10px;
    font-size: 12px;
    border-radius: 3px;
    white-space: nowrap;
  }
}
.logo-area {
  width: 92px;
  position: relative;
  transition: all 0.3s ease-in-out;
  .navbar-brand {
    height: 5vw;
    min-height: 59px;
    background-color: transparent;
    // background-image: url("../assets/logo-s.png");
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
      background: #fcf3d7;
      background-image: none;
      position: absolute;
      border-radius: 0 0 10px 10px;
      // top: -30px;
      // padding: 20px;
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
.account-nav {
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
  top: 25px;
  transition: top 0.1s ease-in-out;
}
.scrolled {
  top: 0 !important;
  @media (min-width: 992px) {
    .logo-area {
      width: 59px;
      .navbar-brand {
        padding: 10px;
      }
    }
  }
}
</style>