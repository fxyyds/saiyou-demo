<template>
  <div
      class="bg-gray-100 rounded-lg p-2 pb-4 shadow"
      style="height: fit-content;"
  >
    <div class="flex justify-between">
      <div @click="router.push(`/team/${props.team.id}`)">
        <div class="flex mt-2 ml-2 space-x-1.5">
          <div v-for="tag in props.team.tagList"
               class="rounded-full px-1.5 text-xs whitespace-nowrap text-gray-800 bg-white font-normal">
            <p class="m-0.5">{{ tag }}</p>
          </div>
        </div>
        <div class="mt-2 ml-3 flex space-x-3 items-center">
          <div>
            <img class="rounded-full w-14 h-14" :src="props.team.teamAvatarUrl?props.team.teamAvatarUrl:avatar"
                 v-lazy="props.team.teamAvatarUrl?props.team.teamAvatarUrl:avatar">
          </div>
          <div class="flex flex-col space-y-0.5">
            <div class="text-xl font-bold">{{ props.team.teamName }}</div>
            <span v-if="props.team&&props.team.wantToTagList&&props.team.wantToTagList.length>0"
                  class="text-xs text-gray-400">想找：{{ formatWantTo(props.team.wantToTagList) }}</span>
            <span v-if="props.team.announce" class="text-xs text-gray-400 flex space-x-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="min-w-4 min-h-4 w-4 h-4 self-start">
  <path stroke-linecap="round" stroke-linejoin="round"
        d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/>
     </svg>
            <span>{{ props.team.announce }}</span></span>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-between">
        <div class="mt-2" >
          <n-dropdown
              v-if="route.path!=='/system'"
              @select="handleSelect"
              trigger="hover" :options="options(props.team)">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5 stroke-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
              </svg>
            </div>
          </n-dropdown>
        </div>
        <div>
          <div class="mr-3 flex items-center space-x-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-4 h-4 stroke-1">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
            </svg>
            <span class="text-sm text-gray-400">{{ props.team.teamUserList.length }}</span>
          </div>
        </div>
      </div>
    </div>
    <slot></slot>

    <van-dialog v-model:show="data.teamLock" title="加密队伍"
                @confirm="teamLock"
                show-cancel-button>
      <div class="min-h-12 m-2 mt-3">
        <van-field
            v-model="data.team.teamPassword"
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
            v-model="data.team.joinTeamPassword"
            autosize
            center
            clearable
            maxlength="10"
            placeholder="请输入加密密码"
            show-word-limit
        />
      </div>
    </van-dialog>
  </div>

</template>
<script setup lang="ts">
import avatar from '../../../assets/image/avatar.jpg'
import {defineProps, withDefaults} from "vue/dist/vue";
import {TeamControllerService, TeamVO} from "../../../services/saiyou-backend";
import {Component, defineEmits, h, reactive} from "vue";
import {NIcon} from "naive-ui";
import {
  BuildOutline,
  CloseOutline,
  CreateOutline,
  HandLeftOutline,
  LockClosedOutline,
  LockOpenOutline,
  LogOutOutline
} from '@vicons/ionicons5'
import {useRoute, useRouter} from "vue-router";
import {useUserStore} from "../../../stores/user";
import {showConfirmDialog, showSuccessToast} from "vant";

const router = useRouter();
const userStore = useUserStore();
const {loginUser} = userStore
const route = useRoute();

interface Props {
  team: TeamVO
}

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}
const data = reactive({
  team: {teamPassword: '', joinTeamPassword: ''},
  teamLock: false,
  joinTeam: false
})

const options = (team) => {
  let options = []
  if (route.path !== '/system') {
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
        },)
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
    if (!team.teamUserList.map(user => user.id).includes(loginUser.id)) {
      options.push({
        label: '加入队伍',
        key: 'join',
        icon: renderIcon(HandLeftOutline)
      })
    }
    if (team.teamUserList.map(user => user.id).includes(loginUser.id)) {
      options.push({
        label: '退出队伍',
        key: 'logout',
        icon: renderIcon(LogOutOutline)
      })
    }
  }
  return options
}
const emit = defineEmits(["lockOpen", 'lock', 'runningResult', 'close']);

const handleSelect = async (key: string | number) => {
  if (key === 'lockOpen') {
    const res = await TeamControllerService.updateTeamUsingPost({id: props.team.id, teamStatus: 0})
    if (res.data && res.code === 0) {
      showSuccessToast("操作成功")
      emit("lockOpen", props.team.id)
    }
  }
  if (key === 'exit') {
    router.push('/update/team/' + props.team.id)
  }
  if (key === 'exitLock') {
    data.teamLock = true
  }
  if (key === 'close') {
    showConfirmDialog({
      title: '解散队伍',
      message: '确认后将解散并删除该队伍！'
    }).then(async () => {
      const res = await TeamControllerService.deleteTeamUsingPost({id: props.team.id})
      if (res.code === 0 && res.data) {
        emit("close", props.team.id);
        showSuccessToast("解散队伍成功")
      }
    }).catch(() => {
      // on cancel
    });
  }
  if (key === 'lock') {
    data.teamLock = true
  }
  if (key === 'join') {
    if (props.team.teamStatus === 1) {
      data.joinTeam = true
    } else {
      data.team.joinTeamPassword = ''
      await teamJoin()
    }
  }
  if (key === 'logout') {
    const res = await TeamControllerService.quitTeamUsingPost(props.team.id)
    if (res.code === 0 && res.data) {
      props.team.teamUserList = props.team.teamUserList.filter(u => u.id !== loginUser.id)
      showSuccessToast("退出成功")
    }
  }
}
const teamJoin = async () => {
  const res = await TeamControllerService.joinTeamUsingPost({
    teamId: props.team.id,
    password: data.team.joinTeamPassword
  })
  if (res.data && res.code === 0) {
    showSuccessToast("加入队伍成功")
    props.team.teamUserList.push(loginUser)
  }
}
const teamLock = async () => {
  const res = await TeamControllerService.updateTeamUsingPost({
    id: props.team.id,
    teamStatus: 1,
    teamPassword: data.team.teamPassword
  })
  if (res.data && res.code === 0) {
    showSuccessToast("操作成功")
    emit("lock", props.team.id)
  }
}

const props = withDefaults(defineProps<Props>(), {
  team: {},
});

const formatWantTo = (list: []) => {
  return list.join(" 、");
}
</script>

<style scoped></style>
