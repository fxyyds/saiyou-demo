<template>
  <div class="mt-20">
    <div id="drawer-target" class="">
      <my-info-card :user="loginUser"/>
      <div class="rounded-lg p-3 mt-4 mx-4 shadow ">
        <div class="flex justify-start space-x-5 items-center mt-3 ml-1">
          <div>
            <div @click="router.push('/my/team')" class="flex flex-col justify-center space-y-1">
              <div class="border border-solid border-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                <svg t="1707228258052" class="w-8 h-8" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg"
                     p-id="18416">
                  <path
                      d="M927 667.63L799.3 408.25 927 148.88H224.69V97h-63.84v778.12H97V927h191.53v-51.88h-63.84V667.63H927z m-95.77-466.88l-102.16 207.5 102.16 207.5H224.69v-415h606.54z m0 0"
                      fill="#383838" p-id="18417"></path>
                </svg>
              </div>
              <p class="text-xs text-gray-400">我的队伍</p>
            </div>
          </div>
          <div>
            <div @click="router.push('/order')" class="flex flex-col justify-center space-y-1">
              <div class="border border-solid border-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-8 h-8">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/>
                </svg>

              </div>
              <p class="text-xs text-gray-400">我的订单</p>
            </div>
          </div>
          <div>
            <div @click="router.push('/my/favour')" class="flex flex-col justify-center space-y-1">
              <div class="border border-solid border-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                </svg>
              </div>
              <p class="text-xs text-gray-400">我的收藏</p>
            </div>
          </div>
          <div @click="router.push('/my/competition')">
            <div class="flex flex-col justify-center space-y-1">
              <div class="border border-solid border-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"/>
                </svg>
              </div>
              <p class="text-xs text-gray-400">我的竞赛</p>
            </div>
          </div>
          <div @click="router.push('/my/compete')">
            <div class="flex flex-col justify-center space-y-1">
              <div class="border border-solid border-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z"/>
                </svg>

              </div>
              <p class="text-xs text-gray-400">我的比赛</p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg p-3 mt-4 mx-4 shadow min-h-[25rem] mb-[56px] md:mb-[39px]"
           style="height: fit-content;">
        <van-tabs v-model:active="active" swipeable animated shrink @click-tab="changeTab(active)">
          <van-tab name='dongtai'>
            <template #title>
              <div
                  :class="data.tabIndex==='dongtai'?'text-lg font-bold':'text-sm text-gray-600'">动态
              </div>
            </template>
            <my-dynamic/>
          </van-tab>
          <van-tab name="myinfo">
            <template #title>
              <div
                  :class="data.tabIndex==='myinfo'?'text-lg font-bold':'text-sm text-gray-600'">关于我
              </div>
            </template>
            <diV>
              <about-me :user="loginUser" @userProfileShowClick="userProfileShowClick"
                        @userTagsShowClick="userTagsShowClick"/>
            </diV>
          </van-tab>
        </van-tabs>
        <van-dialog v-model:show="userProfileShow" title="个性签名" @confirm="update(loginUser.userProfile, null)"
                    show-cancel-button>
          <div>
            <van-field
                v-model="loginUser.userProfile"
                rows="2"
                autosize
                center
                clearable
                type="textarea"
                maxlength="50"
                placeholder="介绍一下自己吧~"
                show-word-limit
            />
          </div>
        </van-dialog>
        <van-dialog v-model:show="userTagsShow" title="个性标签"
                    @confirm="update(null, loginUser.tagList)"
                    show-cancel-button>
          <div class="min-h-12 m-2 mt-3">
            <n-dynamic-tags v-model:value="loginUser.tagList" :max="8"/>
          </div>
        </van-dialog>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import MyDynamic from "./components/MyDynamicList.vue";
import AboutMe from "./components/AboutMe.vue";
import MyInfoCard from "./components/MyInfoCard.vue";
import {useRouter} from "vue-router";
import {useUserStore} from "../../stores/user";
import {UserControllerService} from "../../services/saiyou-backend";
import {showSuccessToast} from "vant";

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
  user: {
    userName: "",
    userProfile: ''
  }
})
const active = ref('dongtai');

const changeTab = (index) => {
  data.tabIndex = index
}
</script>
<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}


/deep/ .van-tabs__line {
  width: 1rem;
}
</style>
