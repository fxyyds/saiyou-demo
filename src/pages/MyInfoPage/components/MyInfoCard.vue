<template>
  <div
      class="bg-gray-100 rounded-lg p-2 pb-5 mt-3 mx-4 shadow"
  >
    <div class="flex justify-between">
      <div>
        <div class="mt-2 ml-3 flex space-x-1 items-center">
          <van-uploader
              :before-read="beforeRead"
              max-count="1" reupload
              :after-read="afterRead"
              v-model="data.fileList"
              :deletable="false"
          />
          <div class="flex flex-col">
            <div :class="props.user.userName&&props.user.userName.length>6?'':'text-xl'"
                 class="py-1 font-bold">{{
                props.user.userName ? props.user.userName : "赛友-" + generateRandomString()
              }}
            </div>
            <span class="text-sm text-gray-400">赛友号: {{ props.user.userAccount }}</span>
            <div class="flex items-center space-x-0.5">
              <div>
                <svg t="1707043747964" class="icon w-5 h-5 stroke-1" viewBox="0 0 1024 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="6984">
                  <path
                      d="M512 904.9088c-104.96 0-203.5712-40.8576-277.8112-115.0976S119.0912 616.96 119.0912 512s40.8576-203.5712 115.0976-277.8112S407.04 119.0912 512 119.0912s203.5712 40.8576 277.8112 115.0976S904.9088 407.04 904.9088 512s-40.8576 203.5712-115.0976 277.8112S616.96 904.9088 512 904.9088z m0-736.768c-91.8528 0-178.176 35.7376-243.0976 100.7616-65.024 64.9216-100.7616 151.2448-100.7616 243.0976s35.7376 178.176 100.7616 243.0976c64.9216 64.9216 151.3472 100.7616 243.0976 100.7616s178.176-35.7376 243.0976-100.7616c64.9216-64.9216 100.7616-151.3472 100.7616-243.0976s-35.7376-178.176-100.7616-243.0976C690.176 203.8784 603.8528 168.1408 512 168.1408z"
                      p-id="6985"></path>
                  <path
                      d="M625.3568 704.512c-5.8368 0-11.6736-1.4336-17.1008-4.3008l-97.28-51.0976-97.28 51.0976c-12.4928 6.5536-27.3408 5.5296-38.7072-2.7648-11.3664-8.2944-16.9984-22.1184-14.6432-35.9424L378.88 553.1648l-78.6432-76.6976c-10.1376-9.8304-13.7216-24.2688-9.3184-37.6832 4.4032-13.4144 15.7696-23.04 29.696-24.9856l108.6464-15.7696 48.64-98.5088c6.2464-12.6976 18.8416-20.48 32.9728-20.48 14.1312 0 26.7264 7.8848 32.9728 20.48l48.64 98.5088 108.6464 15.7696c13.9264 2.048 25.3952 11.5712 29.696 25.088 4.4032 13.4144 0.8192 27.8528-9.3184 37.6832l-78.6432 76.6976L661.504 661.504c2.3552 13.9264-3.1744 27.648-14.6432 35.9424-6.3488 4.7104-13.9264 7.0656-21.504 7.0656zM352.256 458.752l65.4336 63.7952c8.704 8.4992 12.5952 20.5824 10.5472 32.5632l-15.4624 90.112 80.9984-42.496c10.752-5.632 23.552-5.632 34.2016 0l80.9984 42.496-15.4624-90.112c-2.048-11.9808 1.9456-24.064 10.5472-32.5632l65.4336-63.7952-90.5216-13.1072c-11.9808-1.7408-22.3232-9.216-27.7504-20.0704L510.976 343.552l-40.448 82.0224c-5.3248 10.8544-15.6672 18.432-27.7504 20.1728L352.256 458.752z m147.6608-137.5232z"
                      p-id="6986"></path>
                </svg>
              </div>
              <div class="text-sm font-normal">{{ props.user.userCoin }}</div>
            </div>
          </div>
        </div>
        <span class="text-xs ml-3 mt-3 text-gray-400 flex space-x-1 items-center">
          <div>
           <svg t="1707037146105" class="icon min-w-4 min-h-4 w-4 h-4 stroke-1 self-start"
                viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="9287"><path
               d="M417.1 289.8c-17.6 0-31.9 14.4-31.9 31.9 0 17.6 14.4 31.9 31.9 31.9h191.5c17.6 0 31.9-14.4 31.9-31.9 0-17.6-14.4-31.9-31.9-31.9H417.1z"
               p-id="9288"></path><path
               d="M800.2 545.1c17.6 0 31.9-14.3 31.9-31.9V182.9c0-46.8-35.7-84.7-79.8-84.7H273.5c-44.1 0-79.8 37.9-79.8 84.7v660.5c0 67.6 71 108 124.1 70.5L513 719.4l195 194.5c53 37.5 124.1-2.8 124.1-70.5V704.8c0-17.6-14.3-31.9-31.9-31.9-17.6 0-31.9 14.3-31.9 31.9v138.6c0 14.3-9.7 21-16.2 21-1 0-2.3-0.1-4.1-0.9L558 674.1c-12.5-12.4-28.8-18.6-45.1-18.6s-32.6 6.2-45.1 18.6l-190 189.4c-1.8 0.8-3.2 0.9-4.2 0.9-3.4 0-7.2-1.8-10.2-4.8-2.7-2.8-6-7.8-6-16.2V182.9c0-11.3 7.3-20.9 16-20.9h478.8c8.7 0 16 9.6 16 20.9v330.3c0.1 17.7 14.4 31.9 32 31.9z"
               p-id="9289"></path></svg>
          </div>

          <div>{{
              props.user.userProfile ? props.user.userProfile && props.user.userProfile.length < 24 ? props.user.userProfile : props.user.userProfile.slice(0, 24) + '...' : props.user.id === loginUser.id ? '还未设置标签哦~' : 'Ta还未设置标签哦~'
            }}</div>
              </span>
      </div>
      <div class="flex flex-col items-center justify-between">
        <div v-if="props.user.id === loginUser.id" class="mt-2" @click="setUp">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5 stroke-1">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
        </div>
        <div v-else>
          <n-dropdown
              @select="handleSelect"
              trigger="hover" :options="options(props.user)">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5 stroke-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
            </div>
          </n-dropdown>
        </div>
      </div>
    </div>
  </div>
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
  <van-dialog v-model:show="exit" title="修改备注" @confirm="remark" show-cancel-button>
    <div>
      <van-field
          maxlength="30"
          show-word-limit
          rows="2"
          center
          clearable
          v-model="data.remark"
          placeholder="给对方起个好听的备注吧~"
      />
    </div>
  </van-dialog>
