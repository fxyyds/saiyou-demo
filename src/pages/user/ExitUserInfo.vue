<template>
  <div class="mt-2 mx-2">
    <van-cell-group>
      <van-cell>
        <div class="items-center justify-between flex">
          <div class="text-black">头像</div>
          <div justify="space-between" class="flex items-center justify-end">
            <van-uploader
                :before-read="beforeRead"
                max-count="1" reupload
                :after-read="afterRead"
                v-model="data.fileList"
                :deletable="false"
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
        </div>
      </van-cell>
      <van-cell @click="userNameShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">昵称</div>
          <div class="flex items-center justify-end">
            <div>{{ loginUser.userName }}</div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </div>

          </div>
        </div>
      </van-cell>
      <van-cell @click="userEmailShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">邮箱</div>
          <div class="flex items-center justify-end">
            <div>{{ loginUser.email ? loginUser.email : '暂未绑定' }}</div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </div>
          </div>
        </div>
      </van-cell>
      <van-cell @click="userProfileShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">个性签名</div>
          <div class="flex items-center justify-end">
            <div>
              {{
                loginUser.userProfile ? loginUser.userProfile && loginUser.userProfile.length < 12 ? loginUser.userProfile : loginUser.userProfile.slice(0, 12) + '...' : '还未设置个性签名哦~'
              }}
            </div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </div>

          </div>
        </div>
      </van-cell>
      <van-cell @click="passwordShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">更新密码</div>
          <div class="flex items-center justify-end">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </div>

          </div>
        </div>
      </van-cell>

    </van-cell-group>
  </div>
  <van-dialog v-model:show="passwordShow" title="修改密码" @confirm="updatePassword" show-cancel-button>
    <div>
      <van-field
          center
          clearable
          v-model="data.updatePassword.oldPassword"
          placeholder="请输入旧密码"
      />
      <van-field
          center
          clearable
          v-model="data.updatePassword.password"
          placeholder="请输入新密码"
      />
    </div>
  </van-dialog>
  <van-dialog v-model:show="userNameShow" title="修改昵称" @confirm="updateUserName" show-cancel-button>
    <div>
      <van-field
          maxlength="15"
          show-word-limit
          rows="1"
          center
          clearable
          v-model="data.user.userName"
          placeholder="起个好听的昵称吧~"
      />
    </div>
  </van-dialog>
  <van-dialog v-model:show="userProfileShow" title="个性签名" @confirm="updateUserProfile" show-cancel-button>
    <div>
      <van-field
          v-model="data.user.userProfile"
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

  <van-dialog width="75%" v-model:show="userEmailShow" title="更新邮箱" @confirm="onSubmit" show-cancel-button>
    <div class="p-2">
      <div class="mb-3 flex items-center justify-between">
        <div>是否解绑邮箱:</div>
        <van-switch v-model="checked"/>
      </div>


      <div>
        <div>
          <label for="email">邮箱:</label>
        </div>
        <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
          <input
              v-model="data.emailRegister.emailAccount"
              class="ipt w-full px-3 py-3"
              type="text"
              id="email"
              placeholder="请输入邮箱账号"
          />
          <div
              class="ipt-line absolute left-0 top-0 w-full h-full pointer-events-none"
          ></div>
        </div>
      </div>
      <div class="flex items-end justify-between duration-700">
        <div class="flex-1">
          <div>
            <label for="text">验证码:</label>
          </div>
          <div class="ipt-wrap relative mt-1 rounded overflow-hidden">
            <input
                v-model="data.emailRegister.captcha"
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
    </div>
  </van-dialog>
</template>

<script setup lang="ts">
import {useUserStore} from "../../stores/user";
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import avatar from "../../assets/image/avatar.jpg";
import {showFailToast, showSuccessToast} from "vant";
import {FileControllerService, UserControllerService} from "../../services/saiyou-backend";
import {createDiscreteApi} from "naive-ui";

