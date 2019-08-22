<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="left-top">
          <LeftMenu />
        </div>
      </div>
      <div class="center">
        <Loader v-if="loading" />

        <BirthdayTable
          :birthday="birthday"
          :header="header"
          :count="count"
          :type_info="type_info"
          v-if="loading == false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BirthdayModify from "@/assets/function.js";
import LeftMenu from "@/components/LeftMenu.vue";
import BirthdayTable from "@/components/BirthdayTable.vue";
import Loader from "@/components/Loader.vue";

let today = new Date();

export default {
  components: {
    LeftMenu,
    BirthdayTable,
    Loader
  },
  data() {
    return {
      birthday: [],
      todayYear: Number,
      count: Number,
      type_info: "woman",
      header: "Девушки Пефла",
      loading: true
    };
  },
  created() {
    this.loading = true;
    this.todayYear = today.getFullYear();
    this.GetWomanBirthday();
  },
  methods: {
    async GetWomanBirthday() {
      const axios = require("axios");
      var url = "http://localhost:8000/api/v1/managers/woman/";
      await axios.get(url).then(response => {
        this.birthday = response.data.results;
        this.birthday = BirthdayModify(this.birthday, this.todayYear);
        this.count = response.data.count;
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  padding-top: 1em;
}

.country {
  background-color: #fff;
  border: none;
}

.countries {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.left {
  min-width: 200px;
}
</style>
