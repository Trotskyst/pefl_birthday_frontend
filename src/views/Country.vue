<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="left-top">
          <LeftMenu />
        </div>
      </div>
      <div class="center">
        <CountryList :countries="countries" />
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import CountryList from "@/components/CountryList.vue";

export default {
  name: "country",
  components: {
    LeftMenu,
    CountryList
  },
  data() {
    return {
        countries: null,
    };
  },
  methods: {
    async GetCountries() {
      const axios = require("axios");
      var url = "http://localhost:8000/api/v1/managers/countries/";
      await axios.get(url).then(response => {
        this.countries = response.data.results;
      });
    }
  },
  created() {
    this.GetCountries();
  },


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

.center {
  width: 100%;
}
</style>
