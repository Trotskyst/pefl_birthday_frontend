<template>
  <div id="app">
    <div class="container">
      <div class="left">
        <div class="left-top">
          <LeftMenu />
        </div>
      </div>
      <div class="center">
        <AlphabetList :aphabet="aphabet" />
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import AlphabetList from "@/components/AlphabetList.vue";

// console.log();
// var date = Date()
// console.log(date.getMonth())
export default {
  name: "alphabet",
  components: {
    LeftMenu,
    AlphabetList
  },
  data() {
    return {
      aphabet: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "Остальные"
      ]
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
