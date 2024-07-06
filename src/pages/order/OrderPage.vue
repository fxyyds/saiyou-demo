<template>
  <search @searchResult="handleSearchResult"/>
  <div class="">
    <van-list
        class="rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3"
        v-model:loading="loading"
        :finished="finished"
        @load="onLoad"
    >
      <div v-if="data.orderList&&data.orderList.length>0"
           class="mx-4 duration-500 break-all rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3">
        <div class="border p-2 rounded hover:bg-gray-100 "
             v-for="item in data.orderList">
          <div class="flex flex-col">
            <div>商品名称：{{ item.orderName }}</div>
            <div>
              商品状态:
              <a-badge :color="orderStatusEnum[item.status]" :text="orderEnum[item.status]"/>
            </div>
            <div class="">积分价格：{{ item.total }}个</div>
            <div class="text-xs text-gray-400">商品描述：{{ item.productInfo }}</div>
            <div class="text-xs text-gray-400">创建时间：{{ formatTimestamp(item.createTime) }}</div>
          </div>
          <div class="space-x-1 flex justify-end items-center mt-2">
            <van-button @click="payOrder(item)" plain size="small" type="primary">
              支付
            </van-button>
            <van-button @click="cancelOrder(item)" plain size="small" type="danger">取消</van-button>
            <van-button @click="deleteOrder(item)" plain size="small"
                        type="danger">删除
            </van-button>
          </div>
        </div>
      </div>
      <van-empty v-else description="还没有购买过商品哦~"></van-empty>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {ProductOrderControllerService} from "../../services/saiyou-backend";
import {message} from "ant-design-vue";
import {showConfirmDialog} from "vant";
import {formatTimestamp} from "../../utlis/timeUtlis";
import {useUserStore} from "../../stores/user";

const {loginUser} = useUserStore()
const router = useRouter();
const route = useRoute();
const data = reactive({
  orderList: [],
  initPageNum: 1,
  searchText: ""
})

const handleSearchResult = (result) => {
  data.searchText = result;
  loading.value = false
  finished.value = false
  data.initPageNum = 1
  data.orderList = []
  onLoad()
}
const orderEnum = {
  0: '未支付',
  1: '已支付',
  2: "已取消",
  3: '已通过',
  4: '已拒绝'
}
const orderStatusEnum = {
  0: '#bdc3c7',
  1: 'green',
  2: '#bdc3c7',
  3: 'geekblue',
  4: 'red'
}
const loading = ref(false);
const finished = ref(false);

const onLoadOrderData = async () => {
  const res = await ProductOrderControllerService.listMyProductOrderByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.orderList.push(...res.data.records);
        data.orderList = data.orderList.filter((item, index) => {
          return data.orderList.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const deleteOrder = (item) => {
  showConfirmDialog({
    title: '删除订单',
    message: '确认后将删除订单该订单，已支付将退款积分给用户！'
  }).then(async () => {
    const res = await ProductOrderControllerService.deleteOrderUsingPost(item.id)
    if (res.data && res.code === 0) {
      message.success('删除成功')
      data.orderList = data.orderList.filter(o => o.id !== item.id)
    }
  }).catch(() => {
    // on cancel
  });
}

const payOrder = (item) => {
  showConfirmDialog({
    title: '支付订单',
    message: '确认后将扣除' + item.total + '积分，取消或订单未通过后将退回积分！'
  }).then(async () => {
    const res = await ProductOrderControllerService.payOrderUsingPost(item.id)
    if (res.data && res.code === 0) {
      message.success('支付成功')
      item.status = 1
      loginUser.userCoin = loginUser.userCoin - item.total
    }
  }).catch(() => {
    // on cancel
  });
}

const cancelOrder = async (item) => {
  showConfirmDialog({
    title: '取消订单',
    message: '取消订单后，已支付订单将退款积分给用户！'
  }).then(async () => {
    const res = await ProductOrderControllerService.cancelOrderUsingPost(item.id)
    if (res.data && res.code === 0) {
      message.success('取消成功')
      item.status = 3
    }
  }).catch(() => {
    // on cancel
  });
}
const refuseOrder = async (item) => {
  showConfirmDialog({
    title: '拒绝订单',
    message: '拒绝订单后，已支付订单将退款积分给用户！'
  }).then(async () => {
    const res = await ProductOrderControllerService.refuseOrderUsingPost(item.id)
    if (res.data && res.code === 0) {
      message.success('拒绝成功')
      item.status = 4
    }
  }).catch(() => {
    // on cancel
  });
}
const adoptOrder = async (item) => {
  const res = await ProductOrderControllerService.refuseOrderUsingPost(item.id)
  if (res.data && res.code === 0) {
    message.success('通过成功')
    item.status = 3
  }
}

const onLoad = () => {
  loading.value = true;
  onLoadOrderData()
}
</script>

<style scoped>

</style>
