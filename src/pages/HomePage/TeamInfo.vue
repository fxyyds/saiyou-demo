<template>
  <div class=" bg-gray-100 remove-scrollbar h-screen">
    <div class="fixed top-[64px] border-b-2 z-50 left-0 right-0">
      <div class="mt-1 flex justify-between items-center mx-4">
        <div @click="router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6 stroke-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
          </svg>
        </div>
        <div class="flex items-center space-x-1">
          <div class="border-2 rounded-full border-white">
            <img class="rounded-full w-6 h-6" :src="data.team.teamAvatarUrl?data.team.teamAvatarUrl:avatar">
          </div>
          <div class="text-md font-bold">
            {{ data.team.teamName }}
          </div>
        </div>
        <div>
          <n-dropdown
              @select="handleSelect"
              trigger="hover" :options="options(data.team)">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-6 h-6 stroke-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
              </svg>
            </div>
          </n-dropdown>
        </div>
      </div>
      <div class="mx-4 mt-3">
        <div class="bg-gray-200 rounded-box px-3">
          <div class="h-5"></div>
          <div class="remove-scrollbar overflow-x-auto">
            <div class="flex space-x-1"
                 :class="data.team.maxNum<=4?'justify-center':''">
              <div v-if="data.teamLeader &&data.teamLeader.id" @click="showUserInfo(data.teamLeader)"
                   class="min-w-16 flex flex-col items-center space-y-1">
                <div class="flex flex-col items-center -space-y-3">
                  <div class="rounded-full border-2 border-red-400">
                    <img class="h-14 w-14 rounded-full"
                         :src="data.teamLeader.userAvatar?data.teamLeader.userAvatar:avatar">
                  </div>
                  <div style="font-size:0.65rem;line-height: 0.8rem;"
                       class="rounded-full px-2.5 h-[0.8rem] bg-red-400"
                  >
                    {{ "老师" }}
                  </div>
                </div>
                <div class="text-gray-400">
                  {{
                    data.teamLeader.userName ? data.teamLeader.userName.length < 5 ? data.teamLeader.userName : data.teamLeader.userName.slice(0, 5) + '...' : '老师' + generateRandomString()
                  }}
                </div>
              </div>
              <div v-if="data.teamCaptain && data.teamCaptain.id" @click="showUserInfo(data.teamCaptain)"
                   class="min-w-16 flex flex-col items-center space-y-1">
                <div class="flex flex-col items-center -space-y-3">
                  <div class="rounded-full border-2 border-yellow-400">
                    <img class="rounded-full h-14 w-14"
                         :src="data.teamCaptain.userAvatar?data.teamCaptain.userAvatar:avatar">
                  </div>
                  <div style="font-size:0.65rem;line-height: 0.8rem;"
                       class="rounded-full px-2.5 h-[0.8rem] bg-yellow-400"
                  >
                    {{ "队长" }}
                  </div>
                </div>
                <div class="text-gray-400">
                  {{
                    data.teamCaptain.userName ? data.teamCaptain.userName.length < 5 ? data.teamCaptain.userName : data.teamCaptain.userName.slice(0, 5) + '...' : '队员' + generateRandomString()
                  }}
                </div>
              </div>
              <div v-for="item in data.team.teamUserList" @click="showUserInfo(item)"
                   class="min-w-16 flex flex-col items-center space-y-1">
                <div class="flex flex-col items-center -space-y-3">
                  <div class="rounded-full border-2 border-gray-400">
                    <img class="rounded-full h-14 w-14" :src="item.userAvatar?item.userAvatar:avatar">
                  </div>
                  <div style="font-size:0.65rem;line-height: 0.8rem;"
                       class="rounded-full px-2.5 h-[0.8rem]"
                  >
                  </div>
                </div>
                <div class="text-gray-400">
                  {{
                    item.userName ? item.userName.length < 5 ? item.userName : item.userName.slice(0, 5) + '...' : '队员' + generateRandomString()
                  }}
                </div>
              </div>
              <div
                  v-if="isMax>0"
                  v-for="item in isMax"
                  @click="showShare"
                  class="min-w-16 flex flex-col items-center space-y-1">
                <div class="flex flex-col items-center -space-y-3">
                  <div class="border-white border-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" class="h-14 w-14 stroke-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                    </svg>
                  </div>
                  <div style="font-size:0.65rem;line-height: 0.8rem;"
                       class="rounded-full px-2.5 h-[0.8rem]"
                  >
                  </div>
                </div>
                <div class="text-gray-400">
                  {{
                    data.isJoin ? '邀请好友' : '待加入'
                  }}
                </div>
              </div>
            </div>
          </div>
          <div class="h-5"></div>
        </div>
      </div>
      <div class="text-sm text-gray-400 mx-4 mt-2 flex">公告：
        <n-ellipsis :line-clamp="1">
          {{ data.team.announce ? data.team.announce : '暂无公告' }}
        </n-ellipsis>
      </div>
      <div class="h-3"></div>
    </div>
    <!--    <div v-if="!bottom" @click="toBottom" class="fixed bottom-[120px] z-50 right-3 ">-->
    <!--      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"-->
    <!--           class="w-10 h-10 animate-bounce rounded-full bg-white stroke-1">-->
    <!--        <path stroke-linecap="round" stroke-linejoin="round"-->
    <!--              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>-->
    <!--      </svg>-->
    <!--    </div>-->

    <div ref="messageContainer"
         :class="data.isJoin?'':'blur-sm'"
         class="fixed remove-scrollbar top-[17.5rem] bottom-[110px] left-0 right-0 overflow-scroll">
      <van-loading v-if="loading" vertical>
        <template #icon>
          <van-icon name="star-o" size="30"/>
        </template>
        加载中...
      </van-loading>
      <div class="p-1 flex flex-col space-y-0.5">
        <div class="content max-auto" v-if="filteredMessages&&filteredMessages.length>0"
             v-for="msg in checkShowRule(filteredMessages, 'createTime')">
          <div v-if="msg.is_show_time" class="flex justify-center text-xs text-gray-400 items-center">
            {{ msg.show_time }}
          </div>
          <div class="message self" v-if="msg.id===loginUser.userAccount">
            <div class="myInfo info">
              <img class="h-12 w-12 rounded-full mx-2" :src="msg.avatar">
            </div>
            <p class="text w-fit pl-5">{{ msg.text }}</p>
          </div>
          <div v-else class="message other">
            <div class="flex flex-col items-center -space-y-2">
              <div
                  @click="showUserInfo('msg',msg.id)"
                  :class="{'rounded-full border-2 border-red-400':data.teamLeader &&data.teamLeader.userAccount &&data.teamLeader.userAccount===msg.id,
                'rounded-full border-2 border-yellow-400':data.teamCaptain && data.teamCaptain.userAccount&&data.teamCaptain.userAccount===msg.id
                }"
              >
                <img class="h-12 w-12 rounded-full" :src="msg.avatar?msg.avatar:avatar">
              </div>
              <div v-if="data.teamLeader &&data.teamLeader.userAccount &&data.teamLeader.userAccount===msg.id"
                   style="font-size:0.65rem;line-height: 0.8rem;"
                   class="rounded-full px-1 h-[0.8rem] bg-red-400"
              >
                {{ "老师" }}
              </div>
              <div v-if="data.teamCaptain &&data.teamCaptain.userAccount &&data.teamCaptain.userAccount===msg.id"
                   style="font-size:0.65rem;line-height: 0.8rem;"
                   class="rounded-full px-1 h-[0.8rem] bg-yellow-400"
              >
                {{ "队长" }}
              </div>
            </div>
            <!--            <img class="h-10 w-10 rounded-full avatar" :src="msg.avatar">-->

            <div class="info ml-2">
              <span class="username flex items-center space-x-2">
                <div> {{ msg.nickname }}</div>
              </span>
              <p class="text">{{ msg.text }}</p>
            </div>
          </div>
        </div>
        <div v-else class="text-sm text-gray-400 flex justify-center filter-none">
          {{ data.isJoin ? '还没有消息，快去发送一条吧~' : '请先加入队伍' }}
        </div>
      </div>
    </div>

    <div class="fixed bottom-[54px] left-0 right-0">
      <div class="flex flex-col">
        <div class="border-t-2 p-2 text-gray-400 duration-500 flex items-center">
          <input v-model="newMessage" :maxlength="maxMessageLength" @keyup.enter="sendMessage" type="text"
                 :placeholder="!data.isJoin?'请先加入队伍！':'聊点什么吧~'"
                 class="flex-1 p-2 duration-500 rounded-lg border border-gray-300 hover:outline-none hover:border-blue-500 focus:border-blue-500">
          <span class="text-gray-500 text-xs duration-500 ml-2"
                :class="{'w-[2.5rem]':characterCount<100,'w-[3rem]':characterCount>100}">{{
              characterCount
            }}/{{ maxMessageLength }}</span>
          <button @click="sendMessage" class="bg-blue-500 text-white px-4 py-2 rounded-lg ml-1">发送</button>
        </div>
      </div>
    </div>
  </div>
  <van-dialog v-model:show="data.teamLock" title="加密队伍"
              @confirm="teamLock"
              show-cancel-button>
    <div class="min-h-12 m-2 mt-3">
      <van-field
          v-model="data.lockTeam.teamPassword"
          autosize
          center
          clearable
          maxlength="10"
          placeholder="请输入加密密码"
          show-word-limit
      />
    </div>
  </van-dialog>
  <van-dialog v-model:show="data.joinTeam" title="加入队伍"
              @confirm="teamJoin"
              show-cancel-button>
    <div class="min-h-12 m-2 mt-3">
      <van-field
          v-model="data.lockTeam.joinTeamPassword"
          autosize
          center
          clearable
          maxlength="10"
          placeholder="请输入加密密码"
          show-word-limit
      />
    </div>
  </van-dialog>
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
  <van-dialog v-model:show="showUser" :close-on-click-overlay="true" :show-confirm-button="false">
    <div class="bg-white p-6 rounded shadow-md">
      <div class="flex flex-col items-center border-b-2 space-y-1">
        <div class="flex flex-col items-center -space-y-3">
          <div
              class="rounded-full border-2 border-grey-400"
              :class="{'border-red-400':data.teamLeader &&data.teamLeader.userAccount &&data.teamLeader.userAccount===data.showUserInfo.userAccount,
                'border-yellow-400':data.teamCaptain && data.teamCaptain.userAccount&&data.teamCaptain.userAccount===data.showUserInfo.userAccount,
                'border-blue-400':loginUser.userAccount===data.showUserInfo.userAccount&&data.teamLeader.userAccount!==data.showUserInfo.userAccount
                &&data.teamCaptain.userAccount!==data.showUserInfo.userAccount
          }"
          >
            <img class="h-16 w-16 rounded-full" :src="data.showUserInfo.userAvatar?data.showUserInfo.userAvatar:avatar">
          </div>
          <div
              v-if="data.teamLeader &&data.teamLeader.userAccount &&data.teamLeader.userAccount===data.showUserInfo.userAccount"
              style="font-size:0.65rem;line-height: 1rem;"
              class="rounded-full px-3 h-[1rem] bg-red-400"
          >
            {{ "老师" }}
          </div>
          <div
              v-else-if="data.teamCaptain &&data.teamCaptain.userAccount &&data.teamCaptain.userAccount===data.showUserInfo.userAccount"
              style="font-size:0.65rem;line-height: 1rem;"
              class="rounded-full px-3 h-[1rem] bg-yellow-400"
          >
            {{ "队长" }}
          </div>
          <div
              v-else-if="loginUser.userAccount===data.showUserInfo.userAccount"
              style="font-size:0.65rem;line-height: 1rem;"
              class="rounded-full px-4 h-[1rem] bg-blue-400"
          >
            {{ "我" }}
          </div>
        </div>
        <div class="text-gray-400">
          {{
            data.showUserInfo.userName ? data.showUserInfo.userName.length < 10 ? data.showUserInfo.userName : data.showUserInfo.userName.slice(0, 10) + '...' : '队员' + generateRandomString()
          }}
        </div>
      </div>
      <div class="text-xs mt-3 text-gray-400 flex space-x-1 items-center">
          <span>{{
              data.showUserInfo.userProfile ? data.showUserInfo.userProfile && data.showUserInfo.userProfile.length < 20 ? data.showUserInfo.userProfile : data.showUserInfo.userProfile.slice(0, 20) + '...' : 'Ta还未设置个性签名哦~'
            }}</span>
      </div>
      <div class="flex items-center justify-between space-x-2 mt-4">
        <button v-if="data.showUserInfo.id!==loginUser.id"
                class="flex-1 px-3 py-1 rounded text-white bg-cyan-500 hover:bg-cyan-600"
        >
          私聊
        </button>
        <button
            @click="toTeamCaptain(data.showUserInfo.id,'captain')"
            v-if="((data.team.teamLeader.id===loginUser.id
            && data.showUserInfo.id !==loginUser.id
           )||loginUser.userRole==='admin') && data.team.teamCaptain.id!==data.showUserInfo.id"
            class="flex-1 px-3 py-1 rounded text-white bg-cyan-500 hover:bg-cyan-600"
        >
          任命队长
        </button>
        <button
            @click="unTeamCaptain(data.showUserInfo.id)"
            v-if="(data.team.teamLeader.id===loginUser.id||loginUser.userRole==='admin')
            && data.showUserInfo.id !==loginUser.id
            && data.team.teamCaptain.id===data.showUserInfo.id"
            class="flex-1 px-3 py-1 rounded text-white bg-cyan-500 hover:bg-cyan-600"
        >
          移除队长
        </button>
      </div>
      <div class="flex items-center justify-between space-x-2 mt-2">
        <button
            @click="toTeamCaptain(data.showUserInfo.id,'teacher')"
            v-if="((data.team.teamLeader.id===loginUser.id
            && data.showUserInfo.id !==loginUser.id)||loginUser.userRole==='admin')"
            class="flex-1 px-3 py-1 rounded text-white bg-red-400 hover:bg-red-500"
        >
          任命老师
        </button>
        <button
            @click="kickOutTeamCaptain(data.showUserInfo.id)"
            v-if="((data.team.teamLeader.id===loginUser.id
            )||loginUser.userRole==='admin')&& data.showUserInfo.id !==loginUser.id"
            class="flex-1 px-3 py-1 rounded text-white bg-red-400 hover:bg-red-500"
        >
          踢出队伍
        </button>
      </div>
    </div>
  </van-dialog>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {Component, computed, h, nextTick, onMounted, reactive, ref, toRefs} from "vue";