</template>

<script setup lang="ts">
import avatar from '../../../assets/image/avatar.jpg'
import {Component, defineProps, h, reactive, ref, watchEffect} from "vue";
import {useRouter} from "vue-router";
import {showConfirmDialog, showFailToast} from "vant";
import {
  FileControllerService,
  FriendsApplyControllerService,
  FriendsControllerService,
  UserControllerService
} from "../../../services/saiyou-backend";
import {generateRandomString} from "../../../utlis/textUtils";
import {useUserStore} from "../../../stores/user";
import {NIcon} from "naive-ui";
import {Add, CreateOutline, TrashOutline} from "@vicons/ionicons5";
import {message} from "ant-design-vue";

const {loginUser} = useUserStore();
const router = useRouter();

const props = defineProps({
  user: {}
})

const data = reactive({
  fileList: [],
  user: {},
  remark: props.user.userName,
  apply: {
    remark: loginUser.userName ? "我是" + loginUser.userName : "我是" + loginUser.userAccount
  }
})
watchEffect(async () => {
  data.fileList = [{url: props.user.userAvatar ? props.user.userAvatar : avatar}]
})
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
    data.fileList = [{url: props.user.userAvatar ? props.user.userAvatar : avatar}]
  }
};


const active = ref(false)
const setUp = () => {
  router.push("/set_up")
  // emits("setUp", true)
}

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const remark = async () => {
  const res = await FriendsControllerService.updateFriendRemarkUsingPost({
    remark: data.remark,
    id: props.user.id
  })
  if (res.data && res.code === 0) {
    message.success("更新成功")
    props.user.userName = data.remark
    exit.value = false
  }
}

const options = (item) => {
  let options = []

  if (item.friend) {
    options.push({
      label: '修改备注',
      key: 'exit',
      icon: renderIcon(CreateOutline)
    })
    options.push({
      label: '删除好友',
      key: 'delete',
      icon: renderIcon(TrashOutline)
    })
  } else {
    options.push({
      label: '添加好友',
      key: 'add',
      icon: renderIcon(Add)
    })
  }

  return options
}
const apply = async () => {
  const res = await FriendsApplyControllerService.applyFriendUsingPost({
    remark: data.apply.remark,
    receiveId: props.user.id
  })
  if (res.data && res.code === 0) {
    message.success("申请成功")
    add.value = false
  }
}
const add = ref(false)
const exit = ref(false)

const handleSelect = (key: string | number) => {
  if (key === 'delete') {
    showConfirmDialog({
      title: '删除好友',
      message: '删除好友后你和对方将在好友列表中移除'
    }).then(async () => {
      const res = await FriendsControllerService.deleteFriendUsingPost(props.user.id)
      if (res.data && res.code === 0) {
        message.success("删除好友成功")
        props.user.friend = false
      }
    }).catch(() => {
      // on cancel
    });
  }
  if (key === 'add') {
    add.value = true
  }
  if (key === 'exit') {
    exit.value = true
  }
}

</script>

<style scoped>
/deep/ .van-image__img, .van-image__error, .van-image__loading {
  border-radius: 9999px;
}


/deep/ .van-uploader__preview-image {
  height: 5rem;
  width: 5rem;
  border: 2px solid white;
  border-radius: 9999px
}
</style>
