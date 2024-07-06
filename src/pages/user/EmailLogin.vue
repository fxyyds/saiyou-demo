<template>
  <div class="dowebok dwo text-gray-600">
    <div
        class="container absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-5 overflow-hidden"
    >
      <div class="relative max-w-md mx-auto">
        <div class="form relative z-20 p-8 bg-white shadow-lg">
          <h2 class="text-2xl text-center">邮箱登录</h2>
          <div class="flex flex-col gap-4 mt-7 mb-5">
            <div>
              <div>
                <label for="email">邮箱</label>
              </div>
              <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
                <input
                    v-model="data.emailLogin.emailAccount"
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
            <div class="flex items-end justify-between duration-700">
              <div class="flex-1">
                <div>
                  <label for="text">验证码</label>
                </div>
                <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
                  <input
                      v-model="data.emailLogin.captcha"
                      class="ipt w-full px-3 py-3"
                      type="text"
                      id="password"
                      placeholder="请输入验证码"
                  />
                  <div
                      class="ipt-line absolute left-0 top-0 w-full h-full pointer-events-none"
                  ></div>
                </div>
              </div>
              <button
                  @click="getCaptcha"
                  :disabled="data.countdown > 0"
                  class="btn-get-verification-code h-[46.39px] ml-4 py-2 px-4 rounded text-white bg-blue-500 hover:bg-blue-600"
              >
                {{ data.countdown > 0 ? data.countdown + 's' : '获取验证码' }}
              </button>
            </div>

            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <input class="mr-1" type="checkbox" id="remember"/>
                <label for="remember">记住我</label>
              </div>
              <div class="text-center"
              >没有账号？<a class="text-cyan-750 hover_text-cyan-850 cursor-pointer"
                           @click="toPath('/email/register')"
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
            <span class="mx-4">或者使用赛友账号登录</span>
            <span class="h-px flex-1 bg-gray-200"></span>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <a
                @click="toPath('/login')"
                class="col-span-2 flex justify-center items-center py-2 border border-solid border-cyan-750 rounded shadow hover:bg-gray-100"
                href="javascript:"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-4 h-4 mr-2">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"/>
              </svg>
              赛友账号
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
import {onMounted, onUnmounted, reactive} from "vue";
import one from '../../assets/image/1.svg'
import two from '../../assets/image/2.svg'
import qq from '../../assets/image/qq.svg'
import wb from '../../assets/image/weibo.svg'
import wx from '../../assets/image/wechat.svg'

import {useRoute, useRouter} from "vue-router";
import {createDiscreteApi} from 'naive-ui'
import {useUserStore} from "../../stores/user";
import {UserControllerService} from "../../services/saiyou-backend";
import {showSuccessToast} from "vant";
const route = useRoute();
const data = reactive({
  emailLogin: {
    captcha: "",
    emailAccount: ""
  },
  countdown: 0,
})
onMounted(() => {
  const storedCountdown = localStorage.getItem("countdown");
  if (storedCountdown && parseInt(storedCountdown) > 0) {
    data.countdown = parseInt(storedCountdown)
    const timer = setInterval(() => {
      data.countdown--;
      if (data.countdown === 0) {
        clearInterval(timer);
        // 清除本地存储中的倒计时值
        localStorage.removeItem("countdown");
      } else {
        // 更新本地存储中的倒计时值
        localStorage.setItem("countdown", data.countdown.toString());
      }
    }, 1000);
  }
})

const toPath = (path) => {
  localStorage.removeItem("emailCountdown");
  if (route.query.code) {
    router.push({path: path, query: {code: route.query.code}})
  }else {
    router.push(path)
  }
}

onUnmounted(() => {
  localStorage.removeItem("countdown");
});
const userStore = useUserStore();
const {message} = createDiscreteApi(["message"])
const router = useRouter();

const getCaptcha = async () => {
  if (!data.emailLogin.emailAccount) {
    message.error("邮箱不能为空！");
    return;
  }
  if (!validateEmail(data.emailLogin.emailAccount)) {
    message.error("邮箱格式错误！");
    return;
  }
  message.loading("验证码发送中！", {duration: 1000})
  const res = await UserControllerService.getCaptchaUsingGet(data.emailLogin.emailAccount);
  if (res.data && res.code === 0) {
    // 判断本地存储中是否存在倒计时的值
    if (data.countdown > 0) {
      return;
    }
    data.countdown = 60;
    const timer = setInterval(() => {
      data.countdown--;
      if (data.countdown === 0) {
        clearInterval(timer);
        // 清除本地存储中的倒计时值
        localStorage.removeItem("countdown");
      } else {
        // 更新本地存储中的倒计时值
        localStorage.setItem("countdown", data.countdown.toString());
      }
    }, 1000);
    message.success("验证码发送成功")
  }
};

const validateEmail = (email) => {
// 邮箱正则表达式
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
};

const login = async () => {
  const res = await UserControllerService.userEmailLoginUsingPost(data.emailLogin);
  if (res.data && res.code === 0) {
    showSuccessToast("欢迎回来")
    await router.push("/")
  }
}
const notSupported = (item) => {
  message.error("暂未支持" + item + "账号登录！")
}

const onSubmit = () => {
  if (!data.emailLogin.emailAccount) {
    message.error("邮箱不能为空！");
    return;
  }
  if (!data.emailLogin.captcha) {
    message.error("请输入验证码！");
    return;
  }
  if (!validateEmail(data.emailLogin.emailAccount)) {
    message.error("邮箱格式错误！");
    return;
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
