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
          <dynamic-content :dynamic="item"/>
        </div>
        <div v-else class="h-44 mt-6 col-span-3">
          <n-empty description="还没有收藏哦~">
            <template #extra>
              <!--                todo-->
              <n-button @click="router.push('/dynamic')" size="small">
                去探索
              </n-button>
            </template>
          </n-empty>
        </div>
        <van-back-top bottom="10vh"/>
      </van-list>
    </div>
  </van-pull-refresh>

</template>
<script lang="ts" setup>
import TagsTab from "../../components/tag/TagsTab.vue";
import {onMounted, reactive, ref} from "vue";
import {PostFavourControllerService} from "../../services/saiyou-backend";
import DynamicContent from "../Dynamic/components/DynamicContent.vue";
import Search from "../../components/search/Search.vue";
import {useRouter} from "vue-router";
const router = useRouter();
import {useTagStore} from "../../stores/Tag";
const {tag} = useTagStore()
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


const handleSearchResult = async (result) => {
  data.searchText = result;
  const res = await PostFavourControllerService.listMyFavourPostByPageUsingPost(
      {
        searchText: data.searchText
      }
  )
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

const loading = ref(false);
const finished = ref(false);

onMounted(async () => {
  const res = await PostFavourControllerService.listMyFavourPostByPageUsingPost({})
  if (res.code === 0 && res.data) {
    data.dynamicList = res.data.records
    data.initPageNum = 2;
    if (res.data.current * res.data.records.length >= res.data.total) {
      finished.value = true;
    }
    if (res.data.records.length <= 0) {
      data.search = true
    }
  }
})

const onLoad = async () => {
  if (refresh.value) {
    data.initPageNum = 1
    data.dynamicList = [];
    refresh.value = false;
  }
  const res = await PostFavourControllerService.listMyFavourPostByPageUsingPost({
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
        data.dynamicList.push(...res.data.records);
        data.dynamicList = data.dynamicList.filter((item, index) => {
          return data.dynamicList.findIndex(obj => obj.id === item.id) === index;
        });
      }, 600)
      data.initPageNum += 1;
    }
  }
  loading.value = false;
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
