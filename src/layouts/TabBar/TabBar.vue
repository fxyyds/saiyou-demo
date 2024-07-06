<template>
  <!--  <div class="border-t fixed bottom-0 left-0 right-0 z-50">-->
  <div class="md:hidden">
    <van-tabbar route>
      <van-tabbar-item to="/">
        <span>首页</span>
        <template #icon="props">
          <svg
              :class="props.active ?'stroke-blue-500':''"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            />
          </svg>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/competition">
        <span>竞赛</span>
        <template #icon="props">
          <svg
              :class="props.active ?'stroke-blue-500':''"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/dynamic">
        <span>动态</span>
        <template #icon="props">
          <svg
              :class="props.active ?'stroke-blue-500':''"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </template>
      </van-tabbar-item>
      <!--      <van-tabbar-item to="/chat">-->
      <!--        <span>好友</span>-->
      <!--        <template #icon="props">-->
      <!--          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"-->
      <!--               stroke="currentColor"-->
      <!--               :class="props.active ?'stroke-blue-500':''"-->
      <!--               class="h-5 h-5">-->
      <!--            <path stroke-linecap="round" stroke-linejoin="round"-->
      <!--                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"/>-->
      <!--          </svg>-->

      <!--        </template>-->
      <!--      </van-tabbar-item>-->
<!--      <van-tabbar-item to="/friends" v-if="notRead.count>99" icon="friends-o" dot>好友</van-tabbar-item>-->
<!--      <van-tabbar-item to="/friends" v-else-if="notRead.count>0" icon="friends-o" :badge="notRead.count">好友</van-tabbar-item>-->
<!--      <van-tabbar-item to="/friends" v-if="notRead.count<=0" icon="friends-o">好友</van-tabbar-item>-->
            <van-tabbar-item to="/friends" icon="friends-o">好友</van-tabbar-item>


      <van-tabbar-item to="/my_info">
        <span>我的</span>
        <template #icon="props">
          <svg
              :class="props.active ?'stroke-blue-500':''"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
  <!--  </div>-->
  <div class="hidden fixed bottom-2 left-0 right-0 lg:flex justify-center items-center z-50 space-x-0.5">
    <div class="text-gray-400">© 2024 飞翔原创 </div>
    <a class="hover:text-sky-500" href="http://beian.miit.gov.cn/" target="_blank"> 鲁ICP备2021xxxxxx号</a>
  </div>
</template>

<script lang="ts" setup>
import {reactive} from "vue";
import {useNotReadStore} from "../../stores/notRead";
const {notRead} = useNotReadStore()

const state = reactive({
  activeIndex: 0,
});

const clickTabBar = (index: number) => {
  state.activeIndex = index;
};


</script>

<style scoped>
</style>
