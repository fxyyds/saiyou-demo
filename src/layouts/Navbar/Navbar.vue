<template>
  <nav class="navbar bg-base-100">
    <div class="navbar-start w-4/5">
      <div class="btn btn-ghost btn-circle">
        <a>
          <!--          <svg-->
          <!--              aria-hidden="true"-->
          <!--              class="w-7"-->
          <!--              data-view-component="true"-->
          <!--              version="1.1"-->
          <!--              viewBox="0 0 16 16"-->
          <!--          >-->
          <!--            <path-->
          <!--                d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"-->
          <!--            ></path>-->
          <!--          </svg>-->
          <img class="w-8 h-8" :src="logo"/>
        </a>
      </div>
      <div @click="router.push('/')" class="btn btn-ghost">
        <router-link to="/" class="text-lg">首页</router-link>
      </div>
      <div @click="router.push('/competition')" class="btn btn-ghost">
        <router-link to="/competition" class="text-lg">竞赛</router-link>
      </div>
      <div @click="router.push('/dynamic')" class="btn duration-700 btn-ghost hidden md:flex">
        <router-link to="/dynamic" class="text-lg">动态</router-link>
      </div>
      <div @click="router.push('/friends')" class="btn btn-ghost duration-700 hidden md:flex">
        <router-link to="/friends" class="text-lg">好友</router-link>
      </div>
      <div @click="router.push('/product')" class="btn btn-ghost duration-700 hidden md:flex">
        <router-link to="/chat" class="text-lg">积分商城</router-link>
      </div>
      <div v-if="loginUser.userRole==='admin'" @click="router.push('/system')"
           class="btn btn-ghost duration-700">
        <router-link to="/competition" class="text-lg">管理页</router-link>
      </div>
    </div>
    <!--  navbar-lift-->
    <div class="navbar-end">
      <!--      <div class="btn btn-ghost btn-circle hidden md:flex">-->
      <!--        <svg-->
      <!--            class="h-5 w-5"-->
      <!--            fill="none"-->
      <!--            stroke="currentColor"-->
      <!--            viewBox="0 0 24 24"-->
      <!--            xmlns="http://www.w3.org/2000/svg"-->
      <!--        >-->
      <!--          <path-->
      <!--              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"-->
      <!--              stroke-linecap="round"-->
      <!--              stroke-linejoin="round"-->
      <!--              stroke-width="2"-->
      <!--          />-->
      <!--        </svg>-->
      <!--      </div>-->
      <div @click="router.push('/notice')" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
            />
          </svg>
          <van-badge v-if="notRead.count>99" dot>
            <div class="child"/>
          </van-badge>
          <van-badge v-else-if="notRead.count>0" :content="notRead.count">
            <div class="child"/>
          </van-badge>
          <van-badge v-if="notRead.count<=0">
            <div class="child"/>
          </van-badge>
          <!--          <span class="badge badge-xs badge-primary indicator-item"></span>-->
        </div>
      </div>
      <div class="hidden sm:flex">
        <div>
          <n-dropdown :options="data.options" @select="handleSelect">
            <div class="btn btn-ghost btn-circle avatar">
              <div class="w-8 rounded-full">
                <img
                    :src="loginUser.userAvatar?loginUser.userAvatar:avatar"
                />
              </div>
            </div>
          </n-dropdown>
        </div>
      </div>
    </div>
  </nav>
</template>
<script lang="ts" setup>
import type {Component} from 'vue'
import {h, reactive} from "vue";
import avatar from '../../assets/image/avatar.jpg'
import logo from '../../assets/image/logo.gif'

import {createDiscreteApi, NIcon} from 'naive-ui'
import {LogOutOutline as LogoutIcon, PersonCircleOutline as UserIcon} from '@vicons/ionicons5'
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "../../stores/user";
import {UserControllerService} from "../../services/saiyou-backend";
import {useNotReadStore} from "../../stores/notRead";

const userStore = useUserStore();
const {loginUser} = userStore
const {message} = createDiscreteApi(["message"])
const route = useRoute();
const router = useRouter();
const {notRead} = useNotReadStore()
const writeList = ['/my_info']
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, {}, {default: () => h(icon)})
  }
}
const open2 = () => {

};

const data = reactive({
  options: [
    {
      label: '个人信息',
      key: 'profile',
      icon: renderIcon(UserIcon)
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: renderIcon(LogoutIcon)
    }
  ]
})
const handleSelect = async (key: string | number) => {
  if (key === 'profile') {
    router.push('/my_info')
  }
  if (key === 'logout') {
    const res = await UserControllerService.userLogoutUsingPost()
    if (res.data && res.code === 0) {
      router.push('/login')
    }
  }
}
</script>
<style scoped>

</style>
