import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  // 配置学生信息页面路由
  {
    path: "/student",
    name: "Student",
    component: () => import("../views/Student")
  },
  // 配置坐标计算页面路由
  {
    path: "/measure",
    name: "Measure",
    component: () => import("../views/Measure")
  },
  // 配置登录页面路由
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/login"),
    children: [
      {
        path: "success",
        name: "Success",
        component: () => import("../views/login/success")
      },
      {
        path: "error",
        name: "Error",
        component: () => import("../views/login/error")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  base: "/dist",
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes
});

export default router;
