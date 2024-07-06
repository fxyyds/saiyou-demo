<template>
  <div>
    <search @searchResult="handleSearchResult"/>
    <div class="mx-4">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <div v-for="item in data.fridendList"
             class=" space-y-2 rounded border p-2 hover:bg-gray-100 duration-400">
          <div class="rounded-lg ">
            <div class="flex justify-between items-center">
              <div @click="router.push('/friends/chat/'+item.id)" class="flex items-center justify-start space-x-2">
                <div>
                  <img class="rounded-full w-12 h-12"
                       :src="item.userAvatar?item.userAvatar:avtar">
                </div>
                <div class="flex flex-col items-start">
                  <div class="text-lg">{{
                      getName(item)
                    }}
                  </div>
                  <div class="text-xs text-gray-400">{{
                      item.userProfile ? item.userProfile && item.userProfile.length < 18 ? item.userProfile : item.userProfile.slice(0, 18) + '...' : '还未设置个性签名哦~'
                    }}
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <van-icon name="chat-o" size="2rem"/>
                <!--              <div v-if="item.id !==loginUser.id"-->
              </div>
            </div>
          </div>
          <!--    </div>-->
        </div>
      </van-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {FriendsControllerService} from "../../services/saiyou-backend";
import avtar from '../../assets/image/avatar.jpg'

const router = useRouter();
const route = useRoute();
const data = reactive({
  fridendList: [],
  initPageNum: 1,
  searchText: ''
})
const getName = (item) => {
  if (item.remark) {
    if (item.remark.length < 8) {
      return item.remark
    } else {
      return item.remark.slice(0, 8) + '...'
    }
  }
  if (item.userName) {
    if (item.userName.length < 8) {
      return item.userName
    } else {
      return item.userName.slice(0, 8) + '...'
    }
  }
  if (item.userAccount) {
   return item.userAccount
  }
}
const handleSearchResult = (result) => {
  data.searchText = result;
  loading.value = false
  finished.value = false
  data.initPageNum = 1
  data.fridendList = []
  onLoad()
}


const loading = ref(false);
const finished = ref(false);

const onLoad = async () => {
  loading.value = true;
  const res = await FriendsControllerService.listMyFriendsByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.fridendList.push(...res.data.records);
        data.fridendList = data.fridendList.filter((item, index) => {
          return data.fridendList.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

</script>

<style scoped>

</style>
