<template>
  <div class="border-b">
    <navbar class="fixed top-0 left-0 right-0 z-50 border-b"/>
  </div>
  <div class="mt-[64px]">
    <router-view/>
  </div>
  <div>
    <tab-bar/>
  </div>

</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import Navbar from "./Navbar/Navbar.vue";
import TabBar from "./TabBar/TabBar.vue";

const onClickLeft = () => history.back();
const route = useRoute();
const writeList = ['/my_info', '/dynamic', '/login', '/register']
</script>

<style scoped></style>
