<template>
  <div>
    <footer role="banner">
      <div>
        <div>
          <dl>
            <dt>關於</dt>
            <dd>
              <a href="#">關於RLC</a>
            </dd>
            <dd>
              <a href="#">最新消息</a>
            </dd>
            <dd>
              <a href="#">人才招募</a>
            </dd>
            <dd>
              <a href="#">業務合作</a>
            </dd>
            <dd>
              <a href="#">聯絡我們</a>
            </dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>會員</dt>
            <dd>
              <a href="#">常見問題</a>
            </dd>
            <dd>
              <a href="#">會員服務條款</a>
            </dd>
            <dd>
              <a href="#">隱私權保護政策</a>
            </dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>追蹤我們</dt>
            <dd>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=1540337748"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="../../assets/img/facebook.svg"
                      class="social-img"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="../../assets/img/youtube.svg"
                      class="social-img"
                    />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img
                      src="../../assets/img/instagram.svg"
                      class="social-img"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/%E5%81%89%E5%8D%87-%E9%84%AD-171619151/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <!-- TODO image should be updated -->
                    <img
                      src="../../assets/img/linkedin.svg"
                      class="social-img"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/wscheng"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <!-- TODO image should be updated -->
                    <img src="../../assets/img/github.svg" class="social-img" />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i></i>
                  </a>
                </li>
              </ul>
            </dd>
          </dl>
        </div>
        <div>
          <dl>
            <dt>訂閱</dt>
            <dd>
              <form class="subscription-form">
                <button class="email-icon-btn" disabled>
                  <font-awesome-icon
                    :icon="['fas', 'envelope']"
                    :style="{ color: '#565656' }"
                  />
                </button>
                <input
                  class="input-group-field"
                  type="email"
                  placeholder="youremail@email.com"
                  required
                />
                <button class="submit-btn">訂閱</button>
              </form>
            </dd>
          </dl>
        </div>
        <figure>
          <img
            src="../../assets/img/rlc-curiosity-award.svg"
            alt="coupon code"
            style="width:90px; height:90px;"
          />
        </figure>
      </div>
    </footer>
    <div class="copyright-footer">
      <a href="https://github.com/wscheng" target="_blank">
        <i class="fab fa-github-alt"></i>
      </a>
      <small>
        Copyright © 2019- RLC
        <a href="mailto:maxmaman@gmail.com">wscheng.</a>
      </small>
      <p>僅個人練習使用．不做商業用途</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$blackboard: #565656;
$oxblood: #76323f;
$yellow: #ffe26d;
$blue: #50c3de;
.main-footer {
  display: flex;
}
.copyright-footer {
  background-color: #e2dcd5; //#ebedeb;
  padding: 30px 0;
  color: #5b5d5f;
  font-size: 16px;
  //   border-top: 6px solid $blackboard;
  text-align: center;
}
/////
footer[role="banner"] {
  padding: 40px 0;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}

