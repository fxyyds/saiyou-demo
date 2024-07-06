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
        status="500"
        title="服务器错误"
        description="服务器出错,请稍后再试~"
    >
      <template #footer>
        <n-button @click="goHome">散财消灾</n-button>
      </template>
    </n-result>
  </n-layout>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push('/');
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
