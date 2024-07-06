<template>
  <div>
    <van-pull-refresh
        v-model="refresh"
        success-text="刷新成功"
        @refresh="onRefresh"
    >
      <search @searchResult="handleSearchResult"/>
      <!-- 推荐标签 -->
      <div>
        <tags-tab @screeningClick="screeningClick" :tagList="data.tagList"/>
      </div>
      <div class="mx-4">
        <!-- 推荐内容 -->
        <van-list
            class="duration-500 remove-scrollbar overflow-x-auto rounded grid max-h-[32rem] xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3 mb-[69px] md:mb-[29px]"
            v-model:loading="loading"
            :finished="finished"
              @load="onLoad"
        >
          <team-list @lock="lock"
                     @close="close"
                     @lockOpen="lockOpen" v-for="item in data.teamList" :team="item"
                     v-if="data.teamList&&data.teamList.length>0"/>
          <div class="rounded-lg" v-else-if="data.search===false" v-for="item in 10">
            <n-skeleton text :repeat="6"/>
          </div>
          <div v-else class="h-44 mt-6 col-span-3">
            <n-empty description="您还没有队伍哦~">
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
    </van-pull-refresh>
  </div>
</template>
<script lang="ts" setup>
import Search from "../../components/search/Search.vue";
import TeamList from "../HomePage/components/TeamPage.vue";
import {onMounted, reactive, ref} from "vue";
import {TeamControllerService} from "../../services/saiyou-backend";
import TagsTab from "../../components/tag/TagsTab.vue";
import {useRouter} from "vue-router";
const router = useRouter();
import {useTagStore} from "../../stores/Tag";
const {tag} = useTagStore()
const data = reactive({
  tagList: [
    {
      id: 1, tagName: '推荐'
    },...tag.tagList.sort(() => Math.random() - 0.5)],
  teamList: [],
  search: false,
  initPageNum: 1,
  searchText: '',
  tag:[]
})

const handleSearchResult = async (result) => {
  data.searchText = result;
  const res = await TeamControllerService.listMyTeamVoByPageUsingPost({
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
  if (val === 1) {
    data.tag = []
  } else {
    data.tag = data.tagList.filter(i => i.id === val).map(t => t.tagName)
  }
  data.teamList=[]
  data.initPageNum = 1
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
      item.teamStatus =1
      return item
    }
    return item;
  });
}

const close = (result) => {
  data.search = true
  data.teamList = data.teamList.filter(t => t.id !== result)
};

const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
  loading.value = true;
  if (refresh.value) {
    data.initPageNum = 1
    data.teamList = [];
    refresh.value = false;
  }
  const res = await TeamControllerService.listMyTeamVoByPageUsingPost({
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
        data.teamList.push(...res.data.records);
        data.teamList = data.teamList.filter((item, index) => {
          return data.teamList.findIndex(obj => obj.id === item.id) === index;
        });
      }, 600)
      data.initPageNum += 1;
      loading.value = false;
    }
  }
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

onMounted(async () => {
  const res = await TeamControllerService.listMyTeamVoByPageUsingPost({})
  if (res.code === 0 && res.data) {
    data.teamList = res.data.records
    data.initPageNum = 2;
    if (res.data.current * res.data.records.length >= res.data.total) {
      finished.value = true;
    }
    if (res.data.records.length <= 0) {
      data.search = true
    }
  }
})
</script>
<style scoped>

</style>
