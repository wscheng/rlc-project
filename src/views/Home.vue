<template>
  <div class="home">
    This is test home content
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
        <div class="swiper-slide">Slide 10</div>
      </div>
      <!-- Add Scrollbar -->
      <div class="swiper-scrollbar"></div>
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
        // loop: true,
        // autoplay: 1000,
        // speed: 1000,
        scrollbar: {
          el: ".swiper-scrollbar",
          hide: true
        }
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
.swiper-container {
  width: 100%;
  height: 300px;
}
.swiper-slide {
  text-align: center;
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
</style>
