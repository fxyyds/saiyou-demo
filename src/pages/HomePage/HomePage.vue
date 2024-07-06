<template>
  <div>
    <van-pull-refresh
        v-model="refresh"
        success-text="刷新成功"
        @refresh="onRefresh"
    >
      <search @searchResult="handleSearchResult"/>
      <div class="">
        <div class="mx-4">
          <!-- 推荐卡片 -->
          <home-recommend-card/>
          <!-- 推荐标签 -->
          <tags-tab @screeningClick="screeningClick" :tagList="data.tagList"/>
        </div>
      </div>
      <div class="mx-4">
        <!-- 推荐内容 -->
        <!--      <home-recommend-content :teamList="data.teamList"/>-->
        <van-list
            class="duration-500 break-all remove-scrollbar overflow-x-auto rounded grid max-h-[32rem] xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3 mb-[69px] md:mb-[29px]"
            v-model:loading="loading"
            :finished="finished"
            offset="100"
            @load="onLoad"
        >
          <team-page
              @lock="lock"
              @close="close"
              @lockOpen="lockOpen"
              v-for="item in data.teamList"
              :team="item"
              v-if="data.teamList&&data.teamList.length>0"
          />
          <div v-else class="h-44 mt-6 col-span-3">
            <n-empty description="还没有队伍哦~">
              <template #extra>
                <!--                todo-->
                <n-button @click="router.push('/create/team')" size="small">
                  去创建
                </n-button>
              </template>
            </n-empty>
          </div>
          <van-back-top bottom="10vh"/>
        </van-list>
      </div>
      <div @click="toFeedback"
           class="fixed bottom-[9rem] shadow rounded-full shadow-lg right-2 bg-white p-3 mr-5 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="w-5 h-5 bg-white rounded-full">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/>
        </svg>
      </div>
    </van-pull-refresh>
  </div>
</template>
<script lang="ts" setup>
import Search from "../../components/search/Search.vue";

import HomeRecommendCard from "./components/HomeRecommendCard.vue";
import {reactive, ref} from "vue";
import {TeamControllerService} from "../../services/saiyou-backend";
import TeamPage from "./components/TeamPage.vue";
import {useRouter} from "vue-router";
import TagsTab from "../../components/tag/TagsTab.vue";
import {useTagStore} from "../../stores/Tag";
const {tag} = useTagStore()

const toFeedback = () => {
  location.href = "https://txc.qq.com/products/612603"
}
const router = useRouter();
const data = reactive({
  tagList: [
    {
      id: 1, tagName: '推荐'
    }, ...tag.tagList.sort(() => Math.random() - 0.5)],
  teamList: [],
  search: false,
  initPageNum: 1,
  searchText: '',
  tag: []
})

const handleSearchResult = async (result) => {
  data.searchText = result;
  const res = await TeamControllerService.listTeamVoByPageUsingPost({
    current: 1,
    searchText: result
  })
  if (res.code === 0 && res.data) {
    data.teamList = res.data.records
    data.initPageNum = 2;
    if (res.data.records.length <= 0) {
      data.search = true
    }
    if (res.data.current * res.data.records.length >= res.data.total) {
      finished.value = true;
    }
  }
};

const screeningClick = (val) => {
  if (val === "1") {
    data.tag = []
  } else {
    data.tag = data.tagList.filter(i => i.id === val).map(t => t.tagName)
  }
  data.initPageNum = 1
  data.teamList = [];
  onLoad()
}

const lockOpen = (val) => {
  data.teamList = data.teamList.map(item => {
    if (item.id === val) {
      item.teamStatus = 0
      return item
    }
    return item;
  });
}

const lock = (val) => {
  data.teamList = data.teamList.map(item => {
    if (item.id === val) {
      item.teamStatus = 1
      return item
    }
    return item;
  });
}

const close = (result) => {
  data.teamList = data.teamList.filter(t => t.id !== result)
};

const loading = ref(false);
const finished = ref(false);

const loadData = async () => {
  const res = await TeamControllerService.listTeamVoByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    tags: data.tag
  })

  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      data.search = true
      return
    } else {
      setTimeout(() => {
        data.search = false
        data.teamList.push(...res.data.records);
        data.teamList = data.teamList.filter((item, index) => {
          return data.teamList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onLoad = () => {
  if (refresh.value) {
    data.initPageNum = 1
    data.teamList = [];
    refresh.value = false;
  }
  loading.value = true;
  loadData();
}

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  data.searchText = ''
  onLoad();
};

const refresh = ref(false);

// onMounted(async () => {
//   const res = await TeamControllerService.listTeamVoByPageUsingPost({pageSize: 1})
//   if (res.code === 0 && res.data) {
//     data.teamList = res.data.records
//     data.initPageNum = 2;
//     if (res.data.current * res.data.records.length >= res.data.total) {
//       finished.value = true;
//     }
//     if (res.data.records.length <= 0) {
//       data.search = true
//     }
//     loading.value = false;
//   }
// })
</script>
<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
