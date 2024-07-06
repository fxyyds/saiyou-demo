<template>
  <van-pull-refresh
      v-model="refresh"
      success-text="刷新成功"
      @refresh="onRefresh"
  >
    <!--    <search @searchResult="handleSearchResult"/>-->
    <div class="mx-4 mt-2">
      <van-list
          class="max-h-[40rem] duration-500 remove-scrollbar md:mb-0 overflow-x-auto rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3 mb-[69px] md:mb-[29px]"
          v-model:loading="loading"
          :finished="finished"
          @load="onLoad"
      >
        <div
            v-if="data.competitionList&&data.competitionList.length>0"
            v-for="item in data.competitionList"
            class="bg-gray-100 rounded-lg p-1 pb-2 shadow"
            style="height: fit-content;"
        >
          <div>
            <div class="flex justify-around items-center">
              <div class="flex-col flex justify-start space-y-2 mt-4">
                <div class="text-md">
                  {{ item.blueTeam && item.blueTeam.teamName ? item.blueTeam.teamName : '暂无对手' }}
                </div>
                <div @click.stop v-if="item.blueTeam">
                  <n-avatar-group :options="item.blueTeam.teamUserList?item.blueTeam.teamUserList:[]" :size="30"
                                  :max="3">
                    <template #avatar="{ option: { userName, userAvatar } }">
                      <n-tooltip>
                        <template #trigger>
                          <n-avatar :src="userAvatar?userAvatar:avatar"/>
                        </template>
                        {{ userName }}
                      </n-tooltip>
                    </template>

                    <template #rest="{ options: restOptions, rest }">
                      <n-dropdown placement="top">
                        <n-avatar>+{{ item.blueTeam.teamUserList.length }}</n-avatar>
                      </n-dropdown>
                    </template>
                  </n-avatar-group>
                </div>
                <div class="text-xs">当前得分：{{ item.redScore }}</div>
                <div class="text-xs">当前胜负：{{ redStatus(item) }}</div>
              </div>
              <div class="mt-4 font-bold text-2xl">VS</div>
              <div class="flex-col flex justify-start space-y-2 mt-4">
                <div class="text-md">
                  {{ item.redTeam && item.redTeam.teamName ? item.redTeam.teamName : '暂无对手' }}
                </div>
                <div @click.stop v-if="item.redTeam">
                  <n-avatar-group :options="item.redTeam.teamUserList?item.redTeam.teamUserList:[]"
                                  :size="30" :max="2">
                    <template #avatar="{ option: { userName, userAvatar } }">
                      <n-tooltip>
                        <template #trigger>
                          <n-avatar :src="userAvatar?userAvatar:avatar"/>
                        </template>
                        {{ userName }}
                      </n-tooltip>
                    </template>
                    <template #rest="{ options: restOptions, rest }">
                      <n-dropdown placement="top">
                        <n-avatar>+{{ item.blueTeam.teamUserList.length }}</n-avatar>
                      </n-dropdown>
                    </template>
                  </n-avatar-group>
                </div>
                <div class="text-xs">当前得分：{{ item.blueScore }}</div>
                <div class="text-xs">当前胜负：{{ blueStatus(item) }}</div>
              </div>
            </div>
            <div class="bg-gray-100 mt-2 mx-4">
              <van-button class="bg-gray-100" :loading="paperLoading" @click="toUserPaper(item)" plain block>开始比赛
              </van-button>
            </div>
          </div>
        </div>
        <div v-else class="h-44 mt-6 col-span-3">
          <n-empty description="暂时没有比赛哦~">
            <template #extra>
              <!--                todo-->
              <n-button @click="router.push('/competition')" size="small">
                去参加
              </n-button>
            </template>
          </n-empty>
        </div>
        <van-back-top bottom="15vh"/>
      </van-list>
    </div>
    <!--    <van-floating-bubble icon="plus" axis="xy" magnetic="x"/>-->
  </van-pull-refresh>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import avatar from '../../assets/image/avatar.jpg'

import {CompeteControllerService, CompeteExamControllerService} from "../../services/saiyou-backend";
import {useRouter} from "vue-router";
import {showLoadingToast} from "vant";

const redStatus = (item) => {
  if (item.redScore > item.blueScore) {
    return '胜'
  } else if (item.redScore < item.blueScore) {
    return '负'
  } else {
    return '平'
  }
}

const paperLoading = ref(false)

const toUserPaper = async (item) => {
  loading.value = true
  const res = await CompeteExamControllerService.startTheExamUsingPost({competitionId: item.competitionId})
  if (res.code === 0 && res.data) {
    const id = res.data.id
    let message = '正在加载试卷'
    if (res.data.state === 'open') {
      message = res.message
    }
    showLoadingToast({
      duration: 1000,
      forbidClick: true,
      message: message,
    });
    setTimeout(() => {
      router.push({path: '/compete/exam', query: {id: id}})
      loading.value = false
    }, 1000)
  } else {
    loading.value = false
  }
}


const blueStatus = (item) => {
  if (item.redScore < item.blueScore) {
    return '胜'
  } else if (item.redScore > item.blueScore) {
    return '负'
  } else {
    return '平'
  }
}
const data = reactive({
  tagList: [],
  searchText: '',
  thisIndex: 0,
  initPageNum: 1,
  search: false,
  competitionList: []
})
const router = useRouter();

const handleSearchResult = async (result) => {
  data.searchText = result;
  const res = await CompeteControllerService.listMyCompeteVoPageUsingPost()
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


const menuRef = ref(null);
const value = ref(0);
const options = [
  {text: '我创建的竞赛', value: 0},
  {text: '我加入的竞赛', value: 1},
];

const lodeData = async () => {
  const res = await CompeteControllerService.listMyCompeteVoPageUsingPost()
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


onMounted(async () => {
  lodeData()
})

const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
  loading.value = true
  if (refresh.value) {
    data.initPageNum = 1
    data.competitionList = [];
    refresh.value = false;
  }
  const res = await CompeteControllerService.listMyCompeteVoPageUsingPost()

  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      data.search = true
    } else {
      const dataList = data.competitionList.filter(item => {
        return !res.data.records.some(record => record.id === item.id);
      });
      setTimeout(() => {
        data.search = false
        data.competitionList.push(...res.data.records);
        data.competitionList = data.competitionList.filter((item, index) => {
          return data.competitionList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false
      }, 200)
    }
  }

}


</script>
<style scoped>
/deep/ .van-button--plain {
  background: rgb(243 244 246 / var(--tw-bg-opacity));
}
</style>
