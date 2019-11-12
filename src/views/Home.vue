<template>
  <div class="home">
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide banner1">
          <div class="outer container-fluid">
            <div class="row swiper-inner h-100">
              <div class="d-none d-md-block col-md-6 h-100">
                <div class="row h-40">
                  <div class="col">test</div>
                </div>
                <div class="row h-60">
                  <div class="col">
                    <h1>書店</h1>
                    <h2>靜態的門扉</h2>
                    <p>在現在紛擾的生活中，當無人共處時，書本在這裡裡與你相伴。詞藻、哲理、遇見他人的世界</p>
                    <button>找書</button>
                  </div>
                </div>
              </div>
              <div class="col-md-6 h-100">
                <div class="row h-20">
                  <div class="col">最新上架</div>
                </div>
                <div class="row h-80">
                  <div class="col">test</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="swiper-slide banner2">
          <div class="outer">Slide 2</div>
        </div>
        <div class="swiper-slide banner3">
          <div class="outer">Slide 3</div>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Add Arrows -->
      <div class="swiper-button-next w3-hover-opacity"></div>
      <div class="swiper-button-prev w3-hover-opacity"></div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />This is test home content
    <br />This is test home content
    <br />This is test home content
    <br />
  </div>
</template>

<script>
let swiperAsync = import("swiper");
export default {
  name: "home",
  // mounted() {
  //   var swiper = new Swiper(".swiper-container", {
  //     scrollbar: {
  //       el: ".swiper-scrollbar",
  //       hide: true
  //     }
  //   });
  // }
  methods: {
    async _initSwiper() {
      let Swiper = await swiperAsync; //非同步載入的
      /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
      console.warn("XXXX", Swiper);
      // const container = this.$refs.swiper; //ref='swiper'
      const config = {
        //swiper的引數配置
        // effect: "coverflow",
        // slidesPerView: "auto",
        // centeredSlides: true,
        // initialSlide: this.activeIndex,
        loop: true,
        // autoplay: 1000,
        // speed: 1000,
        pagination: {
          el: ".swiper-pagination",
          type: "bullets"
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
        // auotHeight: true,
        // scrollbar: {
        //   el: ".swiper-scrollbar",
        //   hide: true
        // }
        // coverflow: {
        //   rotate: 0,
        //   stretch: -30,
        //   depth: 100,
        //   modifier: 0.7,
        //   slideShadows: false
        // }
      };
      this.mySwiper = new Swiper.default(".swiper-container", config);
    }
  },
  mounted() {
    this._initSwiper();
  }
};
</script>

<style scoped>
@import "../../node_modules/swiper/css/swiper.min.css";
.inner {
  flex: 1 1 auto;
}
.outer {
  /* position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0; */
  width: 100%;
  height: 100%;
  background: #d7cec7;
  opacity: 0.8;
}
.swiper-container {
  /* height: 100vh; */
  /* width: 1920px;
  height: 1000px; */
}
.swiper-slide {
  /* text-align: center; */
  font-size: 18px;
  background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.banner1 {
  height: 620px;
  /* min-height: 350px; */
  background-image: url("../assets/img/banner1.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.banner2 {
  height: 620px;
  /* height: 35vw;
  min-height: 350px; */
  background-image: url("../assets/img/banner2.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.banner3 {
  height: 620px;
  /* height: 35vw;
  min-height: 350px; */
  background-image: url("../assets/img/banner3.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.h-100 {
  height: 100%;
}
.h-90 {
  height: 90%;
}

.h-80 {
  height: 80%;
}
.h-70 {
  height: 70%;
}
.h-60 {
  height: 60%;
}
.h-50 {
  height: 50%;
}
.h-40 {
  height: 40%;
}
.h-30 {
  height: 30%;
}
.h-20 {
  height: 20%;
}
.h-10 {
  height: 10%;
}
.swiper-inner {
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
}
.swiper-button-prev:after {
  content: url("../assets/img/prev.png");
  margin-left: 30px;
  opacity: 75%;
}
.swiper-button-prev:hover:after {
  opacity: 100%;
}

.swiper-button-next:after {
  content: url("../assets/img/next.png");
  margin-right: 30px;
  opacity: 75%;
}
.swiper-button-next:hover:after {
  opacity: 100%;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: #76323f;
}
</style>