import {ChatControllerService, TeamControllerService, TeamVO} from "../../services/saiyou-backend";
import avatar from '../../assets/image/avatar.jpg'
import dayjs from 'dayjs'
import QrCode from 'qrcode.vue'
import {formatTimestamp} from "../../utlis/timeUtlis";
import {useScroll} from '@vueuse/core'
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import {useUserStore} from "../../stores/user";
import {createDiscreteApi, NIcon} from "naive-ui";
import {
  BuildOutline,
  CloseOutline, CreateOutline,
  HandLeftOutline,
  LockClosedOutline,
  LockOpenOutline,
  LogOutOutline,
  ShareSocialOutline
} from "@vicons/ionicons5";

const {message} = createDiscreteApi(["message"])

const userStore = useUserStore();
const {loginUser} = userStore
const haveMore = ref(true)
const share = ref(false)
const showUser = ref(false)

let path = window.location.href + '&code=' + loginUser.invitationCode
const loading = ref(false)
const content = ref('')
const maxMessageLength = ref(200)
const isNowShow = ref(false)

const messageContainer = ref<HTMLElement | null>(null)
const {x, y, isScrolling, arrivedState, directions} = useScroll(messageContainer)
const {left, right, top, bottom} = toRefs(arrivedState)

const router = useRouter();
const route = useRoute();
const onCopy = () => {
  navigator.clipboard.writeText(path).then(() => {
    message.success("复制成功")
  })
}

