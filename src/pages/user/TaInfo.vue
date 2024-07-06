<template>
  <div class="mt-20">
    <div id="drawer-target" class="">
      <my-info-card :user="data.user"/>
      <div class="rounded-lg p-3 mt-4 mx-4 shadow min-h-[25rem] mb-[56px] md:mb-[39px]"
           style="height: fit-content;">
        <van-tabs v-model:active="active" swipeable animated shrink @click-tab="changeTab(active)">
          <van-tab name='dongtai'>
            <template #title>
              <div
                  :class="data.tabIndex==='dongtai'?'text-lg font-bold':'text-sm text-gray-600'">动态
              </div>
            </template>
            <my-dynamic :userId="data.user.id"/>
          </van-tab>
          <van-tab name="myinfo">
            <template #title>
              <div
                  :class="data.tabIndex==='myinfo'?'text-lg font-bold':'text-sm text-gray-600'">关于Ta
              </div>
            </template>
            <diV>
              <about-me :user="data.user" @userProfileShowClick="userProfileShowClick"
                        @userTagsShowClick="userTagsShowClick"/>
            </diV>
          </van-tab>
        </van-tabs>
<!--        <van-dialog v-model:show="userProfileShow" title="个性签名" @confirm="update(loginUser.userProfile, null)"-->
<!--                    show-cancel-button>-->
<!--          <div>-->
<!--            <van-field-->
<!--                v-model="loginUser.userProfile"-->
<!--                rows="2"-->
<!--                autosize-->
<!--                center-->
<!--                clearable-->
<!--                type="textarea"-->
<!--                maxlength="50"-->
<!--                placeholder="介绍一下自己吧~"-->
<!--                show-word-limit-->
<!--            />-->
<!--          </div>-->
<!--        </van-dialog>-->
<!--        <van-dialog v-model:show="userTagsShow" title="个性标签"-->
<!--                    @confirm="update(null, loginUser.tagList)"-->
<!--                    show-cancel-button>-->
<!--          <div class="min-h-12 m-2 mt-3">-->
<!--            <n-dynamic-tags v-model:value="loginUser.tagList" :max="8"/>-->
<!--          </div>-->
<!--        </van-dialog>-->
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import MyDynamic from "../MyInfoPage/components/MyDynamicList.vue";
import AboutMe from "../MyInfoPage/components/AboutMe.vue";
import MyInfoCard from "../MyInfoPage/components/MyInfoCard.vue";
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "../../stores/user";
import {UserControllerService} from "../../services/saiyou-backend";
import {showSuccessToast} from "vant";
import {message} from "ant-design-vue";
const route = useRoute();
const userStore = useUserStore();
const {loginUser} = userStore

const userProfileShow = ref(false);
const userTagsShow = ref(false);

const userProfileShowClick = (val) => {
  userProfileShow.value = val
}

const update = async (userProfile, tag) => {
  const res = await UserControllerService.updateMyUserUsingPost({userProfile: userProfile, tags: tag});
  if (res.code === 0 && res.data) {
    showSuccessToast("更新成功")
  }
}

const userTagsShowClick = (val) => {
  userTagsShow.value = val
}

const router = useRouter();
const activeValue = ref(false)
const loading = ref(false);
const onRefresh = () => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};


const data = reactive({
  tabIndex: 'dongtai',
  tags: [],
  user: {}
})
const active = ref('dongtai');

const changeTab = (index) => {
  data.tabIndex = index
}

onMounted(async () => {
  const id = route.params.id;
  if (!id){
    message.error("id不能为空")
    return
  }
  const res = await UserControllerService.getUserVoByIdUsingGet(id);
  if (res.code === 0 && res.data){
    data.user = res.data
  }
})


</script>
<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}


/deep/ .van-tabs__line {
  width: 1rem;
}
</style>
