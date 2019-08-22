<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="left-top">
          <LeftMenu />
        </div>
      </div>
      <div class="center">
        <DatesList :months="months" :months_parental="months_parental" />
      </div>
    </div>
  </div>

  <!-- <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>-->
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import DatesList from "@/components/DatesList.vue";

// console.log();
// var date = Date()
// console.log(date.getMonth())
export default {
  name: "app",
  components: {
    LeftMenu,
    DatesList
  },
  data() {
    return {
      months: [
        "Январь",
        "Февраль",
        "Март",
        "Апрель",
        "Май",
        "Июнь",
        "Июль",
        "Август",
        "Сентябрь",
        "Октябрь",
        "Ноябрь",
        "Декабрь"
      ],
      months_parental: [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря"
      ],
      // date: new Date().toJSON(),
    };
  }
};
</script>


<style lang="scss">
$left_menu_width: 200px;

#app {
  width: 100%;
}

.container {
  display: flex;
  align-items: flex-start;
  padding-top: 1em;
}

.left {
  min-width: $left_menu_width;
}
</style>
