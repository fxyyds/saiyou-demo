<template>
  <div class="dowebok dwo text-gray-600">
    <div
        class="container absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-5 overflow-hidden"
    >
      <div class="relative max-w-md mx-auto">
        <div class="form relative z-20 p-8 bg-white shadow-lg">
          <h2 class="text-2xl text-center">用户登录</h2>
          <div class="flex flex-col gap-4 mt-7 mb-5">
            <div>
              <div>
                <label for="email">账号</label>
              </div>
              <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
                <input
                    v-model="userAccount"
                    class="ipt w-full px-3 py-3"
                    type="text"
                    id="email"
                    placeholder="请输入账号"
                />
                <div
                    class="ipt-line absolute left-0 top-0 w-full h-full pointer-events-none"
                ></div>
              </div>
            </div>
            <div>
              <div>
                <label for="password">密码</label>
              </div>
              <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
                <input
                    v-model="password"
                    class="ipt w-full px-3 py-3"
                    type="password"
                    id="password"
                    placeholder="请输入密码"
                />
                <div
                    class="ipt-line absolute left-0 top-0 w-full h-full pointer-events-none"
                ></div>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <input class="mr-1" type="checkbox" id="remember"/>
                <label for="remember">记住我</label>
              </div>
              <div class="text-center"
              >没有账号？<a class="text-cyan-750 hover_text-cyan-850 cursor-pointer"
                           @click="toRegister"
              >立即注册</a
              ></div>
            </div>
            <button @click="onSubmit" class="btn-login w-full py-3 rounded text-white shadow-lg"
            >登 录
            </button
            >
          </div>
          <div class="flex justify-center items-center mt-7 text-center">
            <span class="h-px flex-1 bg-gray-200"></span>
            <span class="mx-4">或者使用第三方登录</span>
            <span class="h-px flex-1 bg-gray-200"></span>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <a
                @click="router.push('/email/login')"
                class="col-span-2 flex justify-center items-center py-2 border border-solid border-cyan-750 rounded shadow hover:bg-gray-100"
                href="javascript:"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
              </svg>
              邮箱
            </a>
            <a
                @click="notSupported('微信')"
                class="flex justify-center items-center py-2 border border-solid border-cyan-750 rounded shadow hover:bg-gray-100"
                href="javascript:"
            >
              <img class="w-4 h-4 mr-2" :src="wx" alt=""/>微信
            </a>
            <a
                @click="notSupported('QQ')"
                class="flex justify-center items-center py-2 border border-solid border-cyan-750 rounded shadow hover:bg-gray-100"
                href="javascript:"
            >
              <img class="w-4 h-4 mr-1" :src="qq" alt=""/>QQ
            </a>
          </div>
        </div>
        <img class="hidden md:block duration-500 lg-bg-1 absolute z-10" :src="one" alt=""/>
        <img class="hidden md:block duration-500 lg-bg-2 absolute z-10" :src="two" alt=""/>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import one from '../../assets/image/1.svg'
import two from '../../assets/image/2.svg'
import qq from '../../assets/image/qq.svg'
import wx from '../../assets/image/wechat.svg'

import {useRoute, useRouter} from "vue-router";
import {createDiscreteApi} from 'naive-ui'
import {showSuccessToast} from "vant";
import {useUserStore} from "../../stores/user";

const userStore = useUserStore();
const {message} = createDiscreteApi(["message"])
const router = useRouter();
const route = useRoute();
const userAccount = ref('');
const password = ref('');
const isSelected = ref(false)
onMounted(() => {
  userAccount.value = ""
  password.value = ""

})
const select = () => {
  isSelected.value = !isSelected.value
}
const toRegister = () => {
  if (route.query.code) {
    router.push({path: '/register', query: {code: route.query.code}})
  }else {
    router.push('/register')
  }
}

const login = async () => {
  const res = await userStore.login(userAccount.value, password.value);
  if (res.data && res.code === 0) {
    showSuccessToast("欢迎回来")
    await router.push("/")
  }
}
const notSupported = (item) => {
  message.error("暂未支持" + item + "账号登录！")
}

const onSubmit = () => {
  if (!userAccount.value || !password.value) {
    message.error("账号或密码不能为空")
    return
  }
  login()
};
</script>

<style scoped>
@import './index.css';

.card-tabs .n-tabs-nav--bar-type {
  padding-left: 4px;
}

</style>
