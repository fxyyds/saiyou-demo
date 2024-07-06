<template>
  <div class="flex-auto px-3 mb-16">
    <div class="fixed top-16 z-10 left-0 right-0 w-full bg-white lg:hidden">
      <div class="flex mx-2 justify-between items-center h-[40px]">
        <div @click="router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6 stroke-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
          </svg>
        </div>
        <div class="font-bold ">动态详情</div>
        <div>
          <n-dropdown
              @select="handleSelect"
              trigger="hover" :options="options(data.team)">
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
    <div class="flex mt-28 justify-between items-center">
      <div class="flex items-center justify-between space-x-2">
        <div>
          <img class="w-10 h-10 rounded-full"
               :src="data.post.user?.userAvatar?data.post.user?.userAvatar:avatar"
               v-lazy="data.post.user?.userAvatar?data.post.user?.userAvatar:avatar"
          >
        </div>
        <div class="text-gray-500 text-xs flex flex-col space-y-1">
          <p class="text-md font-bold">{{ data.post.user?.userName }}</p>
          <div class="flex space-x-2">
            <p>{{
                formatTimestamp(data.post.createTime)
              }}</p>
            <div class="text-gray-500 text-xs flex space-x-2">
              <p v-if="data.post.viewNum&&data.post.viewNum>0">{{ data.post.viewNum }} 浏览</p>
            </div>
          </div>

        </div>
      </div>
      <div class="flex items-center space-x-2">
        <div v-if="data.post.user?.id !==loginUser.id"
             class="text-sky-500 bg-gray-100 text-xs rounded-full px-3 py-1">添加
        </div>
      </div>
    </div>
    <div class="flex flex-col mt-2">
      <p class="whitespace-pre-wrap">
        {{ data.post.content }}
      </p>
      <div class="mt-2 flex flex-wrap gap-2">
        <n-image
            v-for="item in data.post.imgList"
            style="max-width: 100px; max-height: 100px"
            width="100"
            lazy
            :src="item"
        />
      </div>
      <div class="mt-2" v-if="data.post.tagList && data.post.tagList.length > 0">
        <div class="text-sm text-gray-400">帖子标签:</div>
        <van-cell class="-ml-4">
          <div class="items-center flex">
            <div class="flex items-center justify-end">
              <p class="flex space-x-2">
                <n-tag v-for="item in data.post.tagList"> {{ item }}</n-tag>
              </p>
            </div>
          </div>
        </van-cell>
      </div>
    </div>
    <u-comment :config="config" @submit="submit" @like="like">
    </u-comment>
    <div class="h-[32px]"></div>
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

</template>
<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {Component, h, nextTick, onMounted, reactive, ref} from "vue";
import {
  CommentControllerService,
  CommentLikeControllerService,
  PostControllerService,
  PostFavourControllerService,
  PostThumbControllerService,
  PostVO
} from "../../../services/saiyou-backend";
import {createDiscreteApi, NIcon} from "naive-ui";
import {
  CloseOutline,
  HeartDislikeOutline,
  HeartOutline,
  ShareSocialOutline,
  Star,
  StarOutline,
  TrashOutline
} from "@vicons/ionicons5";
import QrCode from 'qrcode.vue'
import {useUserStore} from "../../../stores/user";
import avatar from '../../../assets/image/avatar.jpg'
import {formatTimestamp, getTimeDescription} from "../../../utlis/timeUtlis";
import emoji from '../../../assets/emoji'
import {CommentApi, ConfigApi, createObjectURL, SubmitParamApi, UComment, UToast} from 'undraw-ui'

const show = ref(false)
const userStore = useUserStore();
const {loginUser} = userStore
const share = ref(false)
const {message} = createDiscreteApi(["message"])

const router = useRouter();
const route = useRoute();
const data: { post: PostVO, commentList: [] } = reactive({
  post: {},
  commentList: [],
  initPageNum: 2,
})
let path = window.location.href + '?&code=' + loginUser.invitationCode

const onCopy = () => {
  navigator.clipboard.writeText(path).then(() => {
    message.success("复制成功")
  })
}
const hoverShow = () => {
  show.value = true
}
const hoverOver = () => {
  show.value = false
}
const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const config = reactive<ConfigApi>({
  user: {
    id: loginUser.id,
    username: loginUser.userName,
    avatar: loginUser.userAvatar && loginUser.userAvatar.length > 0 ? loginUser.userAvatar : avatar,
    // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
    likeIds: [],
  },
  showLevel: false,
  // showAddress:false,
  emoji: emoji,
  comments: [],
  total: 10
})

config.comments = []

onMounted(() => {
  view()
  loadData()
  loadComment()
  loadCommentLike()
})
const loadCommentLike =async () => {
  const res = await CommentLikeControllerService.commentLikeListUsingPost({
    postId: route.params.id
  })
  if (res.code === 0 && res.data) {
    config.user.likeIds = res.data
  }
}
const loadComment = async () => {
  const res = await CommentControllerService.getCommentListPageByPostIdUsingPost({
    postId: route.params.id,
    pageSize: 10000,
  })
  if (res.code === 0 && res.data) {
    config.comments.push(...res.data.records.map(item => {
      return {
        id: item.id,
        uid: item.user.id,
        address: item.address,
        content: item.content,
        likes: item.likes,
        createTime: getTimeDescription(item.createTime),
        user: {
          username: item.user.userName,
          avatar: loginUser.userAvatar && loginUser.userAvatar.length > 0 ? loginUser.userAvatar : avatar,
          level: item.user.level,
          homeLink: '/' + item.user.id
        },
        reply: {
          total: item.reply.total,
          list: item.reply.list.map(item => {
            return {
              id: item.id,
              uid: item.user.id,
              address: item.address,
              content: item.content,
              likes: item.likes,
              createTime: getTimeDescription(item.createTime),
              user: {
                username: item.user.userName,
                avatar: loginUser.userAvatar && loginUser.userAvatar.length > 0 ? loginUser.userAvatar : avatar,
                level: item.user.level,
                homeLink: '/' + item.user.id
              },
            }
          }).sort((a, b) => new Date(a.createTime) - new Date(b.createTime))
        }
      }
    }))
  }
}