footer[role="banner"] > div {
  @media only screen and (max-width: 1440px) {
    margin: 0 20px;
  }
  margin: 0 auto;
  position: relative;
  max-width: 1440px;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

footer[role="banner"] > div > div {
  @media only screen and (max-width: 940px) {
    -moz-flex: 1 0 45%;
    -ms-flex: 1 0 45%;
    flex: 1 0 45%;
    margin: 0 !important;
    padding-bottom: 30px;
  }
}

footer[role="banner"] > div > div dl dt {
  color: #5b5d5f;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 15px;
  line-height: 1;
}

footer[role="banner"] > div > div + div {
  @media only screen and (max-width: 1100px) {
    padding-left: 25px;
    margin-left: 25px;
  }
  padding-left: 50px;
  margin-left: 50px;
  border-left: 1px solid #c8b682;
}

footer[role="banner"] > div > div:nth-child(3) {
  @media only screen and (max-width: 940px) {
    padding-left: 0 !important;
    border-left: 0;
  }
}

footer[role="banner"] > div > figure {
  position: absolute;
  right: 0;
  top: 0;
  @media only screen and (max-width: 580px) {
    position: static;
    display: block;
    flex: 100%;
    text-align: center;
  }
}

footer[role="banner"] > div > div:nth-child(3),
footer[role="banner"] > div > div:nth-child(3) + div {
  @media only screen and (max-width: 580px) {
    -moz-flex: 1 0 100%;
    -ms-flex: 1 0 100%;
    flex: 1 0 100%;
    border: 0;
    padding: 30px 0 0;
  }
}
footer[role="banner"] > div > div + div {
  @media only screen and (max-width: 580px) {
    padding-left: 10px;
    margin-left: 10px;
  }
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
figure {
  margin: 0;
}

footer[role="banner"] > div > div dl dd > a {
  color: #5b5d5f;
  font-size: 13px;
  margin-bottom: 10px;
  line-height: 1;
}
// ::selection {
//   background: #7b2f3d;
//   color: #fff;
//   text-shadow: none;
// }
*,
*::before,
*::after {
  box-sizing: content-box;
}
footer[role="banner"] > div > div dl dd ul > li:first-child {
  margin-left: 0;
}
footer[role="banner"] > div > div dl dd ul > li {
  float: left;
  margin-left: 5px;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.social-img {
  width: 30px;
  height: 30px;
}
footer[role="banner"] > div > div:nth-child(3) dl {
  margin-top: 30px;
}
footer[role="banner"] > div > div:nth-child(4) dl {
  margin-top: 30px;
}
//// form part
// footer[role="banner"] > div > div dl dd form {
//   width: 225px;
// }
// footer[role="banner"] > div > div dl dd form > div:first-of-type {
//   border: 2px solid #c8b682;
//   border-radius: 20px;
//   overflow: hidden;
// }

// footer[role="banner"] > div > div dl dd form > div:first-of-type button {
//   display: block;
//   height: 30px;
//   width: 45px;
//   line-height: 25px;
//   float: right;
//   border-left: 2px solid #c8b682;
//   border-top: none;
//   border-right: none;
//   border-bottom: none;
//   text-align: center;
//   text-decoration: none;
//   color: #c8b682;
// }
// button[disabled],
// html input[disabled] {
//   cursor: default;
// }
// button,
// html input[type="button"],
// input[type="reset"],
// input[type="submit"] {
//   -webkit-appearance: button;
//   cursor: pointer;
// }
// button,
// select {
//   text-transform: none;
// }
// button {
//   overflow: visible;
//   padding: 4px;
// }
// button,
// input,
// optgroup,
// select,
// textarea {
//   color: inherit;
//   font: inherit;
//   margin: 0;
// }
// .slick-list,
// body,
// button,
// dl,
// dl dd {
//   margin: 0;
// }

// input {
//   line-height: normal;
// }

// button,
// input,
// optgroup,
// select,
// textarea {
//   color: inherit;
//   font: inherit;
//   margin: 0;
// }
// footer[role="banner"] > div > div dl dd form > div:first-of-type {
//   border: 2px solid #c8b682;
//   border-radius: 20px;
//   overflow: hidden;
// }
// footer[role="banner"] > div > div dl dd form > div:first-of-type button {
//   display: block;
//   height: 30px;
//   width: 45px;
//   line-height: 25px;
//   float: right;
//   border-left: 2px solid #c8b682;
//   border-top: none;
//   border-right: none;
//   border-bottom: none;
//   text-align: center;
//   text-decoration: none;
//   color: #c8b682;
// }
// footer[role="banner"] > div > div dl dd form > div:first-of-type button i {
//   font-size: 13px;
//   position: relative;
//   top: 1px;
// }

.subscription-form {
  width: 250px;
  .email-icon-btn {
    // TODO check why div cannot align well like input or button
    height: 100%;
    height: 30px;
    margin-bottom: 0;
    border: 3px solid black;
    padding-left: 10px;
    padding-bottom: 1px;
    border-radius: 45% 0 0 45%;
  }
  input {
    height: 100%;
    height: 30px;
    width: 150px;
    margin-bottom: 0;
    padding-left: 5px;
    border-left: none;
    border-top: 3px solid black;
    border-bottom: 3px solid black;
    border-right: none;
  }
  .submit-btn {
    height: 100%;
    height: 30px;
    margin-bottom: 0;
    border: 3px solid black;
    padding-right: 12px;
    padding-bottom: 1px;
    border-radius: 0 45% 45% 0;
  }
}
</style>