interface Message {
  id: any;
  text: string;
  isMe: boolean;
  avatar: string;
  nickname: string;
  createTime: string;
}

const messages = ref<Message[]>([]);
const filteredMessages = computed(() => {
  return messages.value.filter((message, index, self) => {
    return !self.slice(0, index).some((m) => m.id === message.id && message.isMe === m.isMe && m.createTime === message.createTime);
  });
});

const newMessage = ref('');
const characterCount = computed(() => newMessage.value.length)

let socket = null;
const heartbeatInterval = 40 * 1000; // 30秒
let heartbeatTimer = null;

const startHeartbeat = () => {
  heartbeatTimer = setInterval(() => {
    if (socket.readyState === WebSocket.OPEN) {
      socket.send("PING");
    }
  }, heartbeatInterval);
}

const stopHeartbeat = () => {
  clearInterval(heartbeatTimer);
  heartbeatTimer = null;
}

const stats = ref({
  user: {
    id: 0,
    username: "",
    userAvatarUrl: ''
  },
  isCollapse: false,
  users: [],
  chatUser: {
    id: 0,
    username: ''
  },
  chatEnum: {
    // 私聊
    PRIVATE_CHAT: 1,
    // 队伍聊天
    TEAM_CHAT: 2,
    // 大厅
    HALL_CHAT: 3
  },
  chatType: 2,
})

