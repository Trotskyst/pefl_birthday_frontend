import Vue from "vue";
import Router from "vue-router";
import Dates from "./views/Dates.vue";
import Alphabet from "./views/Alphabet.vue";
import Country from "./views/Country.vue";
import Woman from "./views/Woman.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "",
      name: "date",
      component: Dates
    },
    {
      path: "/alphabet",
      name: "alphabet",
      component: Alphabet
    },
    {
      path: "/country",
      name: "country",
      component: Country
    },
    {
      path: "/woman",
      name: "woman",
      component: Woman
    }
  ]
});
