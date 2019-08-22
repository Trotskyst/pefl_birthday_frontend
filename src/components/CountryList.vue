<template>
  <div class="container">
    <Loader v-if="loading_top" />

    <div class="countries" v-if="loading_top == false">
      <button
        type="button"
        class="btn btn-light country"
        :class="{'active':country.name==SelectedCountry}"
        v-for="(country, index) in countries"
        :key="index"
        @click="CountryClicked(country.name)"
      >{{ country.name }}</button>
    </div>

    <Loader v-if="loading && loading_top == false" />

    <BirthdayTable
      :birthday="birthday"
      :header="SelectedCountry"
      :count="count"
      :type_info="type_info"
      v-if="loading == false && loading_top == false"
    />
  </div>
</template>

<script>
import BirthdayModify from "@/assets/function.js";
import BirthdayTable from "@/components/BirthdayTable.vue";
import Loader from "@/components/Loader.vue";

let today = new Date();

export default {
  components: {
    BirthdayTable,
    Loader
  },
  props: {
    countries: {
      type: Array
    }
  },
  data() {
    return {
      SelectedCountry: null,
      birthday: [],
      todayYear: Number,
      count: Number,
      type_info: "country",
      loading_top: true,
      loading: true
    };
  },
  created() {
    this.loading_top = true;
    this.SelectedCountry = "Украина";
    this.todayYear = today.getFullYear();
    this.GetBirthdayByCountry(this.SelectedCountry);
    this.loading_top = false;
  },
  methods: {
    CountryClicked(country) {
      this.loading = true;
      this.SelectedCountry = country;
      this.GetBirthdayByCountry(this.SelectedCountry);
    },
    async GetBirthdayByCountry(country) {
      const axios = require("axios");
      var url =
        "http://localhost:8000/api/v1/managers/country/" + country + "/";

      await axios.get(url).then(response => {
        this.birthday = response.data.results;
        this.birthday = BirthdayModify(this.birthday, this.todayYear);
        this.count = response.data.count;
        this.SelectedCountry = country;
        this.loading = false;
      });
    }
  }
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding-top: 0px;
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
</style>