import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueSweetalert2 from 'vue-sweetalert2';

// import store from "./store";
import "./registerServiceWorker";
// import 'materialize-css/dist/js/materialize.min';
import "bootstrap/dist/css/bootstrap.css";
// import 'clipboard/dist/clipboard.min.js';

Vue.config.productionTip = false;
Vue.use(VueSweetalert2);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