const init = () => {
  if (typeof (WebSocket) == "undefined") {
    showFailToast("您的浏览器不支持WebSocket")
  } else {
    // 区分线上和开发环境
    let socketUrl = `${import.meta.env.VITE_WS_URL}/${loginUser.id}/${route.params.id}`
    console.log(socketUrl)
    if (socket != null) {
      socket.close();
      socket = null;
    }
    // 开启一个websocket服务
    socket = new WebSocket(socketUrl);
    //打开事件
    socket.onopen = function () {
      startHeartbeat();
      console.log("websocket已打开");
    };
    //  浏览器端收消息，获得从服务端发送过来的文本消息
    socket.onmessage = function (msg) {
      if (msg.data === "pong") {
        return;
      }
      // 对收到的json数据进行解析，
      let data = JSON.parse(msg.data)
      if (data.error) {
        showFailToast(data.error)
        newMessage.value = ''
        return
      }
      // 获取在线人员信息
      if (data.users) {
        stats.value.users = data.users.filter(user => {
          return user.id !== loginUser.id
        })
        // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
      } else {
        // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据
        let flag;
        if (stats.value.chatType === data.chatType) {
          // 单聊
          flag = (loginUser.id === data.toUser?.id && stats.value.chatUser?.id === data.formUser?.id)
        }
        if ((stats.value.chatType === data.chatType)) {
          // 大厅
          flag = (data.formUser?.id !== loginUser.id)
        }
        // 队伍
        if (stats.value.chatType === data.chatType && route.params.id === data.teamId) {
          flag = (data.formUser?.userAccount !== loginUser.userAccount)
        }
        if (flag) {
          // stats.value.messages.push(data)
          messages.value.push({
            id: String(data.formUser?.userAccount),
            text: data.text,
            isMe: data.formUser?.userAccount === loginUser.userAccount,
            avatar: data.formUser.userAvatar,
            nickname: data.formUser.userName,
            createTime: data.createTime
          })
          // 构建消息内容
          // createContent(data.formUser, null, data.text, data.isAdmin,data.createTime)
          nextTick(() => {
            const container = messageContainer.value;
            container.scrollTop = container.scrollHeight;
          });
        }
        flag = null;
      }
    };
    //关闭事件
    socket.onclose = function () {
      console.log("websocket已关闭");
      stopHeartbeat();
      setTimeout(init, 5000); // 5秒后重连
    };
    //发生了错误事件
    socket.onerror = function () {
      console.log("websocket发生了错误");
    }
  }
}

