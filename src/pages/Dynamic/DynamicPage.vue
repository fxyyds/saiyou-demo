<template>
  <van-pull-refresh
      v-model="refresh"
      success-text="刷新成功"
      @refresh="onRefresh"
  >
    <search @searchResult="handleSearchResult"/>
    <div class="mx-4">
      <tags-tab @screeningClick="screeningClick" :tagList="data.tagList"/>
    </div>
    <div class="mx-3 min-h-96">
      <van-list
          class="max-h-[52rem] duration-500 remove-scrollbar overflow-x-auto mb-[50px] md:mb-[29px]"
          v-model:loading="loading"
          :finished="finished"
          @load="onLoad"
      >
        <div
            v-if="data.dynamicList&&data.dynamicList.length>0" v-for="item in data.dynamicList"
            class="rounded-lg p-3"
        >
          <dynamic-content @offlineResult="offlineResult" @deleteResult="deleteResult" :dynamic="item"/>
        </div>
        <div v-else class="h-44 mt-6 col-span-3">
          <n-empty description="还没有动态哦~">
            <template #extra>
              <!--                todo-->
              <n-button @click="router.push('/add/post')" size="small">
                去发帖
              </n-button>
            </template>
          </n-empty>
        </div>
        <!--        <van-back-top bottom="10vh"/>-->
      </van-list>
    </div>
    <div class="fixed bottom-[4.8rem] shadow rounded-full right-2 mr-5 cursor-pointer"
         @click="router.push('/add/post')">
      <svg t="1710084069546" class="w-[3.5rem] h-[3.5rem] bg-white rounded-full" viewBox="0 0 1024 1024" version="1.1"
           xmlns="http://www.w3.org/2000/svg"
           p-id="15842">
        <path
            d="M691.2 384c0-2.56 0-2.56 0 0l-87.04-87.04-2.56-2.56c-2.56 0-2.56 0-5.12 2.56L381.44 512l-2.56 2.56-15.36 87.04v7.68c0 2.56 2.56 5.12 5.12 7.68 2.56 2.56 7.68 5.12 12.8 5.12h2.56l87.04-15.36s2.56 0 2.56-2.56l217.6-217.6 2.56-2.56c-2.56 2.56-2.56 0-2.56 0z m-238.08 186.88l-43.52 7.68 7.68-46.08 186.88-184.32L640 384l-186.88 186.88zM716.8 680.96v17.92c0 2.56-2.56 5.12-5.12 5.12H312.32c-2.56 0-5.12-2.56-5.12-5.12v-17.92c0-7.68 7.68-15.36 15.36-15.36h376.32c10.24 0 17.92 7.68 17.92 15.36z"
            fill="#E9E9E9" p-id="15843"></path>
        <path
            d="M691.2 384c0-2.56 0-2.56 0 0l-87.04-87.04-2.56-2.56c-2.56 0-2.56 0-5.12 2.56L381.44 512l-2.56 2.56-15.36 87.04v7.68c0 2.56 2.56 5.12 5.12 7.68 2.56 2.56 7.68 5.12 12.8 5.12h2.56l87.04-15.36s2.56 0 2.56-2.56l217.6-217.6 2.56-2.56c-2.56 2.56-2.56 0-2.56 0z m-238.08 186.88l-43.52 7.68 7.68-46.08 186.88-184.32L640 384l-186.88 186.88zM716.8 680.96v17.92c0 2.56-2.56 5.12-5.12 5.12H312.32c-2.56 0-5.12-2.56-5.12-5.12v-17.92c0-7.68 7.68-15.36 15.36-15.36h376.32c10.24 0 17.92 7.68 17.92 15.36z"
            fill="#E9E9E9" p-id="15844"></path>
        <path
            d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 998.4C243.2 998.4 25.6 780.8 25.6 512S243.2 25.6 512 25.6s486.4 217.6 486.4 486.4-217.6 486.4-486.4 486.4z"
            fill="#E9E9E9" p-id="15845"></path>
        <path
            d="M691.2 384c0-2.56 0-2.56 0 0l-87.04-87.04-2.56-2.56c-2.56 0-2.56 0-5.12 2.56L381.44 512l-2.56 2.56-15.36 87.04v7.68c0 2.56 2.56 5.12 5.12 7.68 2.56 2.56 7.68 5.12 12.8 5.12h2.56l87.04-15.36s2.56 0 2.56-2.56l217.6-217.6 2.56-2.56c-2.56 2.56-2.56 0-2.56 0z m-238.08 186.88l-43.52 7.68 7.68-46.08 186.88-184.32L640 384l-186.88 186.88z m248.32 94.72H322.56c-10.24 0-15.36 7.68-15.36 15.36v17.92c0 2.56 2.56 5.12 5.12 5.12h401.92c2.56 0 5.12-2.56 5.12-5.12v-17.92c-2.56-7.68-10.24-15.36-17.92-15.36z"
            fill="#091010" p-id="15846"></path>
      </svg>
    </div>
  </van-pull-refresh>

