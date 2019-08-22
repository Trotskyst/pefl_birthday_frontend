<template>
  <div class="container">
    <Loader v-if="loading" />

    <span v-if="loading == false">
      <i>Менеджеров: {{ count_birthday }}</i>
    </span>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

let today = new Date();

export default {
  components: {
    Loader
  },
  data() {
    return {
      loading: true,
      count_birthday: Number
    };
  },
  created() {
    this.loading = true;
    this.GetCountBirthday();
  },
  methods: {
    async GetCountBirthday() {
      const axios = require("axios");
      var url = "http://localhost:8000/api/v1/managers/count/";
      await axios.get(url).then(response => {
        this.count_birthday = response.data.results[0].count_birthday;
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
</style>
