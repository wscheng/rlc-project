<template>
  <div>
    <a class="goto-top-btn" href="#">
      <i class="fas fa-arrow-up"></i>
    </a>
  </div>
</template>


<script>
import $ from "jquery";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  created() {
    $(window).on("scroll", function() {
      var scrollValue = $(window).scrollTop();
      var offset = 20;
      if (scrollValue > offset) {
        $(".goto-top-btn").css("display", "block");
      } else {
        $(".goto-top-btn").css("display", "none");
      }
    });

    // TODO check why jQuery not working here, now we use
    // html {
    //   scroll-behavior: smooth;
    // }
    // in App.vue
    // $(".goto-top-btn").on("click", function(event) {
    //   // Make sure this.hash has a value before overriding default behavior
    //   if (this.hash !== "") {
    //     // Prevent default anchor click behavior
    //     event.preventDefault();

    //     // Store hash
    //     var hash = this.hash;

    //     // Using jQuery's animate() method to add smooth page scroll
    //     // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    //     $("html, body").animate(
    //       {
    //         scrollTop: $(hash).offset().top
    //       },
    //       800,
    //       function() {
    //         // Add hash (#) to URL when done scrolling (default click behavior)
    //         window.location.hash = hash;
    //       }
    //     );
    //   } // End if
    // });
  }
};
</script>

<style lang="scss" scoped>
.goto-top-btn {
  position: fixed;
  bottom: 40px;
  right: 50px;
  width: 50px;
  height: 50px;
  background: #a7a7a7;
  opacity: 0.9;
  text-decoration: none;
  text-align: center;
  line-height: 50px;
  color: white;
  font-size: 22px;
  // should bigger than 1020, because the z-index of sticky-top class is 1020
  z-index: 1021;
  transition: all 0.5s;
  :hover {
    background: #646464;
    line-height: 50px;
    width: 50px;
    height: 50px;
  }
  @media only screen and (max-width: 768px) {
    bottom: 100px;
    right: 30px;
  }
}
</style>