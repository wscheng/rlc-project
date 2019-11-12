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
  }
};
</script>


<style scoped>
/* .front {
  background: #fcf3d7;
} */
</style>>
