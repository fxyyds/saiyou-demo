<template>
  <div class=" mx-4">
    <div class="h-2"></div>
    <div class="mt-2 bg-gray-100 p-2 rounded-lg">
      <div class="flex items-center justify-start space-x-2">
        <div>
          <img class="rounded-full w-12 h-12"
               :src="data.competition.user&&data.competition.user.userAvatar?data.competition.user.userAvatar:avatar">
        </div>
        <div class="flex flex-col items-start">
          <div>{{ data.competition.user?.userName }}</div>
          <div class="text-xs text-gray-400">赛事主理人</div>
        </div>
      </div>
    </div>
    <div class="m-3">赛事名称：<span class="text-sm text-gray-400">{{ data.competition.competitionName }}</span></div>
    <div class="m-3">比赛奖励：<span
        class="text-sm text-gray-400">{{ data.competition.reward ? data.competition.reward + '积分' : '暂无' }}</span>
    </div>
    <div class="m-3">比赛模式：<span
        class="text-sm text-gray-400">{{ competitionModelEnumValue[data.competition.competitiveMode] }}</span></div>
    <div class="m-3">比赛类型：<span
        class="text-sm text-gray-400">{{ competitionTypeEnumValue[data.competition.competitionType] }}</span></div>
    <div class="m-3">报名截止：<span class="text-sm text-gray-400">{{ data.competition.signUpDeadline }}</span></div>
    <div class="m-3">比赛截止：<span class="text-sm text-gray-400">{{ data.competition.endTime }}</span></div>
    <div class="w-screen h-1 bg-gray-100"></div>
    <div class="font-bold text-lg mt-3 h-4">
      赛事公告
    </div>
    <div class="mt-4 text-xs text-gray-400">
      {{
        data.competition && data.competition.announce ? (data.competition.announce.length < 12 ? data.competition.announce : data.competition.announce.slice(0, 12) + '...') : '还未设置公告哦~'
      }}
    </div>
    <div class="w-screen h-1 mt-3 bg-gray-100"></div>
    <div class="font-bold text-lg mt-3 h-4">
      赛事规则
    </div>
    <div class="mt-4 text-xs text-gray-400">
      <div v-if="!data.competition.rules||data.competition.rules.length<=0">
        <van-text-ellipsis
            rows="6"
            :content="data.text"
            expand-text="展开"
            collapse-text="收起"
        />
      </div>
      <div v-else>{{ data.competition.rules }}</div>
    </div>
    <div class="w-screen mt-3 h-1 bg-gray-100"></div>
    <div class="mt-4">
      <van-button v-if="data.participated===false" plain block hairline type="primary" @click="goSignUp">去报名
      </van-button>
      <van-button v-else block hairline plain type="danger" @click="goOutUp">退出比赛</van-button>
    </div>
    <!--    <van-popup-->
    <!--        v-model:show="showBottom"-->
    <!--        round-->
    <!--        position="bottom"-->
    <!--        :style="{ height: '50%' }"-->
    <!--        closeable-->
    <!--    >-->
    <!--      <div class="flex justify-center">-->
    <!--        <div class="mt-2 font-bold text-lg">-->
    <!--          选择队伍-->
    <!--        </div>-->

    <!--      </div>-->

    <!--    </van-popup>-->
    <van-popup v-model:show="showBottom" round position="bottom">
      <van-picker
          v-if="data.teamList.length>0"
          title="选择报名队伍"
          :columns="data.teamColumns"
          @cancel="showBottom = false"
          @confirm="onConfirm"
      />
      <div v-else class="h-44 mt-6 col-span-3">
        <n-empty description="您还没有队伍哦~">
          <template #extra>
            <!--                todo-->
            <n-button @click="router.push('/create/team')" size="small">
              去创建
            </n-button>
          </template>
        </n-empty>
      </div>
    </van-popup>

    <div class="mb-[56px]"></div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {
  CompetitionControllerService,
  JoinCompeteControllerService,
  TeamControllerService
} from "../../../services/saiyou-backend";
import avatar from '../../../assets/image/avatar.jpg'
import {useUserStore} from "../../../stores/user";
import {showSuccessToast} from "vant";

const userStore = useUserStore();
const {loginUser} = userStore
const router = useRouter();
const route = useRoute();
const showBottom = ref(false)
const data = reactive({
  competition: {},
  teamList: [],
  teamId: null,
  teamColumns: [],
  participated: false,
  text: `1.本赛事于线上进行，由玩家自行组队、报名，在报名截止后直至比赛结束，队伍的成员账号不可调整。2.比赛时间在报名截止时间之前，玩家可以自由组队报名：可加入队伍、创建队伍或管理自己的队伍；在到达此时间时，未加入队伍的队员无法参赛。赛事主办方有权自由控制队伍是否可以参赛。3.比赛根据参赛队伍数量随机分配对阵，两两对阵进行比赛，根据比赛累计积分进行排名确定名次，评分情况将根据净胜分，本赛事规则未详尽支出，创建者及指定的裁判团队拥有最终解释权和自由裁量权。`
})
const competitionTypeEnumValue = {
  0: '线上赛',
  1: '线下赛'
}
const competitionModelEnumValue = {
  0: '单人赛',
  1: '多人赛'
}

const goSignUp = async () => {
  showBottom.value = true
}

const goOutUp = async () => {
  const res = await JoinCompeteControllerService.quitCompeteUsingPost({
    teamId: data.teamId,
    competitionId: route.params.id
  })
  if (res.data && res.code === 0) {
    data.participated = false
    showSuccessToast("退出成功")
  }
}

const onConfirm = async ({selectedValues}) => {
  data.teamId = selectedValues[0]
  const res = await JoinCompeteControllerService.joinCompeteUsingPost({
    teamId: selectedValues[0],
    competitionId: route.params.id
  })
  if (res.data && res.code === 0) {
    data.participated = true
    showBottom.value = false
    showSuccessToast("报名成功")
  }
};

onMounted(async () => {
  if (!route.params.id) {
    return
  }
  const res = await CompetitionControllerService.getCompetitionVoByIdUsingGet(route.params.id)
  if (res.data && res.code === 0) {
    data.competition = res.data
  }
  const teamList = await TeamControllerService.listMyTeamVoByPageUsingPost({})
  if (teamList.data && teamList.code === 0) {
    data.teamList = teamList.data.records
    data.teamColumns = teamList.data.records.map(record => {
      return {text: record.teamName, value: record.id}
    })
    data.participated = teamList.data.records.some(team => {
      data.teamId = team.id
      return team.currentCompetitionId === route.params.id
    });
  }
})
</script>

<style scoped>

</style>
