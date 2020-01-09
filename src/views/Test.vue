<template>
  <div>
    <nav>
      <div class="profile-udpate-bar">
        Profile update bar
        <select>
          <option v-for="character in characters" :key="character">
            {{ character }}
          </option>
        </select>
        <select>
          <option v-for="character in characters" :key="character">
            {{ character }}
          </option>
        </select>
        <input type="text" />
        <button>Update</button>
      </div>
    </nav>
  </div>
</template>

<script>
import Vue from "vue";
import md5 from "js-md5";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

Vue.prototype.$md5 = md5;
/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  data() {
    return {
      icsHeader: {
        user: "icsuser",
        authorization: "",
        pwd: "",
        "Access-Control-Allow-Origin": "*"
      },
      characters: ["test1", "test2"]
    };
  },
  methods: {
    updateProfile() {},
    async getProfiles() {
      const vm = this;
      console.warn("IIII");
      console.warn(vm.icsHeader);
      axios
        .get(
          "http://13.231.156.27:3000/characters/",

          {
            params: null,
            headers: vm.icsHeader,
            useCredentails: true
          }
        )
        .then(response => {
          console.warn("XXX");
          console.warn(response.data);
        })
        .catch(function(error) {
          // handle error
          console.warn("ERROR", error);
        });
    }
  },
  created() {
    this.icsHeader.authorization = md5("icsuser");
    this.icsHeader.pwd = md5("iloveICS");
    this.getProfiles();
  }
};
</script>

<style scoped>
.profile-udpate-bar {
  display: flex;
  background-color: blueviolet;
}
.profile-li {
  display: flex;
}
</style>
