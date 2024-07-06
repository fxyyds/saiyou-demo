<template>
  <div class="mt-2">
    <van-cell-group>
      <van-cell to="/user/exit" is-link>
        <template #title>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 stroke-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
            </svg>

            <span class="custom-title">&nbsp;个人资料</span>
          </div>
        </template>
      </van-cell>
      <van-cell @click="onCopy" :value="loginUser.invitationCode" is-link>
        <template #title>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"  class="w-5 h-5 stroke-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"/>
            </svg>
            <span class="custom-title">&nbsp;邀请码</span>
          </div>
        </template>
      </van-cell>
      <van-cell :value="loginUser.userCoin" is-link>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="flex items-center">
            <svg t="1707043747964" class="icon w-5 h-5 stroke-1" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg" p-id="6984">
              <path
                  d="M512 904.9088c-104.96 0-203.5712-40.8576-277.8112-115.0976S119.0912 616.96 119.0912 512s40.8576-203.5712 115.0976-277.8112S407.04 119.0912 512 119.0912s203.5712 40.8576 277.8112 115.0976S904.9088 407.04 904.9088 512s-40.8576 203.5712-115.0976 277.8112S616.96 904.9088 512 904.9088z m0-736.768c-91.8528 0-178.176 35.7376-243.0976 100.7616-65.024 64.9216-100.7616 151.2448-100.7616 243.0976s35.7376 178.176 100.7616 243.0976c64.9216 64.9216 151.3472 100.7616 243.0976 100.7616s178.176-35.7376 243.0976-100.7616c64.9216-64.9216 100.7616-151.3472 100.7616-243.0976s-35.7376-178.176-100.7616-243.0976C690.176 203.8784 603.8528 168.1408 512 168.1408z"
                  p-id="6985"></path>
              <path
                  d="M625.3568 704.512c-5.8368 0-11.6736-1.4336-17.1008-4.3008l-97.28-51.0976-97.28 51.0976c-12.4928 6.5536-27.3408 5.5296-38.7072-2.7648-11.3664-8.2944-16.9984-22.1184-14.6432-35.9424L378.88 553.1648l-78.6432-76.6976c-10.1376-9.8304-13.7216-24.2688-9.3184-37.6832 4.4032-13.4144 15.7696-23.04 29.696-24.9856l108.6464-15.7696 48.64-98.5088c6.2464-12.6976 18.8416-20.48 32.9728-20.48 14.1312 0 26.7264 7.8848 32.9728 20.48l48.64 98.5088 108.6464 15.7696c13.9264 2.048 25.3952 11.5712 29.696 25.088 4.4032 13.4144 0.8192 27.8528-9.3184 37.6832l-78.6432 76.6976L661.504 661.504c2.3552 13.9264-3.1744 27.648-14.6432 35.9424-6.3488 4.7104-13.9264 7.0656-21.504 7.0656zM352.256 458.752l65.4336 63.7952c8.704 8.4992 12.5952 20.5824 10.5472 32.5632l-15.4624 90.112 80.9984-42.496c10.752-5.632 23.552-5.632 34.2016 0l80.9984 42.496-15.4624-90.112c-2.048-11.9808 1.9456-24.064 10.5472-32.5632l65.4336-63.7952-90.5216-13.1072c-11.9808-1.7408-22.3232-9.216-27.7504-20.0704L510.976 343.552l-40.448 82.0224c-5.3248 10.8544-15.6672 18.432-27.7504 20.1728L352.256 458.752z m147.6608-137.5232z"
                  p-id="6986"></path>
            </svg>
            <span class="custom-title">&nbsp;我的积分</span>
          </div>
        </template>
      </van-cell>
      <van-cell @click="logout" is-link>
        <template #title>
          <div class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5 stroke-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"/>
            </svg>
            <span class="custom-title">&nbsp;退出登录</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "../../stores/user";
import {UserControllerService} from "../../services/saiyou-backend";
import {useRouter} from "vue-router";
import {message} from "ant-design-vue";
const userStore = useUserStore();
const {loginUser} = userStore
let path = window.location.origin + '/register?code=' + loginUser.invitationCode

const router = useRouter();
const onCopy = () => {
  navigator.clipboard.writeText(path).then(() => {
    message.success("复制成功~")
  })
}


const logout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.data && res.code === 0) {
    await router.push("/login")
  }
}
</script>

<style scoped>

</style>
