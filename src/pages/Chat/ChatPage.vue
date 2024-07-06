<template>
  <div class=" bg-gray-100 remove-scrollbar h-screen">
    <div class="fixed top-[64px] border-b-2 z-50 left-0 right-0">
      <div class="mt-1 flex justify-between items-center mb-1 mx-4">
        <div @click="router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6 stroke-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
          </svg>
        </div>
        <div class="flex items-center space-x-1">
          <div class="border-2 rounded-full border-white">
            <!--            <img class="rounded-full w-8 h-8" :src="data.team.teamAvatarUrl?data.team.teamAvatarUrl:avatar">-->
          </div>
          <div class="text-md font-bold">
            {{ getName(data.friend) }}
          </div>
        </div>
        <div></div>
      </div>
      <div ref="messageContainer"
           :class="data.isJoin?'':'blur-sm'"
           class="fixed remove-scrollbar top-[6.5rem] bottom-[110px] left-0 right-0 overflow-scroll">
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
            <div class="message self" v-if="msg.isMe">
              <div class="myInfo info">
                <img class="h-10 w-10 rounded-full mx-2" :src="msg.avatar">
              </div>
              <p class="text w-fit pl-5">{{ msg.text }}</p>
            </div>
            <div v-else class="message other">
              <div @click="router.push('/user/'+msg.userId)" class="flex flex-col items-center -space-y-2">
                <div
                    @click="showUserInfo('msg',msg.id)"
                    :class="{'rounded-full border-2 border-red-400':data.teamLeader &&data.teamLeader.userAccount &&data.teamLeader.userAccount===msg.id,
                'rounded-full border-2 border-yellow-400':data.teamCaptain && data.teamCaptain.userAccount&&data.teamCaptain.userAccount===msg.id
                }"
                >
                  <img class="h-10 w-10 rounded-full" :src="msg.avatar?msg.avatar:avatar">
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
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {Component, computed, h, nextTick, onMounted, reactive, ref, toRefs} from "vue";
import {
  ChatControllerService,
  FriendsControllerService,
  TeamControllerService,
  TeamVO
} from "../../services/saiyou-backend";
import avatar from '../../assets/image/avatar.jpg'
import dayjs from 'dayjs'
import {formatTimestamp} from "../../utlis/timeUtlis";
import {useScroll} from '@vueuse/core'
import {showFailToast, showSuccessToast} from "vant";
import {useUserStore} from "../../stores/user";
import {createDiscreteApi, NIcon} from "naive-ui";

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
  const filter = messages.value.filter((message, index, self) => {
    return !self.slice(0, index).some((m) => m.id === message.id && message.isMe === m.isMe && m.createTime === message.createTime);
  });
  console.log(filter)
  return filter
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
})

const init = () => {
  if (typeof (WebSocket) == "undefined") {
    showFailToast("您的浏览器不支持WebSocket")
  } else {
    // 区分线上和开发环境
    let socketUrl = `${import.meta.env.VITE_WS_URL}/${loginUser.id}/${NaN}`
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
      let _data = JSON.parse(msg.data)
      if (_data.error) {
        showFailToast(_data.error)
        newMessage.value = ''
        return
      }
      // 获取在线人员信息
      if (_data.users) {
        // stats.value.users = data.users.filter(user => {
        //   return user.id !== loginUser.id
        // })
        // 获取当前连接的所有用户信息，并且排除自身，自己不会出现在自己的聊天列表里
      } else {
        // 如果服务器端发送过来的json数据 不包含 users 这个key，那么发送过来的就是聊天文本json数据

        // stats.value.messages.push(data)
        messages.value.push({
          id: String(_data.formUser?.userAccount),
          text: _data.text,
          isMe: _data.formUser?.userAccount === loginUser.userAccount,
          avatar: _data.formUser.userAvatar,
          nickname: _data.formUser.userName,
          createTime: _data.createTime,
          userId:_data.formUser?.id
        })
        // 构建消息内容
        // createContent(data.formUser, null, data.text, data.isAdmin,data.createTime)
        nextTick(() => {
          const container = messageContainer.value;
          container.scrollTop = container.scrollHeight;
        });
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
  isJoin: true,
  teamLeader: {},
  teamCaptain: {},
  teamUserList: [],
  lockTeam: {teamPassword: '', joinTeamPassword: ''},
  teamLock: false,
  joinTeam: false,
  chatType: 1,
  friend: {}
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

const getName = (item) => {
  if (item.remark) {
    if (item.remark.length < 8) {
      return item.remark
    } else {
      return item.remark.slice(0, 8) + '...'
    }
  }
  if (item.userName) {
    if (item.userName.length < 8) {
      return item.userName
    } else {
      return item.userName.slice(0, 8) + '...'
    }
  }
  if (item.userAccount) {
    return item.userAccount
  }
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
  const res = await FriendsControllerService.getUserFriendByIdUsingGet(route.params.id)
  if (res.data && res.code == 0) {
    data.friend = res.data
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
  const res = await ChatControllerService.getPrivateChatUsingPost({toId: route.params.id})
  if (res.data && res.code === 0) {
    messages.value = res.data.map(msg => {
      let user = msg.isMy ? msg.formUser : msg.toUser
      return {
        id: String(user?.userAccount),
        text: msg.text,
        isMe: msg.isMy,
        userId:user?.id,
        avatar: user.userAvatar ? user.userAvatar : avatar,
        nickname: user.userName,
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
        toId: route.params.id,
        text: newMessage.value,
        chatType: data.chatType,
        teamId: null,
      }
      socket.send(JSON.stringify(message));
      messages.value.push({
        id: String(loginUser.userAccount),
        userId:loginUser.id,
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


const updateTeamUsingPost = async () => {
  const res = await TeamControllerService.updateTeamUsingPost({id: data.team.id, teamStatus: 0})
  if (res.data && res.code === 0) {
    showSuccessToast("操作成功")
    data.team.teamStatus = 0
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
  margin: 5px;
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
