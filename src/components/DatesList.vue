<template>
  <div class="container">
    <Loader v-if="loading_top" />

    <div class="months" v-if="loading_top == false">
      <button
        type="button"
        class="btn btn-light month"
        :class="{'active':index==SelectedMonth}"
        v-for="(month, index) in months"
        :key="index"
        @click="MonthClicked(index)"
      >{{ month }}</button>
    </div>

    <div class="days" v-if="loading_top == false">
      <button
        type="button"
        class="btn btn-light day"
        :class="{'active':day==parseInt(SelectedDay)}"
        v-for="day in parseInt(DaysCount)"
        :key="day"
        @click="DayClicked(SelectedMonth, day)"
      >{{ day }}</button>
    </div>

    <Loader v-if="loading && loading_top == false" />

    <BirthdayTable
      :birthday="birthday"
      :header="header"
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

function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

export default {
  components: {
    BirthdayTable,
    Loader
  },
  props: {
    months: {
      type: Array
    },
    months_parental: {
      type: Array
    }
  },
  data() {
    return {
      SelectedDay: null,
      SelectedMonth: null,
      DaysCount: null,
      birthday: null,
      todayYear: Number,
      count: Number,
      type_info: "dates",
      loading_top: true,
      loading: true
    };
  },
  computed: {
    header: function() {
      return this.SelectedDay + " " + this.months_parental[this.SelectedMonth];
      // return this.birthday.length;
    }
  },
  methods: {
    MonthClicked(index) {
      this.loading = true;
      this.SelectedMonth = index;
      this.DaysCount = daysInMonth(index + 1, today.getYear());
      this.GetBirthdayByDay(this.SelectedMonth, "1");
    },
    DayClicked(SelectedMonth, day) {
      this.loading = true;
      this.GetBirthdayByDay(this.SelectedMonth, day);
    },
    async GetBirthdayByDay(month, day) {
      const axios = require("axios");
      var url =
        "http://localhost:8000/api/v1/managers/date/" +
        (parseInt(month) + 1).toString() +
        "/" +
        day +
        "/";
      await axios.get(url).then(response => {
        this.birthday = response.data.results;
        this.birthday = BirthdayModify(this.birthday, this.todayYear);
        this.count = response.data.count;
        this.SelectedMonth = month;
        this.SelectedDay = day;
        this.loading = false;
        // }
      });
    }
  },
  created() {
    this.loading_top = true;
    this.SelectedDay = today.getDate();
    this.SelectedMonth = today.getMonth();
    this.todayYear = today.getFullYear();
    this.DaysCount = daysInMonth(this.SelectedMonth + 1, this.todayYear);
    this.GetBirthdayByDay(this.SelectedMonth, this.SelectedDay);
    this.loading_top = false;
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding-top: 0px;
}

.month,
.day {
  background-color: #fff;
  border: none;
}

.months,
.days {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.header_selected {
  width: 100%;
  padding-top: 0.2em;
  border-top: 1px solid #dee2e6;
}

.black_link {
  color: black;
}

.black_link:hover {
  color: #2051cf;
}
</style>