<template>
  <div class="front">
    <Loading :active.sync="isLoading"></Loading>
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/front/Navbar.vue";
import Footer from "@/components/front/Footer.vue";

import { mapState } from "vuex";

export default {
  components: {
    Navbar,
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

<style scoped>
.vld-overlay {
  /* make loading layer higher than fixed-top of navbar,
  z-index of fixed-top is 1030, and orginal z-index of vld-overlay
  is 999. */
  z-index: 2000;
}
</style>