</template>
<script lang="ts" setup>
import TagsTab from "../../components/tag/TagsTab.vue";
import {onMounted, reactive, ref} from "vue";
import {PostControllerService} from "../../services/saiyou-backend";
import DynamicContent from "./components/DynamicContent.vue";
import Search from "../../components/search/Search.vue";
import {useRouter} from "vue-router";
import {useTagStore} from "../../stores/Tag";
const {tag} = useTagStore()
const router = useRouter();
const refresh = ref(false);

const data = reactive({
  dynamicList: [],
  initPageNum: 1,
  tagList: [
    {
      id: 1, tagName: '推荐'
    }, ...tag.tagList.sort(() => Math.random() - 0.5)],
  searchText: '',
  search: false,
  tag:[]
})

const screeningClick = (val) => {
  if (val === 1) {
    data.tag = []
  } else {
    data.tag = data.tagList.filter(i => i.id === val).map(t => t.tagName)
  }
  data.dynamicList=[]
  data.initPageNum = 1
  onLoad()
}

const offlineResult = (result) => {
  data.dynamicList = data.dynamicList.filter(item => item.id !== String(result))
}

const deleteResult = (res) => {
  data.dynamicList = data.dynamicList.filter(item => item.id !== String(res))
}

const handleSearchResult = async (result) => {
  data.searchText = result;
  const res = await PostControllerService.listPostVoByPageUsingPost({
    searchText: result
  })
  if (res.code === 0 && res.data) {
    data.dynamicList = res.data.records
    data.initPageNum = 2;
    if (res.data.records.length <= 0) {
      data.search = true
    }
    if (res.data.current * res.data.records.length >= res.data.total) {
      finished.value = true;
    }
  }
};


const loading = ref(false);
const finished = ref(false);
//
// onMounted(async () => {
//   const res = await PostControllerService.listPostVoByPageUsingPost({})
//   if (res.code === 0 && res.data) {
//     data.dynamicList = res.data.records
//     data.initPageNum = 2;
//     if (res.data.current * res.data.records.length >= res.data.total) {
//       finished.value = true;
//     }
//   }
// })

const onLoad = async () => {
  loading.value = true
  if (refresh.value) {
    data.initPageNum = 1
    data.dynamicList = [];
    refresh.value = false;
  }
  const res = await PostControllerService.listPostVoByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    tags:data.tag
  })

  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      data.search = true
    } else {
      const dataList = data.dynamicList.filter(item => {
        return !res.data.records.some(record => record.id === item.id);
      });
      setTimeout(() => {
        data.search = false
        data.dynamicList.push(...res.data.records);
        data.dynamicList = data.dynamicList.filter((item, index) => {
          return data.dynamicList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  data.searchText = ''
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};


</script>
<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
