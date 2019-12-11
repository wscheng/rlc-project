<template>
  <div class="home">
    <!-- Swiper -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="opacity-bg-layer banner1"></div>
          <div class="latest-section d-flex">
            <div class="d-none d-lg-block latest-swiper-description mr-3">
              <h1>書店</h1>
              <blockquote>
                <p>
                  <q>開書店的人都有點瘋瘋的，那是一種gentle madness，溫文儒雅的瘋狂。</q>
                </p>
                <footer>楊照</footer>
              </blockquote>
              <router-link class="btn btn-primary" to="/books">找書</router-link>
            </div>
            <div class="latest-swiper-products-block h-100 text-center">
              <h2>最新書籍</h2>
              <!-- 4 latest product card start -->
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-3 col-sm-3 col-6" v-for="book in latestBooks" :key="book.id">
                    <router-link
                      class="text-dark"
                      :to="{ name: 'Book', params: { productId: book.id } }"
                    >
                      <div class="card border-0 shadow-sm mb-5 latest-product-card">
                        <div class="latest-product-header">{{ book.subcategory }}</div>
                        <div>
                          <img class="latest-product-img" :src="book.imageUrl" />
                        </div>
                        <div class="card-footer latest-product-footer">{{ book.title }}</div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- 4 latest product card end -->
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="opacity-bg-layer banner2"></div>
          <div class="latest-section d-flex">
            <div class="latest-swiper-products-block h-100 text-center">
              <h2>最新唱片</h2>
              <!-- 4 latest product card start -->
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-3 col-sm-3 col-6" v-for="book in latestBooks" :key="book.id">
                    <router-link
                      class="text-dark"
                      :to="{ name: 'Book', params: { productId: book.id } }"
                    >
                      <div class="card border-0 shadow-sm mb-5 latest-product-card">
                        <div class="latest-product-header">{{ book.subcategory }}</div>
                        <div>
                          <img class="latest-product-img" :src="book.imageUrl" />
                        </div>
                        <div class="card-footer latest-product-footer">{{ book.title }}</div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- 4 latest product card end -->
            </div>
            <div class="d-none d-lg-block latest-swiper-description text-right ml-3">
              <h1>唱片館</h1>
              <blockquote style="display:none;"></blockquote>
              <blockquote>
                <p>
                  <q>留神細聽所有的民歌，因為它們是最優美的鏇律的寶庫。它們會打開你的眼界，使你注意到各種不同的民族性格。</q>
                </p>
                <footer>舒曼</footer>
              </blockquote>
              <router-link class="btn btn-primary" to="/books">找唱片</router-link>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="opacity-bg-layer banner3"></div>
          <div class="latest-section d-flex">
            <div class="d-none d-lg-block latest-swiper-description mr-3">
              <h1>聚會</h1>
              <blockquote>
                <p>
                  <q>與人交談一次，往往比多年閉門勞作更能啟發心智。思想必定是在與人交往中產生，而在孤獨中進行加工和表達。</q>
                </p>
                <footer>列夫·托爾斯泰</footer>
              </blockquote>
              <router-link class="btn btn-primary" to="/books">找活動</router-link>
            </div>
            <div class="latest-swiper-products-block h-100 text-center">
              <h2>最新活動</h2>
              <!-- 4 latest product card start -->
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-3 col-sm-3 col-6" v-for="book in latestBooks" :key="book.id">
                    <router-link
                      class="text-dark"
                      :to="{ name: 'Book', params: { productId: book.id } }"
                    >
                      <div class="card border-0 shadow-sm mb-5 latest-product-card">
                        <div class="latest-product-header">{{ book.subcategory }}</div>
                        <div>
                          <img class="latest-product-img" :src="book.imageUrl" />
                        </div>
                        <div class="card-footer latest-product-footer">{{ book.title }}</div>
                      </div>
                    </router-link>
                  </div>
                </div>
              </div>
              <!-- 4 latest product card end -->
            </div>
          </div>
        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Add Arrows -->
      <div class="swiper-button-next w3-hover-opacity"></div>
      <div class="swiper-button-prev w3-hover-opacity"></div>
    </div>
    <div class="container-fluid popular-section home-section">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center">
            <h2 class="featurette-heading py-5" style="margin-top:0px;">暢銷榜</h2>
          </div>
          <!-- /.col-md-4 -->
          <div class="col-md-4" v-if="mostPopularBooks">
            <div
              class="bd-placeholder-img rounded-circle header-img"
              :style="{ backgroundImage: `url(${mostPopularBooks.imageUrl})` }"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#777" />
              <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
            </div>
            <h4 class="most-popular-title">{{mostPopularBooks.title}}</h4>
            <p
              class="most-popular-description"
            >{{mostPopularBooks.description.substring(0,100).trim()}}</p>
            <p>
              <a class="btn btn-secondary" href="#" role="button">看更多 &raquo;</a>
            </p>
          </div>

          <!-- /.col-md-4 -->
          <div class="col-md-4" v-if="mostPopularAlbums">
            <div
              class="bd-placeholder-img rounded-circle header-img"
              :style="{ backgroundImage: `url(${mostPopularAlbums.imageUrl})` }"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#777" />
              <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
            </div>
            <h4 class="most-popular-title">{{mostPopularAlbums.title}}</h4>
            <p
              class="most-popular-description"
            >{{mostPopularAlbums.description.substring(0,100).trim()}}</p>
            <p>
              <a class="btn btn-secondary" href="#" role="button">看更多 &raquo;</a>
            </p>
          </div>
          <!-- /.col-md-4 -->
          <div class="col-md-4" v-if="mostPopularEvents">
            <div
              class="bd-placeholder-img rounded-circle header-img"
              :style="{ backgroundImage: `url(${mostPopularEvents.imageUrl})` }"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#777" />
              <text x="50%" y="50%" fill="#777" dy=".3em">140x140</text>
            </div>
            <h4 class="most-popular-title">{{mostPopularEvents.title}}</h4>
            <p
              class="most-popular-description"
            >{{mostPopularEvents.description.substring(0,100).trim()}}</p>
            <p>
              <a class="btn btn-secondary" href="#" role="button">看更多 &raquo;</a>
            </p>
          </div>
          <!-- /.col-md-4 -->
        </div>
        <!-- /.row -->
      </div>
    </div>
    <!-- <hr /> -->
    <div class="container-fluid home-section section1 py-5">
      <div class="container">
        <!-- START THE FEATURETTES -->

        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">
              獻給阿爾吉儂的花束
              <span class="text-muted">不同卻有時如同我們的人生一般，一起路過查理的人生</span>
            </h2>
            <p
              class="lead"
            >如果那些歧視變得可以理解，如果愛情不是不可能，如果過往的記憶漸趨鮮明……真的會比較幸福嗎？ 《24個比利》作者最膾炙人口的經典代表作！ 45週年紀念版全新完整譯本 在這部一鳴驚人的處女作中，丹尼爾‧凱斯藉由查理‧高登的蛻變日記，細膩又寫實地反映出心智障礙者置身現實世界的模糊定位與艱難處境，字裡行間更展現了他對自私人性的犀利控訴！無可取代的題材、扣人心弦的文筆和發人深思的意涵，即使在經過多年之後，依然是絕對不能錯過的必讀經典！</p>
          </div>
          <div class="col-md-5">
            <img
              class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src="https://storage.googleapis.com/vue-course-api.appspot.com/wscheng%2F1575524669878.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=CS%2Bcx%2FPnW%2BDe5YXvN9LUbzEDrmjihZeGdhJQYF90MAtoXGJpK1Rjf464UifTaZkWBqW4%2Ft8u9zqN62YUvd1ocXMVUJd5mJtDNaPTVKJwL%2Bb2977yMSor8mIhtgmmrJGPyrVKisyoGqYq7gfK%2B2wcCOqgdhqgmK2M3M7D8pqA9eGNLxrVO0XAkgAFSONzubGTSS0TKHU8Gzn6bshV8iaNno9sYZlYNko%2FHvdmfDcaLwXUUWGVz16QPlqjO56hUKnebQyWD3w00%2B0DicXjC4y6hbNOeKHKHgYJq%2FJAwvlyZ%2BRjn6h8%2FUHH3Eyn66r6FSoRlzzd85AF3BxgZZ90sIp%2ByQ%3D%3D"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid home-section section2 py-5">
      <div class="container">
        <div class="row featurette">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading">
              魏如萱 / 末路狂花
              <span class="text-muted">為自己 快逃！</span>
            </h2>
            <p
              class="lead"
            >魏如萱以〔末路狂花〕為這張專輯的概念，想要表達的並非公路電影般的一場小旅行，而是在人生前進的道路上，勇敢為自己做出和大多數人不一樣的選擇。在充斥復刻和盲目追隨的現象裡，能抽身喊停！</p>
          </div>
          <div class="col-md-5 order-md-1">
            <img
              class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src="https://storage.googleapis.com/vue-course-api.appspot.com/wscheng%2F1575523984012.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=jFD41AmLuGAK%2FbCRxDuTRgYH%2BpZl9VAuKvLCbw4te3DZMK%2Fuz2OeKbbLn0QLL8G0aMPeXtij7DRXgypDMmdCWciveIbc%2B18H%2FSCAotxJGEFWD7J7P7zI2MRRIYTr5A1YIZnyqqWj0C1%2FWK8yECwAI4%2F2kwoV2YVvmX9mMRPZpFaWOiRCE5dLJLbqoZr2oHSmaiVWY134igw%2Byghw68yoD532sxGZNW7HlUpoQYwwqnZwdX6uPn4phUdpx0MgusD4IO2EHvDUcJbtnOxKqDlUxHZPIZ8fk9a9fpK9BygcK2vXK03NRzazlnLcTrqbBQ7cYRYhEB5XOjeY7vT%2Bj8hC8w%3D%3D"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid home-section section3 py-5">
      <div class="container">
        <div class="row featurette">
          <div class="col-md-7">
            <h2 class="featurette-heading">
              啓動臺灣感性系列講座
              <span class="text-muted">突破美感教育窄巷</span>
            </h2>
            <p
              class="lead"
            >如果說「美感」是無法重複運算的事物，是每一次當下的變動性產物，那麼得重新理解「美感」的動因：感覺能力。在臺灣各個階段的藝術教育現場，基本的問題並不是「美」的缺席，而是現有機制讓「美」已成為指令——感覺教育的解嚴尚未到來。當教師在教學現場畏懼獨特性，從而以律令來篩檢「美感」，感覺社群的多樣化就無從展開。我們是否有能力讓各種感覺活動的交錯成為生活自然的日常姿態？在依然規格化的「美感教育」窄巷中，又該如何讓叉路成為選項？讓異樣風景顯露？這就是「感性力量」閘道全面開放的技術。</p>
          </div>
          <div class="col-md-5">
            <img
              class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
              src="https://storage.googleapis.com/vue-course-api.appspot.com/wscheng%2F1573570762373.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=W5iMDN%2BhCnVGs5nGHQuckpKBcrK77Ta0NFSiaJVMZepW5YIbDFb%2FzwYP1BnFKuXaNll3GkzRrOxBafDrXAw4kGYHdfAmzzGCX9YwlIlktc40ILVDgRS6Dhae0D2Cl0ZqVHPkTe3ZnRJ7ISBuR8xQYi29nJyv8xsWFgHtND41lJ6wC0apk5ktkTEmpPJDMCqeaoTBjYvij210wy5Gy%2FmV7aVoLOC288IHnlUlRbHDF1y%2FqO%2FI%2FUbreC5GI3Yt6udXt4GXaD0niFqpp7Q5S4aBz0o1Ro8p9C%2B%2BbQAdb8Fv4imFUBekbSu4TKUjd9bPfQiNpTQfiSQjbFGis8F7PSspFA%3D%3D"
            />
            <!-- style="width:200px;" -->
          </div>
        </div>

        <!-- <hr class="featurette-divider" /> -->

        <!-- /END THE FEATURETTES -->
      </div>
    </div>
    <!-- /.container -->
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
    latestBooks() {
      return this.products.slice(2, 6);
    },
    mostPopularBooks() {
      return this.products[3];
    },
    latestAlbums() {
      return this.products[this.products.length / 2 - 1];
    },
    mostPopularAlbums() {
      console.warn(this.products.length / 2);
      return this.products[Math.floor(this.products.length / 2)];
    },
    latestEvents() {
      return this.products[this.products.length - 3];
    },
    mostPopularEvents() {
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

<style lang="scss" scoped>
/*  if we don't use ./, ../ or @ in import path, this means node_modules/
thus, @import "../../../node_modules/swiper/css/swiper.min.css";  can be
shorten to @import "swiper/css/swiper.min.css"; */
@import "../../../node_modules/swiper/css/swiper.min.css";
// .inner {
//   flex: 1 1 auto;
// }

.swiper-slide {
  height: 512px;
  @media (max-width: 768px) {
    // 512(swiper height) - 104(navbar) px
    height: 408px;
  }
  @media (max-width: 576px) {
    height: 768px;
  }
  /* text-align: center; */
  font-size: 18px;
  /* Center slide text vertically */
  position: relative;
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

.opacity-bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  background: #d7cec7;
  opacity: 0.3;
  width: 100%;
  height: 100%;
}

.latest-section {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  padding: 104px 76px 30px;
  @media (max-width: 820px) {
    padding: 104px 50px 30px;
  }
  @media (max-width: 768px) {
    padding: 20px 10px 30px;
  }
  align-items: flex-start;
}
.latest-swiper-description {
  flex-grow: 1;
  align-self: flex-end;
  @media (min-width: 1401px) {
    flex-grow: 0;
    flex-basis: 750px;
  }
}

.latest-swiper-products-block {
  border: 1px solid black;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.25);
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 750px;
  @media (max-width: 1400px) {
    flex-basis: 750px;
    flex-shrink: 0;
  }
  @media (max-width: 1200px) {
    flex-basis: 650px;
    flex-grow: 1;
  }
  // @media (max-width: 992px) {
  //   flex-grow: 1;
  // }
  @media (max-width: 768px) {
    flex-basis: 500px;
  }
  @media (max-width: 576px) {
    flex-basis: 300px;
    flex-grow: 1;
    width: 100%;
  }
  // latest product card CSS
  // TODO try use card-deck to make the cards line up
  .latest-product-card {
    height: 300px;
    padding-top: 30px;
  }
  .latest-product-header {
    font-size: 0.95rem;
  }
  .latest-product-img {
    max-width: 132px;
    max-height: 132px;
    @media (max-width: 768px) {
      max-width: 100px;
      max-height: 100px;
    }
    @media (max-width: 576px) {
      max-width: 132px;
      max-height: 132px;
    }
    @media (max-width: 360px) {
      max-width: 119px;
      max-height: 119px;
    }
  }
  .latest-product-footer {
    background-image: url("../../assets/img/paper_bg.jpg");
    //background-size: 100%;
    background-size: auto auto;
    background-position: left -1250px top -200px;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    height: 100%;
  }
}

