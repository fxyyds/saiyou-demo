<template>
  <div
      class="bg-gray-100 rounded-lg p-2 pb-4"
      style="height: fit-content;"
  >
    <div class="flex justify-between">
      <div @click="toPath(competition)">
        <div class="ml-4 mt-2 text-lg font-bold flex items-center space-x-1">
          <div>
            {{ competition.competitionName }}
          </div>
        </div>
        <div class="mt-2 ml-3 flex space-x-3 items-center">
          <img class="rounded w-20 h-20"
               :src="competition.competitionAvatarUrl?competition.competitionAvatarUrl:avatar"
               v-lazy="competition.competitionAvatarUrl?competition.competitionAvatarUrl:avatar">
          <div class="flex flex-col space-y-0.5">
            <div>
              赛事类型：<span class="text-gray-400">
            {{ competitionModelEnumValue[competition.competitiveMode] }} |
            {{ competitionTypeEnumValue[competition.competitionType] }}</span>
            </div>
            <div>
            </div>
            <div class="flex items-center space-x-1">
              赛事状态：
              <div class="rounded px-1 text-xs whitespace-nowrap bg-blue-400 text-gray-50 font-normal"
                   :class="competitionStatusEnum[competition.competitionStatus]"
              >
                <p class="m-0.5">{{ competitionStatusEnumValue[competition.competitionStatus] }}</p>
              </div>
            </div>
            <span v-if="competition.announce" class="text-xs text-gray-400 flex space-x-1 items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor" class="min-w-4 min-h-4 w-4 h-4 self-start">
                       <path stroke-linecap="round"
                             stroke-linejoin="round"
                             d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"/></svg>
                        <span>{{ competition.announce }}</span>
                </span>
            <div class="text-xs flex items-center space-x-1">
              <p class="text-sm">{{ competition.signUpDeadline }} 报名截止</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center justify-between">
        <div class="mt-2">
          <n-dropdown v-if="route.path!=='/system'&&(loginUser.id===competition.user.id||loginUser.userRole==='admin')"
                      :options="data.options"
                      @select="handleSelect">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5 stroke-1">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
              </svg>
            </div>
          </n-dropdown>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>

</template>

<script setup lang="ts">
import {Component, defineEmits, defineProps, h, reactive, withDefaults} from "vue";
import {CompetitionControllerService, CompetitionVO} from "../../../services/saiyou-backend";
import avatar from '../../../assets/image/avatar.jpg'
import {useRoute, useRouter} from "vue-router";
import {NIcon} from "naive-ui";
import {CloseOutline, CreateOutline, TrashOutline} from '@vicons/ionicons5'
import {useUserStore} from "../../../stores/user";
import {showConfirmDialog, showFailToast} from "vant";

const emit = defineEmits(["deleteResult", 'cancelResult', 'runningResult']);

const userStore = useUserStore();
const {loginUser} = userStore
const route = useRoute();
const competitionStatusEnum = {
  'signingUp': 'bg-blue-400',
  "running": 'bg-sky-400',
  'cancel': 'bg-gray-200',
  'end': 'bg-gray-300'
}
const competitionTypeEnumValue = {
  0: '线上赛',
  1: '线下赛'
}
const competitionModelEnumValue = {
  0: '单人',
  1: '多人'
}
const competitionStatusEnumValue = {
  'signingUp': '报名中',
  "running": '进行中',
  'cancel': '已取消',
  'end': '已结束'
}

const router = useRouter();

const toPath = (item) => {
  router.push({path: `/competition/info/${item.id}`})
}


interface Props {
  competition: CompetitionVO
}

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const toExit = () => {
  if (props.competition.competitionStatus === 'end') {
    showFailToast("赛事已结束，无法修改")
    return
  }
  if (props.competition.competitionStatus === 'running') {
    showFailToast("赛事进行中，无法修改")
    return
  }
  router.push({path: `/competition/update/${props.competition.id}`})
}

const data = reactive({
  options: [
    {
      label: '编辑赛事',
      key: 'exit',
      icon: renderIcon(CreateOutline),
      props: {
        onClick: (e) => {
          console.log(e.target)
        }
      }
    },
    // {
    //   label: '开始比赛',
    //   key: 'running',
    //   icon: renderIcon(CheckmarkOutline)
    // },
    {
      label: '取消赛事',
      key: 'cancel',
      icon: renderIcon(CloseOutline)
    },
    {
      label: '删除赛事',
      key: 'delete',
      icon: renderIcon(TrashOutline)
    },
  ]
})

const handleSelect = (key: string | number) => {
  if (key === 'exit') {
    toExit()
  }
  if (key === 'delete') {
    showConfirmDialog({
      title: '删除竞赛',
      message: '请确认是否删除该竞赛'
    }).then(async () => {
      const res = await CompetitionControllerService.deleteCompetitionUsingPost({id: props.competition.id})
      if (res.code === 0 && res.data) {
        emit("deleteResult", props.competition.id);
      }
    }).catch(() => {
      // on cancel
    });
  }
  if (key === 'cancel') {
    if (props.competition.competitionStatus === 'end') {
      showFailToast("赛事已结束，无法取消")
      return
    }
    if (props.competition.competitionStatus === 'running') {
      showFailToast("赛事进行中，无法取消")
      return
    }
    showConfirmDialog({
      title: '取消竞赛',
      message: '请确认是否取消该竞赛'
    }).then(async () => {
      const res = await CompetitionControllerService.cancelCompetitionUsingPost(props.competition.id)
      if (res.code === 0 && res.data) {
        emit("cancelResult", props.competition.id);
      }
    }).catch(() => {
      // on cancel
    });
  }
  // if (key === 'running') {
  //   const res = await CompetitionControllerService.runningCompetitionUsingPost(props.competition.id)
  //   if (res.code === 0 && res.data) {
  //     emit("runningResult", props.competition.id);
  //   }
  // }
}

const props = withDefaults(defineProps<Props>(), {
  competition: {},
});
</script>

<style scoped>

</style>
