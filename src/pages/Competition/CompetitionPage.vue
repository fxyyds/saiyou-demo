<template>
  <van-pull-refresh
      v-model="refresh"
      success-text="刷新成功"
      @refresh="onRefresh"
  >
    <search @searchResult="handleSearchResult"/>
    <div class="mx-4 space-x-2">
      <competition-card/>
    </div>
    <div class="mx-4">
      <tags-tab @screeningClick="screeningClick" :tagList="data.tagList"/>
      <van-list
          class="max-h-[40rem] duration-500 remove-scrollbar md:mb-0 overflow-x-auto rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3 mb-[69px] md:mb-[29px]"
          v-model:loading="loading"
          :finished="finished"
          @load="onLoad"
      >
        <div
            v-if="data.competitionList&&data.competitionList.length>0"
            v-for="item in data.competitionList"
            class="bg-gray-100 rounded-lg p-1 pb-4 shadow"
            style="height: fit-content;"
        >
          <competition-content @deleteResult="handleDeleteResult" @runningResult="runningResult"
                               @cancelResult="cancelResult" :competition="item"/>
        </div>
        <div v-else class="h-44 mt-6 col-span-3">
          <n-empty description="还没有赛事哦~">
            <template #extra>
              <!--                todo-->
              <!--              <n-button @click="router.push('/')" size="small">-->
              <!--                去创建-->
              <!--              </n-button>-->
            </template>
          </n-empty>
        </div>
        <van-back-top bottom="15vh"/>
      </van-list>
    </div>
    <van-floating-bubble v-if="loginUser.userRole==='admin'" icon="plus" axis="xy" magnetic="x" @click="onClick"/>
  </van-pull-refresh>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import CompetitionCard from "./components/CompetitionCard.vue";

import {CompetitionControllerService} from "../../services/saiyou-backend";
import CompetitionContent from "./components/CompetitionContent.vue";
import Search from "../../components/search/Search.vue";
import {useRouter} from "vue-router";
import {showSuccessToast} from "vant";
import {useUserStore} from "../../stores/user";
import {useTagStore} from "../../stores/Tag";
const {tag} = useTagStore()
const userStore = useUserStore();
const {loginUser} = userStore
const router = useRouter();
const data = reactive({
  searchText: '',
  initPageNum: 1,
  search: false,
  competitionList: [],
  tagList: [
    {
      id: 1, tagName: '推荐'
    }, ...tag.tagList.sort(() => Math.random() - 0.5)],
  tag: []
})
const cancelResult = (result) => {
  data.competitionList = data.competitionList.map(item => {
    if (item.id === result) {
      item.competitionStatus = 'cancel'
      return item
    }
    return item;
  });
  showSuccessToast("操作成功")
}
const screeningClick = (val) => {
  if (val === 1) {
    data.tag = []
  } else {
    data.tag = data.tagList.filter(i => i.id === val).map(t => t.tagName)
  }
  data.competitionList=[]
  data.initPageNum = 1
  onLoad()
}


const runningResult = (result) => {
  data.competitionList = data.competitionList.map(item => {
    if (item.id === result) {
      item.competitionStatus = 'running'
      return item
    }
    return item;
  });
  showSuccessToast("操作成功")
}

const handleSearchResult = async (result) => {
  data.searchText = result;
  const res = await CompetitionControllerService.listCompetitionVoByPageUsingPost({
    searchText: result
  })
  if (res.code === 0 && res.data) {
    data.competitionList = res.data.records
    data.initPageNum = 2;
    if (res.data.records.length <= 0) {
      data.search = true
    }
    if (res.data.current * res.data.records.length >= res.data.total) {
      finished.value = true;
    }
  }
};

const refresh = ref(false);
const onRefresh = () => {
  finished.value = false;
  loading.value = true;
  data.searchText = ''
  onLoad();
};

const onClick = () => {
  router.push("/competition/create")
}

const handleDeleteResult = (result) => {
  data.competitionList = data.competitionList.filter(c => c.id !== result)
};

// onMounted(async () => {
//   const res = await CompetitionControllerService.listCompetitionVoByPageUsingPost({})
//   if (res.code === 0 && res.data) {
//     data.competitionList = res.data.records
//     data.initPageNum = 2
//     if (res.data.current * res.data.records.length >= res.data.total) {
//       finished.value = true;
//     }
//     if (! data.competitionList|| data.competitionList.length <= 0) {
//       console.log(1)
//       data.search = true
//     }
//   }
// })

const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
  loading.value = true
  if (refresh.value) {
    data.initPageNum = 1
    data.competitionList = [];
    refresh.value = false;
  }
  const res = await CompetitionControllerService.listCompetitionVoByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    tags:data.tag
  })

  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      data.search = true
    } else {
      setTimeout(() => {
        data.search = false
        data.competitionList.push(...res.data.records);
        data.competitionList = data.competitionList.filter((item, index) => {
          return data.competitionList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}


</script>
<style scoped>
</style>
