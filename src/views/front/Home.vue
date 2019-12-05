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
    <!-- <main role="main"> -->
    <!-- Marketing messaging and featurettes
    ==================================================-->
    <!-- Wrap the rest of the page in another container to center all the content. -->

    <div class="container-fluid popular-section marketing">
      <!-- Three columns of text below the carousel -->
      <div class="row">
        <div class="col-lg-4" v-if="mostPopularBook">
          <div
            class="bd-placeholder-img rounded-circle header-img"
            :style="{ backgroundImage: `url(${mostPopularBook.imageUrl})` }"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#777" />
            <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
          </div>
          <h4 class="most-popular-title">{{mostPopularBook.title}}</h4>
          <p
            class="most-popular-description"
          >{{mostPopularBook.description.substring(0,100).trim()}}</p>
          <p>
            <a class="btn btn-secondary" href="#" role="button">View details &raquo;</a>
          </p>
        </div>
        <!-- /.col-lg-4 -->
        <div class="col-lg-4" v-if="mostPopularMusic">
          <div
            class="bd-placeholder-img rounded-circle header-img"
            :style="{ backgroundImage: `url(${mostPopularMusic.imageUrl})` }"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#777" />
            <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
          </div>
          <h4 class="most-popular-title">{{mostPopularMusic.title}}</h4>
          <p
            class="most-popular-description"
          >{{mostPopularMusic.description.substring(0,100).trim()}}</p>
          <p>
            <a class="btn btn-secondary" href="#" role="button">View details &raquo;</a>
          </p>
        </div>
        <!-- /.col-lg-4 -->
        <div class="col-lg-4" v-if="mostPopularEvent">
          <div
            class="bd-placeholder-img rounded-circle header-img"
            :style="{ backgroundImage: `url(${mostPopularEvent.imageUrl})` }"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#777" />
            <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
          </div>
          <h4 class="most-popular-title">{{mostPopularEvent.title}}</h4>
          <p
            class="most-popular-description"
          >{{mostPopularEvent.description.substring(0,100).trim()}}</p>
          <p>
            <a class="btn btn-secondary" href="#" role="button">View details &raquo;</a>
          </p>
        </div>
        <!-- /.col-lg-4 -->
      </div>
      <!-- /.row -->
    </div>
    <div class="container best-selling-section marketing">
      <!-- START THE FEATURETTES -->

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">
            First featurette heading.
            <span class="text-muted">It’ll blow your mind.</span>
          </h2>
          <p class="lead">
            Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
            ligula porta felis euismod semper. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus
            commodo.
          </p>
        </div>
        <div class="col-md-5">
          <svg
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: 500x500"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#eee" />
            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
          </svg>
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-7 order-md-2">
          <h2 class="featurette-heading">
            Oh yeah, it’s that good.
            <span class="text-muted">See for yourself.</span>
          </h2>
          <p class="lead">
            Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
            ligula porta felis euismod semper. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus
            commodo.
          </p>
        </div>
        <div class="col-md-5 order-md-1">
          <svg
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: 500x500"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#eee" />
            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
          </svg>
        </div>
      </div>

      <hr class="featurette-divider" />

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">
            And lastly, this one.
            <span class="text-muted">Checkmate.</span>
          </h2>
          <p class="lead">
            Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id
            ligula porta felis euismod semper. Praesent commodo cursus magna,
            vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus
            commodo.
          </p>
        </div>
        <div class="col-md-5">
          <svg
            class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
            width="500"
            height="500"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
            role="img"
            aria-label="Placeholder: 500x500"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#eee" />
            <text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text>
          </svg>
        </div>
      </div>

      <hr class="featurette-divider" />

      <!-- /END THE FEATURETTES -->
    </div>
    <!-- /.container -->

    <!-- FOOTER -->
    <footer class="container">
      <p class="float-right">
        <a href="#">Back to top</a>
      </p>
      <p>
        &copy; 2017-2019 Company, Inc. &middot;
        <a href="#">Privacy</a> &middot;
        <a href="#">Terms</a>
      </p>
    </footer>
    <!-- </main> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

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
  computed: {
    ...mapState("productModule", ["products"]),
    latestBook() {
      return this.products[2];
    },
    mostPopularBook() {
      return this.products[3];
    },
    latestMusic() {
      return this.products[this.products.length / 2 - 1];
    },
    mostPopularMusic() {
      console.warn(this.products.length / 2);
      return this.products[Math.floor(this.products.length / 2)];
    },
    latestEvent() {
      return this.products[this.products.length - 3];
    },
    mostPopularEvent() {
      return this.products[this.products.length - 2];
    }
  },
  methods: {
    ...mapActions("productModule", ["getProducts"]),
    async _initSwiper() {
      let Swiper = await swiperAsync; //非同步載入的
      /*eslint no-console: ["error", { allow: ["warn", "error"] }] */
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
  },
  created() {
    this.getProducts();
  }
};
</script>

<style scoped>
/*  if we don't use ./, ../ or @ in import path, this means node_modules/
thus, @import "../../../node_modules/swiper/css/swiper.min.css";  can be
shorten to @import "swiper/css/swiper.min.css"; */
@import "../../../node_modules/swiper/css/swiper.min.css";
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
  background: black;
  /* #fff; */
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
  height: 512px;
  /* min-height: 350px; */
  /* TODO check if there is better way to shorten the ../../ path */
  background-image: url("../../assets/img/banner1.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.banner2 {
  height: 512px;
  /* height: 35vw;
  min-height: 350px; */
  background-image: url("../../assets/img/banner2.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.banner3 {
  height: 512px;
  /* height: 35vw;
  min-height: 350px; */
  background-image: url("../../assets/img/banner3.jpg");
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
  content: url("../../assets/img/prev.png");
  margin-left: 30px;
  opacity: 75%;
}
.swiper-button-prev:hover:after {
  opacity: 100%;
}

.swiper-button-next:after {
  content: url("../../assets/img/next.png");
  margin-right: 30px;
  opacity: 75%;
}
.swiper-button-next:hover:after {
  opacity: 100%;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: #76323f;
}

/* customer boostrap */
.header-img {
  display: inline-block;
  position: relative;
  width: 140px;
  height: 140px;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: green;
  border-radius: 50%;
}
.most-popular-title {
}
.most-popular-description {
  /* font-size: 0.9rem;
  width: 240px;
  height: 180px;
  overflow: hidden;*/
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

/* form boostrap example */
/* GLOBAL STYLES
-------------------------------------------------- */
/* Padding below the footer and lighter body text */

body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}

/* CUSTOMIZE THE CAROUSEL
  -------------------------------------------------- */

/* Carousel base class */
.carousel {
  margin-bottom: 4rem;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

/* Declare heights because of positioning of img element */
.carousel-item {
  height: 32rem;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
}

/* MARKETING CONTENT
  -------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 400;
}
.marketing .col-lg-4 p {
  margin-right: 0.75rem;
  margin-left: 0.75rem;
}

/* Featurettes
  ------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.05rem;
}

/* RESPONSIVE CSS
  -------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}

/*  */
.bd-placeholder-img {
  font-size: 1.125rem;
  /* text-anchor: middle; */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
.marketing {
  background-color: #e7edef;
}
</style>
