<template>
  <van-sticky :offset-top="65">

    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab name="1" title="我收到的">
        <template #title>
          <van-icon name="bullhorn-o"/>
          我收到的
        </template>
      </van-tab>
      <van-tab name="2" title="我的申请">
        <template #title>
          <van-icon name="user-o" size="16px"/>
          我的申请
        </template>
      </van-tab>
    </van-tabs>
  </van-sticky>
  <div class="mx-4">
    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
      <div v-if="active==='1'">
        <div v-if="data.applyFriends &&data.applyFriends.length>0" v-for="friend in data.applyFriends"
             class="flex justify-between items-center py-2 px-3 border mt-2 rounded-lg">
          <div class="flex items-center gap-2" @click="router.push('/user/'+friend.applyUser.id)" :key="friend.id">
            <div>
              <img :src="friend.applyUser.userAvatar?friend.applyUser.userAvatar:avtar" class="w-12 h-12 rounded-full">
            </div>
            <div class="flex flex-col items-center">
              <div class="friend-apply">
                <div class="friend-name">{{
                    friend.applyUser.userName.length < 8 ? friend.applyUser.userName : friend.applyUser.userName.slice(0, 8) + '...'
                  }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ friend.remark.length < 15 ? friend.remark : friend.remark.slice(0, 15) + '...' }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ formatTimestamp(friend.createTime) }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end items-center">
            <div class="flex items-center gap-2">
              <van-button style="width: 50px;" @click="agree(friend)" size="small"
                          v-if="friend.status===0" plain type="primary">接受
              </van-button>
              <van-button style="width: 50px;" @click="refusedFriend(friend)" size="small"
                          v-if="friend.status===0" plain type="danger">拒绝
              </van-button>
            </div>
            <div class="flex space-x-1 items-center" v-if="friend.status===1" type="primary">
              <div>
                <van-icon name="certificate" size="16px"/>
              </div>
              <div class="text-xs text-gray-400">
                已接受
              </div>
            </div>
            <div class="flex space-x-1 items-center" v-if="friend.status===2" type="primary">
              <div>
                <van-icon name="warning-o" size="16px"/>
              </div>
              <div class="text-xs text-gray-400">
                已过期
              </div>
            </div>
            <div class="flex space-x-1 items-center" v-if="friend.status===3 "
                 type="primary">
              <div>
                <van-icon name="delete-o" size="16px"/>
              </div>
              <div class="text-xs text-gray-400">
                对方已撤销
              </div>
            </div>
            <div class="flex space-x-1 items-center" v-if="friend.status===4 "
                 type="primary">
              <div>
                <van-icon name="cross" size="16px"/>
              </div>
              <div class="text-xs text-gray-400">
                已拒绝
              </div>
            </div>
          </div>
        </div>
        <van-empty v-else description="暂无好友申请"/>
      </div>
      <div v-if="active==='2'">
        <div v-if="data.myApplyFriends &&data.myApplyFriends.length>0" v-for="friend in data.myApplyFriends"
             class="flex justify-between items-center py-2 px-3 border mt-2 rounded-lg">
          <div  @click="router.push('/user/'+friend.applyUser.id)" class="flex items-center gap-2" :key="friend.id">
            <div>
              <img :src="friend.applyUser.userAvatar?friend.applyUser.userAvatar:avtar" class="w-12 h-12 rounded-full">
            </div>
            <div class="flex flex-col items-center">
              <div class="friend-apply">
                <div class="friend-name">{{
                    friend.applyUser.userName.length < 8 ? friend.applyUser.userName : friend.applyUser.userName.slice(0, 8) + '...'
                  }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ friend.remark.length < 15 ? friend.remark : friend.remark.slice(0, 15) + '...' }}
                </div>
                <div class="text-xs text-gray-400">
                  {{ formatTimestamp(friend.createTime) }}
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end items-center">
            <van-button style="width: 50px;" @click="canceledApply(friend)" size="small"
                        v-if="friend.status===0" plain type="danger">撤销
            </van-button>
            <div class="flex space-x-1 items-center" v-if="friend.status===1"
                 type="primary">
              <div>
                <van-icon name="certificate" size="16px"/>
              </div>
              <div class="text-xs text-gray-400">
                已被接受
              </div>
            </div>
            <div class="flex space-x-1 items-center" v-if="friend.status===2" type="primary">
              <div>
                <van-icon name="warning-o" size="16px"/>
              </div>
              <div class="text-xs text-gray-400">
                已过期
              </div>
            </div>
            <div class="flex space-x-1 items-center" v-if="friend.status===3"
                 type="primary">
              <div>
                <van-icon name="delete-o" size="16px"/>
              </div>
              <div class="text-xs text-gray-400">
                已撤销
              </div>
            </div>
            <div class="flex space-x-1 items-center" v-if="friend.status===4"
                 type="primary">
              <div>
                <van-icon name="cross" size="16px"/>
              </div>
              <div class="text-xs text-gray-400">
                已被拒绝
              </div>
            </div>
          </div>
        </div>
        <van-empty v-else description="暂无申请"/>
      </div>
    </van-list>
  </div>
  <div class="h-[54px]"></div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {FriendsApplyControllerService} from "../../services/saiyou-backend";
import avtar from '../../assets/image/avatar.jpg'
import {useUserStore} from "../../stores/user";
import {message} from "ant-design-vue";
import {formatTimestamp} from "../../utlis/timeUtlis";
import {useNotReadStore} from "../../stores/notRead";


const {notRead} = useNotReadStore()
const {loginUser} = useUserStore()
const router = useRouter()
const data = reactive({
  applyFriends: [],
  myApplyFriends: [],
  initPageNum: 1
})
const active = ref("1");

const showUser = () => {

}
const agree = async (item) => {
  const res = await FriendsApplyControllerService.agreedFriendUsingPost(item.id)
  if (res.data && res.code === 0) {
    message.success("添加成功")
    item.status = 1
  }
}

const refusedFriend = async (item) => {
  const res = await FriendsApplyControllerService.refusedFriendUsingPost(item.id)
  if (res.data && res.code === 0) {
    message.success("拒绝成功")
    item.status = 4
  }
}

const canceledApply = async (item) => {
  const res = await FriendsApplyControllerService.revokeFriendUsingPost(item.id)
  if (res.data && res.code === 0) {
    message.success("撤销成功")
    item.status = 3
  }
}
const onMyReceivingData = async () => {
  const res = await FriendsApplyControllerService.myReceivingRecordUsingPost({
    current: data.initPageNum,
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.applyFriends.push(...res.data.records);
        data.applyFriends = data.applyFriends.filter((item, index) => {
          return data.applyFriends.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onMyApplyData = async () => {
  const res = await FriendsApplyControllerService.myApplyRecordUsingPost({
    current: data.initPageNum,
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.myApplyFriends.push(...res.data.records);
        data.myApplyFriends = data.myApplyFriends.filter((item, index) => {
          return data.myApplyFriends.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const loading = ref(false);
const finished = ref(false);

const onTabChange = () => {
  loading.value = false
  finished.value = false
  data.initPageNum = 1
  switch (active.value) {
    case '1':
      data.applyFriends = []
      break;
    case '2':
      data.myApplyFriends = []
  }
  onLoad()
}

const onLoad = () => {
  loading.value = true;
  switch (active.value) {
    case '1':
      onMyReceivingData()
      break
    case '2':
      onMyApplyData()
      break
  }
}

onMounted(async () => {
  const res = await FriendsApplyControllerService.readUsingPost()
  if (res.code == 0 && res.data) {
    notRead.count = 0
  }
})

</script>

<style scoped>

</style>
