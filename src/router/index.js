import Vue from "vue";
import VueRouter from "vue-router";
import FrontLayout from "@/views/front/FrontLayout.vue";
import Home from "@/views/front/Home.vue";
import Books from "@/views/front/Books.vue";
import Book from "@/views/front/Book.vue";
import Checkout from "@/views/front/Checkout.vue";
import Orders from "@/views/front/Orders.vue";
import Favorites from "@/views/front/Favorites.vue";
import MemberCenter from "@/views/front/MemberCenter.vue";
import AdminLogin from "@/views/back/AdminLogin.vue";
import BackLayout from "@/views/back/BackLayout.vue";
import ProductManagement from "@/views/back/ProductManagement.vue";
import OrderManagement from "@/views/back/OrderManagement.vue";
import CouponManagement from "@/views/back/CouponManagement.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Front",
    component: FrontLayout,
    children: [
      { path: "/", name: "Home", component: Home },
      { path: "/book/:productId", name: "Book", component: Book },
      { path: "/books", name: "Books", component: Books },
      { path: "/checkout", name: "Checkout", component: Checkout },
      { path: "/orders", name: "Orders", component: Orders },
      { path: "/favorites", name: "Favorites", component: Favorites },
      { path: "/member-center", name: "MemberCenter", component: MemberCenter }
    ]
  },
  {
    path: "/admin/login",
    name: "AdminLogin",
    component: AdminLogin
  },
  {
    path: "/admin",
    component: BackLayout,
    children: [
      {
        path: "product",
        name: "ProductManagement",
        component: ProductManagement,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "order",
        name: "OrderManagement",
        component: OrderManagement,
        meta: {
          requiresAuth: true
        }
      },
      {
        path: "coupon",
        name: "CouponManagement",
        component: CouponManagement,
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
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
