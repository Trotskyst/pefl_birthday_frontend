<template>
  <div class="container all">
    <Loader v-if="loading_top" />

    <div class="letters" v-if="loading_top == false">
      <button
        type="button"
        class="btn btn-light letter"
        :class="{'active':letter==SelectedLetter}"
        v-for="(letter, index) in aphabet"
        :key="index"
        @click="LetterClicked(letter)"
      >{{ letter }}</button>
    </div>

    <Loader v-if="loading && loading_top == false" />

    <BirthdayTable
      :birthday="birthday"
      :header="SelectedLetter"
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
    aphabet: {
      type: Array
    }
  },
  data() {
    return {
      SelectedLetter: null,
      birthday: [],
      todayYear: Number,
      count: Number,
      type_info: "alphabet",
      loading_top: true,
      loading: true
    };
  },
  created() {
    this.loading_top = true;
    this.SelectedLetter = "A";
    this.todayYear = today.getFullYear();
    this.GetBirthdayByLetter(this.SelectedLetter);
    this.loading_top = false;
  },
  methods: {
    LetterClicked(letter) {
      this.loading = true;
      this.SelectedLetter = letter;
      this.GetBirthdayByLetter(this.SelectedLetter);
    },
    async GetBirthdayByLetter(letter) {
      const axios = require("axios");
      var url = "http://localhost:8000/api/v1/managers/letter/" + letter + "/";
      await axios.get(url).then(response => {
        this.birthday = response.data.results;
        this.birthday = BirthdayModify(this.birthday, this.todayYear);
        this.count = response.data.count;
        this.SelectedLetter = letter;
        this.loading = false;
      });
    }
  }
};
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  padding-top: 0px;
}

.letter {
  background-color: #fff;
  border: none;
}

.letters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.header_selected {
  width: 100%;
  padding-top: 0.2em;
  border-top: 1px solid #dee2e6;
}

.paginator {
  margin-left: 0.1em;
  margin-right: 0.1em;
}

.pagination {
  width: 100%;
}

.pagitator-links {
  margin-left: auto;
  margin-right: auto;
}

.black_link {
  color: black;
}

.black_link:hover {
  color: #2051cf;
}
</style>
