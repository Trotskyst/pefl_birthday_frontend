<template>
    <div class="btn-group-vertical left-menu-buttons" role="group" aria-label="Basic example">

<!-- <button type="button" class="btn btn-secondary"> -->
            <router-link
      v-for="link in links"
      :key="link.url"
      tag="button"
      class="btn btn-secondary"
      active-class="btn-info"
      :to="link.url"
      :exact="link.exact"
    >
      {{link.title}}
    </router-link>

        <Count />

    </div>
</template>

<script>
import Count from "@/components/Count.vue";

export default {
  components: {
    Count
  },
  data: () => ({
    links: [
      { title: "По дате", url: "/", exact: true },
      { title: "По алфавиту", url: "/alphabet" },
      { title: "По странам", url: "/country" },
      { title: "Девушки Пефла", url: "/woman" },
    ]
  })
};
</script>

<style scoped>
    .left-menu-buttons {
        width: 100%;
    }
</style>