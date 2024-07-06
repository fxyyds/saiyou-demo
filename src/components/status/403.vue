<template>
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
        status="403"
        title="403 禁止访问"
        description="总有些门是对你关闭的"
    >
      <template #footer>
        <n-button @click="goHome">重新载入</n-button>
      </template>
    </n-result>
  </n-layout>
</template>

<script setup>
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const goHome = () => {
  router.push('/');
};
</script>

<style scoped>
.n-layout {
  background-color: white;
}
</style>
