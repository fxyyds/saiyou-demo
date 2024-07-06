<template>
  <div class="mx-4 pt-5">
    <div
        class="bg-gray-100 rounded-lg pb-2 shadow"
        style="height: fit-content;"
    >
      <div>
        <div class="flex justify-around items-center">
          <div class="flex-col flex justify-start space-y-2 mt-4">
            <div class="text-md">
              {{
                data.compete?.blueTeam && data.compete?.blueTeam.teamName ? data.compete.blueTeam.teamName : '暂无对手'
              }}
            </div>
            <div @click.stop v-if="data.compete.blueTeam">
              <n-avatar-group :options="data.compete.blueTeam.teamUserList?data.compete.blueTeam.teamUserList:[]"
                              :size="30"
                              :max="3">
                <template #avatar="{ option: { userName, userAvatar } }">
                  <n-tooltip>
                    <template #trigger>
                      <n-avatar :src="userAvatar?userAvatar:avatar"/>
                    </template>
                    {{ userName }}
                  </n-tooltip>
                </template>

                <template #rest="{ options: restOptions, rest }">
                  <n-dropdown placement="top">
                    <n-avatar>+{{ data.compete?.blueTeam.teamUserList.length }}</n-avatar>
                  </n-dropdown>
                </template>
              </n-avatar-group>
            </div>
            <div class="text-xs">当前得分：{{ data.compete.redScore }}</div>
            <div class="text-xs">当前胜负：{{ redStatus(data.compete) }}</div>
          </div>
          <div class="mt-4 font-bold text-2xl">VS</div>
          <div class="flex-col flex justify-start space-y-2 mt-4">
            <div class="text-md">
              {{ data.compete?.redTeam && data.compete.redTeam.teamName ? data.compete.redTeam.teamName : '暂无对手' }}
            </div>
            <div @click.stop v-if="data.compete.redTeam">
              <n-avatar-group :options="data.compete.redTeam.teamUserList?data.compete.redTeam.teamUserList:[]"
                              :size="30" :max="2">
                <template #avatar="{ option: { userName, userAvatar } }">
                  <n-tooltip>
                    <template #trigger>
                      <n-avatar :src="userAvatar?userAvatar:avatar"/>
                    </template>
                    {{ userName }}
                  </n-tooltip>
                </template>
                <template #rest="{ options: restOptions, rest }">
                  <n-dropdown placement="top">
                    <n-avatar>+{{ data.compete.blueTeam.teamUserList.length }}</n-avatar>
                  </n-dropdown>
                </template>
              </n-avatar-group>
            </div>
            <div class="text-xs">当前得分：{{ data.compete.blueScore }}</div>
            <div class="text-xs">当前胜负：{{ blueStatus(data.compete) }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-5 mx-4 items-center">
      <div>
        <van-button :loading="loading" @click="toUserPaper" class="hover:bg-gray-50" plain block>开始比赛</van-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {CompeteControllerService, CompeteExamControllerService} from "../../services/saiyou-backend";
import {message} from "ant-design-vue";
import avatar from '../../assets/image/avatar.jpg'
import {showLoadingToast} from "vant";

const router = useRouter();
const route = useRoute();
const data = reactive({
  compete: {}
})
const redStatus = (item) => {
  if (item.redScore > item.blueScore) {
    return '胜'
  } else if (item.redScore < item.blueScore) {
    return '负'
  } else {
    return '平'
  }
}

const loading = ref(false)

const blueStatus = (item) => {
  if (item.redScore < item.blueScore) {
    return '胜'
  } else if (item.redScore > item.blueScore) {
    return '负'
  } else {
    return '平'
  }
}

const toUserPaper = async () => {
  loading.value = true
  const res = await CompeteExamControllerService.startTheExamUsingPost({competitionId: data.compete.competitionId})
  if (res.code === 0 && res.data) {
    const id = res.data.id
    let message = '正在加载试卷'
    if (res.data.state === 'open') {
      message = res.message
    }
    showLoadingToast({
      duration: 1000,
      forbidClick: true,
      message: message,
    });
    setTimeout(() => {
      router.push({path: '/compete/exam', query: {id: id}})
      loading.value = false
    }, 1000)
  } else {
    loading.value = false
  }
}

onMounted(async () => {
  if (!route.query.id) {
    message.error('参数错误')
    return
  }
  const res = await CompeteControllerService.listCompeteVoByIdUsingPost({id: route.query.id})
  if (res.code === 0 && res.data) {
    data.compete = res.data
  }
})
</script>

<style scoped>

</style>