const sms = ref()
const userProfileShow = ref(false);
const passwordShow = ref(false);
const userNameShow = ref(false);
const userEmailShow = ref(false)
const router = useRouter();
const userStore = useUserStore();
const {loginUser} = userStore
const {message} = createDiscreteApi(["message"])
const checked = ref(false)
const data = reactive({
  fileList: [{url: loginUser.userAvatar ? loginUser.userAvatar : avatar}],
  user: {
    userName: "",
    userProfile: ''
  },
  countdown: 0,
  emailRegister: {
    captcha: "",
    emailAccount: "",
    invitationCode: "",
    userName: ""
  },
  updatePassword: {
    password: "",
    oldPassword: ""
  }
})

const updatePassword = async () => {
  const res = await UserControllerService.updateUserPasswordUsingPost({
    id: loginUser.id,
    password: data.updatePassword.password,
    oldPassword: data.updatePassword.oldPassword
  })
  if (res.data && res.code === 0) {
    showSuccessToast("更新成功")
    await UserControllerService.userLogoutUsingPost()
    router.push('/login')
  }
}


const getCaptcha = async () => {
  if (!data.emailRegister.emailAccount) {
    message.error("邮箱不能为空！");
    return;
  }
  if (!validateEmail(data.emailRegister.emailAccount)) {
    message.error("邮箱格式错误！");
    return;
  }
  message.loading("验证码发送中！", {duration: 1000})
  const res = await UserControllerService.getCaptchaUsingGet(data.emailRegister.emailAccount);
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
        localStorage.removeItem("emailExitCountdown");
      } else {
        // 更新本地存储中的倒计时值
        localStorage.setItem("emailExitCountdown", data.countdown.toString());
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


const userBindEmail = async () => {
  const res = await UserControllerService.userBindEmailUsingPost({
    emailAccount: data.emailRegister.emailAccount,
    captcha: data.emailRegister.captcha
  })
  if (res.data && res.code === 0) {
    showSuccessToast("绑定成功")
    loginUser.email = data.emailRegister.emailAccount
  }
}

const userUnBindEmail = async () => {
  const res = await UserControllerService.userUnBindEmailUsingPost({
    emailAccount: data.emailRegister.emailAccount,
    captcha: data.emailRegister.captcha
  })
  if (res.data && res.code === 0) {
    showSuccessToast("解绑成功")
    loginUser.email = ""
  }
}
const onSubmit = () => {
  if (!data.emailRegister.emailAccount) {
    message.error("邮箱不能为空！");
    return;
  }
  if (!data.emailRegister.captcha) {
    message.error("请输入验证码！");
    return;
  }
  if (!validateEmail(data.emailRegister.emailAccount)) {
    message.error("邮箱格式错误！");
    return;
  }
  if (checked.value) {
    userUnBindEmail()
  } else {
    userBindEmail()
  }
};

const update = async (userName, userProfile) => {
  const res = await UserControllerService.updateMyUserUsingPost({userName: userName, userProfile: userProfile});
  if (res.code === 0 && res.data) {
    if (userName) {
      loginUser.userName = userName
    }
    if (userProfile) {
      loginUser.userProfile = userProfile
    }
    showSuccessToast("更新成功")
  }
}
const updateUserProfile = () => {
  update(null, data.user.userProfile)
}
const updateUserName = () => {
  update(data.user.userName, null)
}
const unloadFileTypeList = ["image/jpeg", "image/jpg", "image/svg", "image/png", "image/webp", "image/jfif"]

const beforeRead = async (file) => {
  const fileType = unloadFileTypeList.includes(file.type)
  if (!fileType) {
    showFailToast('图片类型有误,请上传jpg/png/svg/jpeg/webp格式!');
    return false
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    showFailToast('文件大小不能超过 2M !');
    return false
  }
  return file
};

const afterRead = async (file) => {
  const res = await FileControllerService.uploadFileUsingPost(file.file, "user_avatar")
  if (res.data && res.code === 0) {
    const data = await UserControllerService.updateMyUserUsingPost({userAvatar: res.data});
    if (data.code === 0 && data.data) {
      data.fileList = [{url: res.data}]
      return true
    }
  } else {
    data.fileList = [{url: loginUser.userAvatar ? loginUser.userAvatar : avatar}]
  }
};

</script>

<style scoped>
/deep/ .van-image__img, .van-image__error, .van-image__loading {
  border-radius: 9999px;
}

/deep/ .van-uploader__preview-image {
  height: 3.5rem;
  width: 3.5rem;
}

</style>
