<template>
  <div class="front">
    <Navbar />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  },
  beforeCreate: function() {
    document.body.classList.add("body-front");
  }
};
</script>