import Vue from "vue";
import "./plugins/axios";
import "./plugins/element.js";
import "./icons/index.js";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
