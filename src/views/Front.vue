<template>
  <div class="front">
    <Navbar />
    <loading :active.sync="isLoading"></loading>
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
// loading
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
//
import { mapState } from "vuex";

export default {
  components: {
    Navbar,
    Loading,
    Footer
  },
  computed: {
    ...mapState(["isLoading"])
  },
  beforeCreate: function() {
    document.body.classList.add("body-front");
  }
};
</script>