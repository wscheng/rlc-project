import Vue from "vue";
import VueRouter from "vue-router";
import Front from "@/views/front/Front.vue";
import Home from "@/views/front/Home.vue";
import Books from "@/views/front/Books.vue";
import Book from "@/views/front/Book.vue";
import Test from "@/views/Test.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Front",
    component: Front,
    children: [
      { path: "/", name: "Home", component: Home },
      { path: "/book/:productId", name: "Book", component: Book },
      { path: "/books", name: "Books", component: Books }
    ]
  },
  { path: "/test", name: "Test", component: Test }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
