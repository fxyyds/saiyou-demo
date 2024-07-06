<template>
  <search @searchResult="handleSearchResult"/>
  <div class="mt-2 mx-4">
    <div v-if="data.productInfoList.length>0">
      <div class="grid grid-cols-2 mt-3 gap-3">
        <div v-for="item in data.productInfoList" @click="clickTabBar(item)" class="h-40 rounded border rounded">
          <div>
            <div class="flex justify-center items-center mt-4">
              <img v-if="item&&item.img&&item.img.length>0" class="w-16 rounded-lg h-16 stroke-1" :src="item.img"/>
              <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor"
                   :class="data.activeIndex === item.id?'stroke-cyan-500':''"
                   class="w-16 h-16 stroke-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
              </svg>
            </div>
            <p class="flex justify-center items-center mt-1 text-sm">
              {{ item.name }}
            </p>
            <div v-if="item.total && item.total>=0" class="flex justify-center items-center mt-1 text-sm">
              <span class="text-red-500"> {{ item.total }}</span>&nbsp;积分
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-empty v-else description="暂无数据"/>
    <van-submit-bar
        :decimal-length="0"
        tip-icon="info-o"
        currency=""
        suffix-label="积分"
        tip="快来挑选心怡的商品吧~"
        :price="data.price" button-text="提交订单" @submit="onSubmit"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {ProductInfoControllerService, ProductOrderControllerService} from "../../services/saiyou-backend";
import Search from "../../components/search/Search.vue";
import {showSuccessToast} from "vant";
import {message} from "ant-design-vue";

const searchText = ref('')
const router = useRouter();

const handleSearchResult = async (result) => {
  data.searchText = result;
  const res = await ProductInfoControllerService.listProductInfoByPageUsingPost({
    searchText: result
  })
  if (res.code === 0 && res.data) {
    data.productInfoList = res.data.records
  }
};

const goToUrl = () => {

}

const onSubmit = async () => {
  if (!data.activeIndex) {
    message.error("请先选择商品")
    return
  }
  const res = await ProductOrderControllerService.createOrderUsingPost(data.activeIndex)
  if (res.data && res.code === 0) {
    message.success("订单创建成功")
    router.push('/order')
  }
}

const clickTabBar = (item) => {
  data.activeIndex = data.activeIndex ? null : item.id
  data.price = data.activeIndex ? item.total * 100 : 0
}
const data = reactive({
  searchText: '',
  price: 0,
  activeIndex: '',
  productInfoList: [],
})

onMounted(async () => {
  const res = await ProductInfoControllerService.listProductInfoByPageUsingPost({
    searchText: data.searchText
  })
  if (res.data && res.code === 0) {
    data.productInfoList = res.data.records
  }
})
</script>

<style scoped>
</style>
