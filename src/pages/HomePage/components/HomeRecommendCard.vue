<template>
  <div>
    <recommended-list/>
  </div>
</template>

<script setup lang="ts">
import {useWindowScroll} from "@vueuse/core";
import {computed} from "vue";
import RecommendedList from "./RecommendedList.vue";

const {x, y} = useWindowScroll();

const isSlide300 = computed(() => y.value > 30);
</script>

<style scoped>

</style>