const data = reactive<{ team: TeamVO } | any>({
  team: {},
  showUserInfo: {},
  isJoin: false,
  teamLeader: {},
  teamCaptain: {},
  teamUserList: [],
  lockTeam: {teamPassword: '', joinTeamPassword: ''},
  teamLock: false,
  joinTeam: false
})

const isMax = computed(() => data.team.maxNum - data.teamUserList.length)

const showShare = () => {
  if (data.isJoin === false && loginUser.userRole !== 'admin') {
    if (data.team.teamStatus === 1) {
      data.joinTeam = true
    } else {
      teamJoin()
    }
  } else {
    share.value = true
  }
}

const kickOutTeamCaptain = async () => {
  const res = await TeamControllerService.kickOutTeamUsingPost({
    teamId: data.team.id,
    userId: data.showUserInfo.id
  })

  if (res.data && res.code === 0) {
    loadData()
    message.success("操作成功")
    showUser.value = false
  }
}

const unTeamCaptain = async (item) => {
  const res = await TeamControllerService.teamCancelCaptainUsingPost({
    teamId: data.team.id,
    toUserId: data.showUserInfo.id,
    type: 'teacher'// 无意义
  })

  if (res.data && res.code === 0) {
    loadData()
    message.success("操作成功")
    showUser.value = false
  }
}

