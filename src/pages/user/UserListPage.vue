<template>
  <search @searchResult="handleSearchResult"/>
  <div class="mx-4">
    <tags-tab :tagList="data.tagList"/>
    <van-list
        class="rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3"
        v-model:loading="loading"
        :finished="finished"
        @load="onLoad"
    >
      <div v-if="data.userList&&data.userList.length>0" v-for="item in data.userList"
           class=" space-y-2 rounded">
        <div class="rounded-lg">
          <div class="flex justify-between items-center">
            <div @click="router.push('/user/'+item.id)" class="flex items-center justify-start space-x-2">
              <div>
                <img class="rounded-full w-12 h-12"
                     :src="item.userAvatar?item.userAvatar:avtar">
              </div>
              <div class="flex flex-col items-start">
                <div class="text-lg">{{
                    item.userName && item.userName.length < 8 ? item.userName : item.userName.slice(0, 8) + '...'
                  }}
                </div>
                <div class="text-xs text-gray-400">{{
                    item.userProfile ? item.userProfile && item.userProfile.length < 18 ? item.userProfile : item.userProfile.slice(0, 18) + '...' : '还未设置个性签名哦~'
                  }}
                </div>
              </div>
            </div>
            <div v-if="!item.friend" class="flex items-center space-x-2">
              <!--              <div v-if="item.id !==loginUser.id"-->
              <div @click="toApply(item)" class="text-sky-500 bg-gray-100 text-xs rounded-full px-3 py-1">添加
              </div>
            </div>

          </div>
        </div>
        <!--    </div>-->
      </div>
      <div v-else class="h-44 mt-6 col-span-3">
        <n-empty description="没找更多用户哦~">
        </n-empty>
      </div>
      <van-back-top bottom="10vh"/>
    </van-list>
    <van-dialog v-model:show="add" title="申请添加朋友" @confirm="apply" show-cancel-button>
      <div>
        <van-field
            maxlength="30"
            show-word-limit
            rows="2"
            center
            clearable
            v-model="data.apply.remark"
            placeholder="填写申请备注对方更容易同意哦~"
        />
      </div>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive, ref} from "vue";
import Search from "../../components/search/Search.vue";
import TagsTab from "../../components/tag/TagsTab.vue";
import {useUserStore} from "../../stores/user";
import {FriendsApplyControllerService, UserControllerService} from "../../services/saiyou-backend";
import avtar from "../../assets/image/avatar.jpg";
import {message} from "ant-design-vue";

const {loginUser} = useUserStore();
const handleSearchResult = (val) => {
  console.log(val)
}
import {useTagStore} from "../../stores/Tag";
const {tag} = useTagStore()
const router = useRouter();
const route = useRoute();
const data = reactive({
  tagList: [
    {
      id: 1, tagName: '推荐'
    }, ...tag.tagList.sort(() => Math.random() - 0.5)],
  userList: [],
  initPageNum: 1,
  apply: {
    id: 0,
    remark: loginUser.userName ? "我是" + loginUser.userName : "我是" + loginUser.userAccount
  },
  searchText: ''
})
const apply = async () => {
  const res = await FriendsApplyControllerService.applyFriendUsingPost({
    remark: data.apply.remark,
    receiveId:  data.apply.id
  })
  if (res.data && res.code === 0) {
    message.success("申请成功")
    add.value = false
  }
}
const add = ref(false)
const loading = ref(false);
const finished = ref(false);
const toApply = (item) => {
  data.apply.id = item.id
  add.value = true
}
const loadData = async () => {
  const res = await UserControllerService.listUserVoByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText
  })

  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.userList.push(...res.data.records);
        data.userList = data.userList.filter((item, index) => {
          return data.userList.findIndex(obj => obj.id === item.id) === index;
        }).filter(item => item.id !== loginUser.id)
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onLoad = () => {
  loading.value = true;
  loadData();
}

</script>

<style scoped>

</style>
