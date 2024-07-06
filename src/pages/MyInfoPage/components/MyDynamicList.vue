<template>
  <div>
    <van-list
        class="max-h-[38rem] duration-500 remove-scrollbar overflow-x-auto"
        v-model:loading="loading"
        :finished="finished"
        @load="onLoad"
    >
      <div v-if="data.postList && data.postList.length>0" v-for="item in data.postList">
        <my-dynamic-page @deleteResult="handleDeleteResult" :post="item"/>
      </div>
      <div v-else class="h-44 mt-6">
        <n-empty description="还没发过动态哦~">
          <template #extra>
            <!--                todo-->
            <n-button @click="router.push('/add/post')" size="small">
              去发帖
            </n-button>
          </template>
        </n-empty>
      </div>
      <van-back-top bottom="15vh"/>
    </van-list>
  </div>
  <div class="h-[60px]"></div>
</template>

<script setup lang="ts">
import {defineProps, reactive, ref} from "vue";
import {PostControllerService} from "../../../services/saiyou-backend";
import MyDynamicPage from "./MyDynamicPage.vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const data = reactive({
  postList: [],
  initPageNum: 1,
  userId: null
})
const handleDeleteResult = (result) => {
  console.log(result)
  data.postList = data.postList.filter(item => item.id !== result)
};

const props = defineProps({
  userId: String,
})

const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
  loading.value = true;
  const res = await PostControllerService.listMyPostVoByPageUsingPost({
    current: data.initPageNum,
    userId: route.params.id ? route.params.id : null
  })

  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
    } else {
      setTimeout(() => {
        data.postList.push(...res.data.records);
        data.postList = data.postList.filter((item, index) => {
          return data.postList.findIndex(obj => obj.id === item.id) === index;
        });
      }, 600)
      data.initPageNum += 1;
      loading.value = false;
    }
  }
}

</script>

<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