const toTeamCaptain = (item, type) => {
  showConfirmDialog({
    title: type === 'captain' ? '任命队长' : '转移身份',
    message: '请确认是否执行！'
  }).then(async () => {
    const res = await TeamControllerService.teamTransferOfIdentityUsingPost({
      teamId: data.team.id,
      toUserId: data.showUserInfo.id,
      type: type
    })
    if (res.data && res.code === 0) {
      loadData()
      message.success("操作成功")
      showUser.value = false
    }
  })
}

const showUserInfo = (item, userAccount) => {
  if (data.isJoin === false && loginUser.userRole !== 'admin') {
    message.error("请先加入队伍!")
    return
  }
  if (item === 'msg') {
    data.showUserInfo = data.teamUserList.filter(u => u.userAccount === userAccount)[0]
  } else {
    data.showUserInfo = item
  }
  showUser.value = true
}

const loadData = async () => {
  const res = await TeamControllerService.getTeamVoByIdUsingGet(route.params.id)
  if (res.data && res.code == 0) {
    data.team = res.data
    data.isJoin = res.data.teamUserList.some(user => user.id === loginUser.id)
    data.teamUserList = res.data.teamUserList
    if (res.data.teamLeader) {
      data.teamLeader = res.data.teamLeader
      data.team.teamUserList = res.data.teamUserList.filter(u => u.id !== res.data.teamLeader.id)
    }
    if (res.data.teamCaptain) {
      data.teamCaptain = res.data.teamCaptain
      data.team.teamUserList = res.data.teamUserList.filter(u => u.id !== res.data.teamCaptain.id)
    }
    if (res.data.teamCaptain?.id === res.data.teamLeader.id) {
      data.teamCaptain = {}
    }
  }
}

onMounted(() => {
  if (!route.params.id) {
    return
  }
  loadData()
  init()
})

onMounted(async () => {
  const res = await ChatControllerService.getTeamChatUsingPost({teamId: route.params.id})
  if (res.data && res.code === 0) {
    messages.value = res.data.map(msg => {
      return {
        id: String(msg.formUser?.userAccount),
        text: msg.text,
        isMe: msg.isMy,
        avatar: msg.formUser.userAvatar ? msg.formUser.userAvatar : avatar,
        nickname: msg.formUser.userName,
        createTime: msg.createTime
      }
    })
    nextTick(() => {
      const container = messageContainer.value;
      container.scrollTop = container.scrollHeight;
    });
  }
})

const sendMessage = () => {
  // if (stats.value.chatUser.id === stats.value.user.id) {
  //   showFailToast("不能给自己发信息")
  //   return;
  // }
  if (!data.isJoin) {
    showFailToast("请先加入队伍")
    newMessage.value = ''
    return;
  }
  if (!newMessage.value.trim()) {
    showFailToast("请输入内容")
    return
  } else {
    if (typeof (WebSocket) == "undefined") {
      showFailToast("您的浏览器不支持WebSocket")
    } else {
      console.log("您的浏览器支持WebSocket");
      let message = {
        fromId: loginUser.id,
        toId: stats.value.chatUser.id,
        text: newMessage.value,
        chatType: 2,
        teamId: route.params.id,
      }
      socket.send(JSON.stringify(message));
      messages.value.push({
        id: String(loginUser.userAccount),
        text: newMessage.value,
        avatar: loginUser.userAvatar ? loginUser.userAvatar : avatar,
        createTime: formatTimestamp(Date.now()),
        nickname: loginUser.userName,
        isMe: true
      });
      newMessage.value = ''
      nextTick(() => {
        const container = messageContainer.value;
        container.scrollTop = container.scrollHeight;
      });
    }
  }
}

