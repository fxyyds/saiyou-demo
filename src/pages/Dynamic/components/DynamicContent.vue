<template>
  <div>
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-2">
        <div>
          <img class="w-12 h-12 rounded-full"
               :src="props.dynamic.user?.userAvatar?props.dynamic.user?.userAvatar:avatar"
               v-lazy="props.dynamic.user?.userAvatar?props.dynamic.user?.userAvatar:avatar"
          >
        </div>
        <div>
          <div class="text-md">{{ props.dynamic.user?.userName }}</div>
          <div class="text-gray-500 text-xs flex space-x-2">
            <p class="text-xs text-gray-400">{{ timeDescription }}推荐</p>
            <p v-if="props.dynamic.viewNum&&props.dynamic.viewNum>0">{{ props.dynamic.viewNum }} 浏览</p>
          </div>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div v-if="props.dynamic.user.id !==loginUser.id && !props.dynamic.user.friend"
             @click="toApply(props.dynamic.user)" class="text-sky-500 bg-gray-100 text-xs rounded-full px-3 py-1">添加
        </div>
        <div v-if="props.dynamic.user.id ===loginUser.id || loginUser.userRole==='admin'">
          <n-dropdown
              @select="handleSelect"
              trigger="hover" :options="options(props.dynamic)">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5 stroke-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"/>
              </svg>
            </div>
          </n-dropdown>
        </div>
      </div>
    </div>
    <div class="flex justify-start">
      <div class="w-14"></div>
      <div class="flex-1">
        <div>
          <div class="text-sm mt-1 whitespace-pre-wrap" @click="router.push('/dynamic/'+props.dynamic.id)">
            <n-ellipsis :line-clamp="10">
              {{ props.dynamic.content }}
            </n-ellipsis>
          </div>
          <div class="mt-2 flex flex-wrap gap-2">
            <n-image
                v-for="item in props.dynamic.imgList"
                style="max-width: 100px;max-height: 100px"
                width="80"
                lazy
                :src="item"
            />
          </div>

          <!--         <div class="grid mt-1 duration-500 grid-rows-1 grid-cols-3 md:grid-cols-5 lg:grid-cols-12 gap-1">-->
          <!--&lt;!&ndash;            <img v-for="item in props.dynamic.imgList" style="image-rendering: -webkit-optimize-contrast;min-height: 160px ;"class="rounded-lg" :src="item" :lazy="item">&ndash;&gt;-->
          <!--        -->
          <!--          </div>-->
          <div class="mt-3 flex justify-between items-center">
            <div @click="doShare(props.dynamic)" class="flex space-x-1">
              <svg t="1707041327172" class="icon w-5 h-5 stroke-1" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="5130">
                <path
                    d="M480 64a32 32 0 0 1 0 64H192a64 64 0 0 0-64 64v640a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V544a32 32 0 1 1 64 0V832a128 128 0 0 1-128 128H192a128 128 0 0 1-128-128V192a128 128 0 0 1 128-128h288zM832 64a128 128 0 0 1 128 128v160a32 32 0 1 1-64 0V192c0-5.248-0.64-10.368-1.856-15.232l-423.04 422.592a32 32 0 1 1-45.248-45.248l423.936-423.616A64 64 0 0 0 832 128h-160a32 32 0 1 1 0-64H832z"
                    fill="#666666" p-id="5131"></path>
              </svg>
              <div v-if="props.dynamic.shareNum && props.dynamic.shareNum>0" class="text-sm text-gray-400">
                {{ props.dynamic.shareNum }}</div>
            </div>
            <div class="flex space-x-4">
              <div class="flex space-x-0.5" @click="doThumb(props.dynamic)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-5 h-5"
                     :class="props.dynamic.hasThumb?'fill-red-600 stroke-0':''">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                </svg>
                <p v-if="props.dynamic.thumbNum && props.dynamic.thumbNum>0" class="text-sm text-gray-400">
                  {{ props.dynamic.thumbNum }}</p>
              </div>
              <div class="flex space-x-0.5" @click="doFavour(props.dynamic)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-5 h-5"
                     :class="props.dynamic.hasFavour?'fill-red-600 stroke-0':''"
                >
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                </svg>
                <p v-if="props.dynamic.favourNum && props.dynamic.favourNum>0" class="text-sm text-gray-400">
                  {{ props.dynamic.favourNum }}</p>
              </div>
              <div class="flex space-x-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor" class="w-5 h-5 stroke-1"
                >
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"/>
                </svg>
                <!--                todo-->
                <p v-if="props.dynamic.commentNum && props.dynamic.commentNum>0" class="text-sm text-gray-400">
                  {{ props.dynamic.commentNum }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-dialog v-model:show="share" :close-on-click-overlay="true" :show-confirm-button="false">
      <div class="bg-white p-6 rounded shadow-md">
        <div class="flex flex-col items-center justify-center">
          <div class="text-gray-400 text-sm">快邀请好友来看看吧~</div>
          <QrCode
              :value="path"
              :size="280"
              :margin="5"
              level="H"
          />
          <div class="flex items-center justify-between space-x-2">
            <div class="border py-1 rounded pl-2 ">
              <input
                  class="cursor-not-allowed text-gray-400 text-sm"
                  disabled
                  :value="path && path.length<20?path:path.slice(0,20)+'...'"
                  type="text"
              />
            </div>
            <div>
              <button
                  @click="onCopy"
                  class="flex-1 btn-get-verification-code px-3 py-1 rounded text-white bg-blue-500 hover:bg-blue-600"
              >复制链接
              </button>
            </div>
          </div>
        </div>
      </div>
    </van-dialog>
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

  </div>
</template>

<script setup lang="ts">
import {Component, defineEmits, defineProps, h, onMounted, reactive, ref, withDefaults} from "vue";
import {getTimeDescription} from "../../../utlis/timeUtlis";
import avatar from '../../../assets/image/avatar.jpg'
import {
  FriendsApplyControllerService,
  PostControllerService,
  PostFavourControllerService,
  PostThumbControllerService,
  PostVO
} from "../../../services/saiyou-backend";
import {useUserStore} from "../../../stores/user";
import {useRouter} from "vue-router";
import {createDiscreteApi, NIcon} from "naive-ui";
import QrCode from 'qrcode.vue'
import {CloseOutline, TrashOutline} from "@vicons/ionicons5";
import {showConfirmDialog} from "vant";

const userStore = useUserStore();
const {loginUser} = userStore
const timeDescription = ref('刚刚');
const router = useRouter();
const share = ref(false)

interface Props {
  dynamic: PostVO
}
const data=reactive({
  apply: {
    id: 0,
    remark: loginUser.userName ? "我是" + loginUser.userName : "我是" + loginUser.userAccount
  },
})

const toApply = (item) => {
  data.apply.id = item.id
  add.value = true
}
const apply = async () => {
  const res = await FriendsApplyControllerService.applyFriendUsingPost({
    remark: data.apply.remark,
    receiveId:  data.apply.id
  })
  if (res.data && res.code === 0) {
    message.success("申请成功")
    add.value = false
  }
}
const add = ref(false)
const doFavour = async (item) => {
  const res = await PostFavourControllerService.doPostFavourUsingPost({postId: item.id})
  if (res.data && res.code === 0) {
    item.hasFavour = res.data === 1
    item.favourNum = res.data === 1 ? item.favourNum + 1 : item.favourNum - 1
  }
}
const emit = defineEmits(["deleteResult", 'offlineResult']);

const doThumb = async (item) => {
  const res = await PostThumbControllerService.doThumbUsingPost({postId: item.id})
  if (res.data && res.code === 0) {
    item.hasThumb = res.data === 1
    item.thumbNum = res.data === 1 ? item.thumbNum + 1 : item.thumbNum - 1
  }
}
const props = withDefaults(defineProps<Props>(), {
  dynamic: {},
});
const {message} = createDiscreteApi(["message"])

let path = window.location.href + '?&code=' + loginUser.invitationCode

const onCopy = () => {
  navigator.clipboard.writeText(path).then(() => {
    message.success("复制成功")
  })
}
const doShare = async (item) => {
  path = window.location.href + '/'+item.id + '?&code=' + loginUser.invitationCode
  const res = await PostControllerService.postShareUsingGet(item.id)
  if (res.data && res.code === 0) {
    item.shareNum = item.shareNum + 1
    share.value = true
  }
}

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const offline = async () => {
  const res = await PostControllerService.offlinePostUsingPost({id: props.dynamic.id})
  if (res.data && res.code === 0) {
    emit("offlineResult", props.dynamic.id);
  }
}

const options = (item) => {
  let options = []
  if (loginUser.userRole === 'admin') {
    if (props.dynamic.status === 0) {
      options.push({
        label: '下架贴文',
        key: 'offline',
        icon: renderIcon(CloseOutline)
      })
    }
    // if (props.dynamic.status === 1) {
    //   options.push({
    //     label: '上架贴文',
    //     key: 'online',
    //     icon: renderIcon(Checkmark)
    //   })
    // }
  }
  if (item.user.id === loginUser.id || loginUser.userRole === 'admin') {
    options.push({
      label: '删除贴文',
      key: 'delete',
      icon: renderIcon(TrashOutline)
    })
  }
  return options
}

const handleSelect = (key: string | number) => {
  if (key === 'offline') {
    offline()
  }
  if (key === 'delete') {
    showConfirmDialog({
      title: '删除帖子',
      message: '请确认是否删除该帖子'
    }).then(async () => {
      const res = await PostControllerService.deletePostUsingPost({id: props.dynamic.id})
      if (res.code === 0 && res.data) {
        emit("deleteResult", props.dynamic.id);
      }
    }).catch(() => {
      // on cancel
    });
  }
}

onMounted(() => {
  setInterval(() => {
    timeDescription.value = getTimeDescription(props.dynamic.recommendedTime)
  }, 3000)
})

</script>

<style scoped>
img {
  image-rendering: -moz-crisp-edges;
  image-rendering: -o-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;
}
</style>