const latest = ref(true)
const sorted = (latest: boolean) => {
  console.log(latest)
}

let temp_id = 100
// 提交评论事件
const submit = ({content, parentId, files, finish}: SubmitParamApi) => {
  let contentImg = files?.map(e => createObjectURL(e)).join('||')
  temp_id += 1
  const comment: CommentApi = {
    id: String(loginUser.id),
    parentId: parentId,
    postId: route.params.id,
    uid: loginUser.id,
    content: content,
    likes: 0,
    contentImg: contentImg,
    createTime: getTimeDescription(new Date()),
    user: {
      username: loginUser.userName,
      avatar: loginUser.userAvatar && loginUser.userAvatar.length > 0 ? loginUser.userAvatar : avatar,
      level: 0,
      homeLink: `/${temp_id}`
    },
    reply: null
  }
  setTimeout(async () => {
    const res = await CommentControllerService.saveCommentUsingPost(comment)
    if (res.code === 0 && res.data) {
      finish(comment)
      UToast({message: '评论成功!', type: 'info'})
    }
  }, 200)
}
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = async (id: string, finish: () => void) => {
  const res = await CommentLikeControllerService.doCommentLikeUsingPost({
    commentId: id,
    postId: route.params.id
  })
  if (res.code === 0 && res.data) {
    setTimeout(() => {
      finish()
    }, 200)
  }
}

const refInput = ref(null)
const getFocus = () => {
  nextTick(() => {
    refInput.value.focus();
  })
}

const options = (item) => {
  let options = []
  options.push({
    label: '分享贴文',
    key: 'share',
    icon: renderIcon(ShareSocialOutline)
  })
  if (data?.post.hasThumb) {
    options.push({
      label: '取消点赞',
      key: 'unHeart',
      icon: renderIcon(HeartDislikeOutline)
    })
  } else {
    options.push({
      label: '点赞贴文',
      key: 'heart',
      icon: renderIcon(HeartOutline)
    })
  }
  if (data?.post.hasFavour) {
    options.push({
      label: '取消收藏',
      key: 'unFavour',
      icon: renderIcon(Star)
    })
  } else {
    options.push({
      label: '收藏贴文',
      key: 'favour',
      icon: renderIcon(StarOutline)
    })
  }
  if (loginUser.userRole === 'admin') {
    if (data.post.status === 0) {
      options.push({
        label: '下架贴文',
        key: 'offline',
        icon: renderIcon(CloseOutline)
      })
    }
    // if (data.post.status === 1) {
    //   options.push({
    //     label: '上架贴文',
    //     key: 'online',
    //     icon: renderIcon(Checkmark)
    //   })
    // }
    options.push({
      label: '删除贴文',
      key: 'delete',
      icon: renderIcon(TrashOutline)
    })
  }
  return options
}

const handleSelect = (key: string | number) => {
  if (key === 'share') {
    showShare()
  }
  if (key === 'heart' || key === 'unHeart') {
    doThumb();
  }
  if (key === 'favour' || key === 'unFavour') {
    doFavour();
  }
  if (key === 'online') {
    online()
  }
  if (key === 'offline') {
    offline()
  }
}
const showShare = () => {
  share.value = true
}
const loadData = async () => {
  const res = await PostControllerService.getPostVoByIdUsingGet(route.params.id)
  if (res.data && res.code === 0) {
    data.post = res.data
  }
}
const view = async () => {
  const res = await PostControllerService.postViewUsingGet(route.params.id)
  if (res.data && res.code === 0) {
    data.post.viewNum++
  }
}

const online = async () => {
  const res = await PostControllerService.onlinePostUsingPost({id: data.post.id})
  if (res.data && res.code === 0) {
    data.post.status = 0
  }
}

const offline = async () => {
  const res = await PostControllerService.offlinePostUsingPost({id: data.post.id})
  if (res.data && res.code === 0) {
    data.post.status = 1
    router.push('/dynamic')
  }
}


const doFavour = async () => {
  const res = await PostFavourControllerService.doPostFavourUsingPost({postId: data.post.id})
  if (res.data && res.code === 0) {
    data.post.hasFavour = res.data === 1
    data.post.favourNum = res.data === 1 ? data.post.favourNum + 1 : data.post.favourNum - 1
  }
}


const doThumb = async () => {
  const res = await PostThumbControllerService.doThumbUsingPost({postId: data.post.id})
  if (res.data && res.code === 0) {
    data.post.hasThumb = res.data === 1
    data.post.thumbNum = res.data === 1 ? data.post.thumbNum + 1 : data.post.thumbNum - 1
  }
}

</script>

<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}

/deep/ .picture {
  display: flex;
  align-items: center;
}
</style>
