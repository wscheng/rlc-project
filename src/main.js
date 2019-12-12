import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
require("./assets/css/global.css");

// eventbus
import "./bus";

// filter
import currencyFilter from "./filters/currency";
import timestampFilter from "./filters/timestamp";

// loading component
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
// TODO customized loading css

// datepicker component
import Datepicker from "vuejs-datepicker";

// fontawesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faDollarSign,
  faArrowCircleUp,
  faList,
  faThLarge,
  faHeart,
  faTrash,
  faBook,
  faMusic,
  faCalendarAlt,
  faUser,
  faBoxOpen,
  faFileAlt,
  faTicketAlt,
  faSearch,
  faMapMarkedAlt,
  faBars, // TODO now not using, for main-menu function
  faHome,
  faEnvelope,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { faHotjar } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// vee-vlidate
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import zhTW from "vee-validate/dist/locale/zh_TW";

// loop over all rules
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhTW.messages[rule] // add its message
  });
}

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

// Loading component
Vue.component("Loading", Loading);
Vue.component("Datepicker", Datepicker);

// fontawesome
library.add(
  faShoppingCart,
  faHotjar,
  faDollarSign,
  faArrowCircleUp,
  faList,
  faThLarge,
  faHeart,
  faTrash,
  faBook,
  faMusic,
  faCalendarAlt,
  faUser,
  faBoxOpen,
  faFileAlt,
  faTicketAlt,
  faSearch,
  faMapMarkedAlt,
  faBars,
  faHome,
  faEnvelope,
  faArrowUp
);

Vue.component("font-awesome-icon", FontAwesomeIcon);

// filters
Vue.filter("currency", currencyFilter);
Vue.filter("timestamp", timestampFilter);
Vue.use(require("vue-moment"));

// TODO figure out what this for
Vue.config.productionTip = false;
// axios
Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

Vue.prototype.$_API_SITE = "https://vue-course-api.hexschool.io";
Vue.prototype.$_USER_API_URL =
  "https://vue-course-api.hexschool.io/api/wscheng";
Vue.prototype.$_ADMIN_API_URL =
  "https://vue-course-api.hexschool.io/api/wscheng/admin";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
Vue.prototype.$readFavoritesFromLocalStorage = function() {
  const storedFavorite = JSON.parse(localStorage.getItem("favorites")) || [];
  console.warn("READF", storedFavorite, storedFavorite.length);
  return storedFavorite;
};

Vue.prototype.$setFavoritesToLocalStorage = function(favorites) {
  console.warn("SETF", favorites.length, favorites);
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// NOTE: should place router.beforeEach before Vue.$mount();
// thus, when we browse the website first time, this function
// will already work.
router.beforeEach((to, from, next) => {
  console.warn("to", to, "from", from, "next", next);
  if (to.meta.requiresAuth) {
    const check_api = `${Vue.prototype.$_API_SITE}/api/user/check`;
    console.warn("api=", check_api);
    axios.post(check_api).then(response => {
      console.warn(response.data);
      if (response.data.success) {
        next();
      } else {
        next({
          path: "/admin/login"
        });
      }
    });
  } else {
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