.banner1 {
  background-image: url("../../assets/img/banner1.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.banner2 {
  background-image: url("../../assets/img/banner2.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.banner3 {
  background-image: url("../../assets/img/banner3.jpg");
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

// swiper
.swiper-inner {
  margin-top: 100px;
  margin-left: 50px;
  margin-right: 50px;
}
.swiper-button-prev:after {
  @media (max-width: 768px) {
    content: "⥢";
    font-size: 1.4rem;
    color: #000;
  }
  @media (min-width: 768px) {
    content: url("../../assets/img/prev.png");
    margin-left: 30px;
    opacity: 75%;
  }
}
.swiper-button-prev:hover:after {
  opacity: 100%;
}

.swiper-button-next:after {
  //font-size: rem;
  @media (max-width: 768px) {
    content: "⥤";
    font-size: 1.4rem;
    color: #000;
  }
  @media (min-width: 768px) {
    content: url("../../assets/img/next.png");
    margin-right: 30px;
    opacity: 75%;
  }
}
.swiper-button-next:hover:after {
  opacity: 100%;
}
.swiper-pagination >>> .swiper-pagination-bullet-active {
  background-color: #76323f;
}

/* customized boostrap */
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

/* home-section CONTENT
  -------------------------------------------------- */

/* Center align the text within the three columns below the swiper */
.home-section {
  .col-md-4 {
    margin-bottom: 1.5rem;
    text-align: center;
  }
  h2 {
    font-weight: 400;
  }
  col-md-4 p {
    margin-right: 0.75rem;
    margin-left: 0.75rem;
  }
}
/* Featurettes
  ------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the home-section headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.05rem;
}

/* RESPONSIVE CSS
  -------------------------------------------------- */

@media (min-width: 40em) {
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
.popular-section {
  background-color: #e7edef;
}

///
.section1 {
  background-color: #e2dcd5;
}
// .section2 {
// }
.section3 {
  background-color: #c9d1c9;
}

///////////// quote style
// ref: https://codepen.io/tomhodgins/pen/gPaPoq?editors=1000
blockquote {
  margin: 0 auto;
  padding: 1em;
  border-left: 5px solid#565656;
  max-height: 300px;
  overflow: auto;
  //overflow: hidden;
}
blockquote:before {
  display: none;
}
blockquote:not(:first-of-type) {
  margin-top: 0.5em;
}
blockquote p {
  color: #565656;
  font-size: 15.5pt;
  line-height: 1.4;
  font-family: "PT Serif", Cambria, "Hoefler Text", Utopia, "Liberation Serif",
    "Nimbus Roman No9 L Regular", Times, "Times New Roman", serif;
}
blockquote footer {
  margin-top: 0.5em;
  padding: 0;
  color: #777;
  font-size: 15.5pt;
  text-align: left;
  font-style: italic;
}
blockquote footer:before {
  content: "— ";
}
blockquote:nth-of-type(even) {
  text-align: right;
  border-left: none;
  border-right: 5px solid #999;
}
blockquote:nth-of-type(even) footer {
  text-align: right;
}
blockquote:nth-of-type(even) footer:before {
  content: "";
}
blockquote:nth-of-type(even) footer:after {
  content: " —";
}
@element 'blockquote' and (min-width: 300px) {
  blockquote {
    padding: 1em 20% 1em 1em;
  }
  blockquote p {
    font-size: 15.5pt;
  }
  blockquote:nth-of-type(even) {
    padding: 1em 1em 1em 20%;
  }
}
</style>
