<template>
  <div class="dowebok dwo text-gray-600">
    <div
        class="container absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 pb-5 overflow-hidden"
    >
      <div class="relative max-w-md mx-auto">
        <div class="form relative z-20 p-8 bg-white shadow-lg">
          <h2 class="text-2xl text-center">账号注册</h2>
          <div class="flex flex-col gap-2 mt-7 mb-5">
            <div>
              <div>
                <label for="username">昵称</label>
              </div>
              <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
                <input
                    v-model="data.registerData.userName"
                    class="ipt w-full px-3 py-3"
                    type="text"
                    id="username"
                    placeholder="起个好听的名字吧"
                />
                <div
                    class="ipt-line absolute left-0 top-0 w-full h-full pointer-events-none"
                ></div>
              </div>
            </div>
            <div>
              <div>
                <label for="userAccount">账号</label>
              </div>
              <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
                <input
                    v-model="data.registerData.userAccount"
                    class="ipt w-full px-3 py-3"
                    type="text"
                    id="userAccount"
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
                    v-model="data.registerData.userPassword"
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
            <div>
              <div>
                <label for="password">确认密码</label>
              </div>
              <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
                <input
                    v-model="data.registerData.checkPassword"
                    class="ipt w-full px-3 py-3"
                    type="password"
                    id="password"
                    placeholder="请再次输入密码"
                />
                <div
                    class="ipt-line absolute left-0 top-0 w-full h-full pointer-events-none"
                ></div>
              </div>
            </div>
            <div>
              <div>
                <label for="invitationCode">邀请码 (可选)</label>
              </div>
              <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
                <input
                    v-model="data.registerData.invitationCode"
                    class="ipt w-full px-3 py-3"
                    type="text"
                    id="invitationCode"
                    placeholder="请输入邀请码"
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
              >已有账号？<a class="text-cyan-750 hover_text-cyan-850 cursor-pointer"
                           @click="toLogin"
              >立即登录</a
              ></div>
            </div>
            <button @click="onSubmit" class="btn-login w-full py-3 rounded text-white shadow-lg"
            >创建账号
            </button
            >
          </div>

          <div class="flex justify-center items-center mt-7 text-center">
            <span class="h-px flex-1 bg-gray-200"></span>
            <span class="mx-4">或者第三方账号注册</span>
            <span class="h-px flex-1 bg-gray-200"></span>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <a
                @click="toEmail"
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
import {onMounted, reactive} from "vue";
import one from '../../assets/image/1.svg'
import two from '../../assets/image/2.svg'
import qq from '../../assets/image/qq.svg'
import wx from '../../assets/image/wechat.svg'
import {useRoute, useRouter} from "vue-router";
import {showSuccessToast} from "vant";
import {UserControllerService} from "../../services/saiyou-backend";
import {createDiscreteApi} from 'naive-ui'
import {useUserStore} from "../../stores/user";

const userStore = useUserStore();
const {message} = createDiscreteApi(["message"])
const router = useRouter();
const route = useRoute()
const notSupported = (item) => {
  message.error("暂未支持" + item + "账号注册！")
}
const data = reactive({
  registerData: {
    userAccount: '',
    invitationCode: '',
    userName: '',
    checkPassword: '',
    userPassword: ""
  }
})
const toLogin = () => {
  if (route.query.code) {
    router.push({path: '/login', query: {code: route.query.code}})
  }else {
    router.push('/login')
  }
}

const toEmail = () => {
  if (route.query.code) {
    router.push({path: '/email/register', query: {code: route.query.code}})
  }else {
    router.push('/email/register')
  }
}
const onSubmit = async () => {
  if (!data.registerData.userAccount || !data.registerData.userPassword) {
    message.error("账号或密码不能为空")
    return
  }
  if (!data.registerData.checkPassword) {
    message.error("账号或密码不能为空")
    return
  }
  const res = await UserControllerService.userRegisterUsingPost(data.registerData)
  if (res.data && res.code === 0) {
    showSuccessToast("注册成功")
    await router.push("/login")
  }
};

onMounted(() => {
  if (route.query.code) {
    data.registerData.invitationCode = route.query.code
  }
})

</script>

<style scoped>
@import './index.css';
</style>