function generateRandomString() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for (let i = 0; i < 3; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//循环处理时间
/**
 * 参数
 * arr：数据数组
 * key：数组中对象的时间key键。
 * 新增属性
 * show_time_type：时间的类型
 * show_time：页面展示输出的时间
 * is_show_time：间隔上个时间是否大于5分钟，大于则显示当前时间，反之。
 **/
function checkShowRule(arr, key) {
  return arr.map((item, index, array) => {
    var obj = toggleTime(item[key]);
    item['show_time_type'] = obj.type;
    item['show_time'] = obj.createTime;
    if (index > 0) {
      item['is_show_time'] = compareTimeInterval(array[index - 1][key], array[index][key]);
    } else {
      item['is_show_time'] = true;
    }
    return item;
  });
}

//根据不同时间的消息，输出不同的时间格式
function toggleTime(date) {
  var time;
  var type = getDateDiff(date);
  //1：新消息，2：当天消息,3：昨天消息，4：今年消息，5：其他消息
  if (type == 1) {
    time = "以下为最新消息";//新消息，不显示时间，但是要显示"以下为最新消息"
  } else if (type == 2) {
    time = dayjs(date).format("H:mm");//当天消息，显示：10:22
  } else if (type == 3) {
    time = dayjs(date).format("昨天 H:mm");//昨天消息，显示：昨天 20:41
  } else if (type == 4) {
    time = dayjs(date).format("M月D日 AH:mm").replace("AM", "上午").replace("PM", "下午");//今年消息，上午下午，显示：3月17日 下午16:45
  } else if (type == 5) {
    time = dayjs(date).format("YYYY年M月D日 AH:mm").replace("AM", "上午").replace("PM", "下午");//其他消息，上午下午，显示：2020年11月2日 下午15:17
  }
  return {
    createTime: time,
    type: type
  };
}

//判断消息类型
function getDateDiff(date) {
  var nowDate = dayjs(new Date());//当前时间
  var oldDate = dayjs(new Date(date));//参数时间

  var timeTemp = dayjs(getThisTime().now.split(" ")[0] + "00:00").diff(oldDate, 'hour');
  var result;
  //优先判断昨天消息。今年的日期00:00的时间与上一个时间的时间戳小于1天，那就判断为昨天消息
  if ((nowDate.year() - oldDate.year() == 1 || nowDate.month() - oldDate.month() == 1) && timeTemp >= 0 && timeTemp <= 24) {
    result = 3;
  } else if (nowDate.year() - oldDate.year() >= 1) {
    result = 5;
  } else if (nowDate.month() - oldDate.month() >= 1 || nowDate.date() - oldDate.date() >= 2) {
    result = 4;
  } else if (nowDate.date() - oldDate.date() >= 1) {
    result = 3;
  } else if (nowDate.hour() - oldDate.hour() >= 1 || nowDate.minute() - oldDate.minute() >= 5) {
    result = 2;
  } else {
    result = 1;
  }
  return result;
}

//判断两个时间差是否大于5分钟
function compareTimeInterval(t1, t2) {
  const now = formatTimestamp(Date.now());
  if (!isNowShow.value && (dayjs(t2) - dayjs(now) >= 0)) {
    isNowShow.value = true
    return false
  }
  return dayjs(t2) - dayjs(t1) >= 300000
}

//获取当前时间，当前日期
function getThisTime(timeStamp) {
  var myDate = timeStamp ? new Date(parseInt(timeStamp) * 1000) : new Date();

  function p(s) {
    return s < 10 ? '0' + s : s;
  }

  return {
    'year': myDate.getFullYear(),
    'month': myDate.getMonth() + 1,
    'date': myDate.getDate(),
    'h': myDate.getHours(),
    'm': myDate.getMinutes(),
    's': myDate.getSeconds(),
    'now': myDate.getFullYear() + '-' + p(myDate.getMonth() + 1) + "-" + p(myDate.getDate()) + " " + p(myDate.getHours()) + ':' + p(myDate.getMinutes()) + ":" + p(myDate.getSeconds())
  };
}

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const options = (team) => {
  let options = []
  options.push({
    label: '分享队伍',
    key: 'share',
    icon: renderIcon(ShareSocialOutline)
  })
  if (team.teamLeader && team.teamLeader.id === loginUser.id || loginUser.userRole === 'admin') {
    options.push({
      label: '解散队伍',
      key: 'close',
      icon: renderIcon(CloseOutline)
    })
  }
  if ((team.teamLeader && team.teamLeader.id === loginUser.id) || (team.teamCaptain && team.teamCaptain.id === loginUser.id)
      || loginUser.userRole === 'admin') {
    options.push({
      label: '编辑队伍',
      key: 'exit',
      icon: renderIcon(CreateOutline),
      props: {
        onClick: (e) => {
          console.log(e.target)
        }
      }
    })
    if (team.teamStatus === 0) {
      options.push({
        label: '加密队伍',
        key: 'lock',
        icon: renderIcon(LockClosedOutline)
      })
    }
    if (team.teamStatus === 1) {
      options.push({
        label: '公开队伍',
        key: 'lockOpen',
        icon: renderIcon(LockOpenOutline)
      }, {
        label: '修改密码',
        key: 'exitLock',
        icon: renderIcon(BuildOutline)
      })
    }
  }
  if (!data.isJoin) {
    options.push({
      label: '加入队伍',
      key: 'join',
      icon: renderIcon(HandLeftOutline)
    })
  }
  if (data.isJoin) {
    options.push({
      label: '退出队伍',
      key: 'logout',
      icon: renderIcon(LogOutOutline)
    })
  }
  return options
}

const updateTeamUsingPost = async () => {
  const res = await TeamControllerService.updateTeamUsingPost({id: data.team.id, teamStatus: 0})
  if (res.data && res.code === 0) {
    showSuccessToast("操作成功")
    data.team.teamStatus = 0
  }
}

const handleSelect = (key: string | number) => {
  if (key === 'lockOpen') {
    updateTeamUsingPost()
  }
  if (key==='exit'){
    router.push('/update/team/'+data.team.id)
  }
  if (key === 'share') {
    showShare()
  }
  if (key === 'close') {
    showConfirmDialog({
      title: '解散队伍',
      message: '确认后将解散并删除该队伍及聊天记录！'
    }).then(async () => {
      const res = await TeamControllerService.deleteTeamUsingPost({id: data.team.id})
      if (res.code === 0 && res.data) {
        showSuccessToast("解散队伍成功")
        router.push('/')
      }
    }).catch(() => {
      // on cancel
    });
  }
  if (key === 'lock') {
    data.teamLock = true
  }
  if (key === 'join') {
    data.lockTeam.joinTeamPassword = ''
    if (data.team.teamStatus === 1) {
      data.joinTeam = true
    } else {
      teamJoin()
    }
  }
  if (key === 'logout') {
    logot()
  }
  if (key === 'exitLock') {
    data.teamLock = true
  }
}
const logot = async () => {
  const res = await TeamControllerService.quitTeamUsingPost(data.team.id)
  if (res.code === 0 && res.data) {
    showSuccessToast("退出成功")
    router.push('/')
  }
}
const teamJoin = async () => {
  const res = await TeamControllerService.joinTeamUsingPost({
    teamId: data.team.id,
    password: data.lockTeam.joinTeamPassword
  })
  if (res.data && res.code === 0) {
    showSuccessToast("加入队伍成功")
    data.isJoin = true
    data.teamUserList.push(loginUser)
    data.team.teamUserList.push(loginUser)
  }
}
const teamLock = async () => {
  const res = await TeamControllerService.updateTeamUsingPost({
    id: data.team.id,
    teamStatus: 1,
    teamPassword: data.lockTeam.teamPassword
  })
  if (res.data && res.code === 0) {
    showSuccessToast("操作成功")
    data.team.teamStatus = 1
  }
}
</script>

<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}

.message {
  display: flex;
  align-items: center;
  margin: 10px 10px;
}

.content {
  display: flex;
  flex-direction: column
}

.self {
  align-self: flex-end;
}

.avatar {
  align-self: center;
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 10px;
}

.username {
  align-self: flex-start;
  text-align: center;
  max-width: 200px;
  font-size: 12px;
  color: #999;
  padding-bottom: 4px;
  white-space: nowrap;
  overflow: visible;
}

.info {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  order: 2;
}

.myInfo {
  width: 55px;
  align-self: flex-start;
}

.other .avatar {
  align-self: flex-start;
}

.text {
  padding: 10px;
  border-radius: 10px;
  word-break: break-all;
}

.other .text {
  background-color: rgb(255, 255, 255);
  align-self: flex-start;
}

.admin {
  background-color: rgba(253, 0, 0, 0.13);
}

.self .text {
  background-color: #e2f6fa;
}

</style>
