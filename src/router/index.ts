import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Index from "@/views/Index.vue";
import Test from "@/views/Test.vue";
import ProductIntroList from "@/views/ProductIntroList.vue";
import ProductList from "@/views/ProductList.vue";
import Checkout from "@/views/Checkout.vue";
import Members from "@/views/Members.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import Home from "@/views/Home.vue";
import Order from "@/views/Order.vue";
import Orders from "@/views/Orders.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "",
    name: "home",
    component: Index,
    children: [
      {
        path: "/",
        component: Home,
        props: (route) => ({
          query: route.query.showMessage,
        }),
      },
      {
        path: "/test",
        component: Test,
      },
      {
        name: "產品介紹",
        path: "/productIntro",
        component: ProductIntroList,
      },
      {
        name: "訂購餐點",
        path: "/products",
        component: ProductList,
      },
      {
        name: "結帳",
        path: "/checkout",
        component: Checkout,
      },
      {
        name: "訂單列表",
        path: "/orderList",
        component: Orders,
      },
      {
        name: "訂單內容",
        path: "/order/:id",
        component: Order,
        props: true,
      },
      {
        name: "會員",
        path: "/members",
        component: Members,
      },
      {
        name: "登入",
        path: "/login",
        component: Login,
      },
      {
        name: "註冊",
        path: "/register",
        component: Register,
      },
      {
        name: "忘記密碼",
        path: "/forgot",
        component: ForgotPassword,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
