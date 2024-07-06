<template>
  <van-pull-refresh>
<!--      v-model="refresh"-->
<!--      success-text="刷新成功"-->
<!--      @refresh="onRefresh"-->
<!--  >-->
    <!--    <search @searchResult="handleSearchResult"/>-->
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item v-model="value" @change="change" :options="options"/>
    </van-dropdown-menu>
    <div class="mx-4 mt-2">
<!--      <van-list-->
<!--          class="duration-500 remove-scrollbar md:mb-0 overflow-x-auto rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3 mb-[69px] md:mb-[29px]"-->
<!--          v-model:loading="loading"-->
<!--          :finished="finished"-->
<!--          offset="100"-->
<!--          @load="onLoad"-->
<!--      >-->
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
          <n-empty description="暂时没有找到结果~">
            <template #extra>
              <!--                todo-->
              <n-button @click="router.push('/competition')" size="small">
                去首页
              </n-button>
            </template>
          </n-empty>
        </div>
        <van-back-top bottom="15vh"/>
<!--      </van-list>-->
    </div>
  </van-pull-refresh>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";

import {CompetitionControllerService, JoinCompeteControllerService} from "../../services/saiyou-backend";
import CompetitionContent from "../Competition/components/CompetitionContent.vue";
import {showSuccessToast} from "vant";
import {useRouter} from "vue-router";

const router = useRouter();
const data = reactive({
  tagList: [],
  searchText: '',
  thisIndex: 0,
  initPageNum: 1,
  search: false,
  competitionList: []
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

const handleDeleteResult = (result) => {
  data.competitionList = data.competitionList.filter(c => c.id !== result)
};

// const refresh = ref(false);
// const onRefresh = () => {
//   if (data.thisIndex === 0) {
//     finished.value = false;
//     loading.value = true;
//     data.searchText = ''
//     onLoad();
//   } else {
//     joinData()
//   }
// };

const change = (val) => {
  finished.value = false;
  loading.value = true;
  data.competitionList = []
  if (val === 0) {
    lodeData()
    return
  }
  if (val === 1) {
    joinData()
    return;
  }
}

const menuRef = ref(null);
const value = ref(1);
const options = [
  {text: '我加入的竞赛', value: 1},
  {text: '我创建的竞赛', value: 0},
];

const lodeData = async () => {
  const res = await CompetitionControllerService.listMyCompetitionVoByPageUsingPost({})
  if (res.code === 0 && res.data) {
    data.competitionList = res.data.records
    data.initPageNum = 2
    if (res.data.current * res.data.records.length >= res.data.total) {
      finished.value = true;
    }
    if (res.data.records.length <= 0) {
      data.search = true
    }
  }
}

const joinData = async () => {
  const res = await JoinCompeteControllerService.listMyJoinCompeteByPageUsingPost()
  if (res.code === 0 && res.data) {
    data.competitionList = res.data.records
    if (res.data.current * res.data.records.length >= res.data.total) {
      finished.value = true;
    }
    if (res.data.records.length <= 0) {
      data.search = true
    }
  }
}

onMounted( () => {
  joinData()
})
//
const loading = ref(false);
const finished = ref(false);
//
// const onLoadJoin = async () => {
//
//   const res = await JoinCompeteControllerService.listMyJoinCompeteByPageUsingPost()
//   if (res.code === 0) {
//     if (res.data.records.length <= 0) {
//       finished.value = true;
//     } else {
//       console.log(22)
//       setTimeout(() => {
//         data.competitionList.push(...res.data.records);
//         data.competitionList = data.competitionList.filter((item, index) => {
//           return data.competitionList.findIndex(obj => obj.id === item.id) === index;
//         });
//         data.initPageNum += 1;
//         loading.value = false;
//       }, 200)
//     }
//   }
// }
//
// const onLoad =  () => {
//   loading.value = true
//   if (refresh.value) {
//     data.initPageNum = 1
//     data.competitionList = [];
//     refresh.value = false;
//   }
//   onLoadJoin()
// }


</script>
<style scoped>
</style>
