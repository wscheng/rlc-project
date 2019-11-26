import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";
require("./assets/css/global.css");

// filter
import currencyFilter from "./filters/currency";
import timestampFilter from "./filters/timestamp";

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
  faCalendarAlt
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
  faCalendarAlt
);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.filter("currency", currencyFilter);
Vue.filter("timestamp", timestampFilter);

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

Vue.prototype.$_API_SITE = "https://vue-course-api.hexschool.io";
Vue.prototype.$_USER_API_URL =
  "https://vue-course-api.hexschool.io/api/wscheng";

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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
