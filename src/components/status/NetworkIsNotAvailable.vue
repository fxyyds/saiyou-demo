<template>
  <div class=" sticky top-0 z-50 ">
    <navbar class=" border-b"/>
  </div>
  <n-layout
      embedded
      class="h-full"
      :content-style="{
      padding: '120px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }"
  >
    <n-result
        class="error"
        status="500"
        title="网络不可用"
        description="网络开小差了，去喝杯咖啡等等它吧~"
    >
      <template #footer>
        <n-button @click="goHome">重新载入</n-button>
      </template>
    </n-result>
  </n-layout>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";
import Navbar from "../../layouts/Navbar/Navbar.vue";
import {useOnline} from "@vueuse/core";
import {computed} from "vue";
import {createDiscreteApi} from 'naive-ui'

const {message} = createDiscreteApi(["message"])

const route = useRoute();
const router = useRouter();
const online = useOnline();
const networkStatus = computed(() => (online.value ? "Online" : "Offline"));
const loading = computed(() => networkStatus.value !== "Online");
const goHome = () => {
  if (loading) {
    message.error("网络开小差了，去喝杯咖啡等等它吧~")
  } else {
    router.push('/');
  }
};
</script>

<style scoped>
.state {
  height: 100%;
}

.n-layout {
  background-color: white;
}
</style>
