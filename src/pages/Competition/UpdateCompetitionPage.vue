<template>
  <div class="mt-2 mx-4">
    <div>
      <van-cell>
        <div class="items-center justify-center flex-col flex max-auto">
          <div>
            <van-uploader
                :before-read="beforeRead"
                max-count="1" reupload
                :after-read="afterRead"
                v-model="data.fileList"
                :deletable="false"
            />
          </div>
          <div class="justify-center items-center flex">
            <div>
            <van-field
                size="large"
                v-model="data.competition.competitionName"
                placeholder="赛事名称 (限18个字)"
            />
            </div>
          </div>
        </div>
      </van-cell>
      <van-cell @click="modalType=true">
        <div class="items-center justify-between flex">
          <div class="text-black">比赛模式</div>
          <div class="flex items-center justify-end">
            <p>{{ competitionModelEnumValue[data.competition.competitiveMode] }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
        </div>
      </van-cell>
      <van-cell @click="competitionType=true">
        <div class="items-center justify-between flex">
          <div class="text-black">比赛类型</div>
          <div class="flex items-center justify-end">
            <p>{{ competitionTypeEnumValue[data.competition.competitionType] }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
        </div>
      </van-cell>

      <van-cell v-if="data.competition.competitionType===0" @click="examShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">考试内容</div>
          <div class="flex items-center justify-end">
            <p>{{ data.exam.examName ? data.exam.examName : '暂未选择线上考试内容' }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
        </div>
      </van-cell>
      <van-cell v-if="data.competition.competitionType===1" @click="addressShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">线下地址</div>
          <div class="flex items-center justify-end">
            <p>{{ data.competition.address ? data.competition.address : '暂未填写线下赛事地址' }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
        </div>
      </van-cell>
      <van-cell @click="competitionMaxNumShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">报名队伍数量</div>
          <div class="flex items-center justify-end">
            <p>{{ data.competition.maxNum }}队</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
        </div>
      </van-cell>
      <van-cell @click="teamMaxNumShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">队伍人数上线</div>
          <div class="flex items-center justify-end">
            <p>{{ data.competition.teamMaxNum }}人</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div @click="rewardShow=true" class="items-center justify-between flex">
          <div class="text-black">赛事奖励</div>
          <div class="flex items-center justify-end">
            <p>{{ data.competition.reward }}积分</p>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
              </svg>
            </div>
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div class="items-center justify-between flex">
          <div class="text-black">报名截止时间</div>
          <div class="flex items-center justify-end">
            <n-date-picker
                style="--n-border:0"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择" size="small"
                v-model:formatted-value="data.competition.signUpDeadline"
                type="datetime"
                clearable/>
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div class="items-center justify-between flex">
          <div class="text-black">赛事结束时间</div>
          <div class="flex items-center justify-end">
            <n-date-picker
                value-format="yyyy-MM-dd HH:mm:ss"
                style="--n-border:0" placeholder="请选择" size="small"
                v-model:formatted-value="data.competition.endTime"
                type="datetime"
                clearable/>
          </div>
        </div>
      </van-cell>
      <van-cell @click="userAnnounceShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">赛事公告</div>
          <div class="flex items-center justify-end">
            <p>
              {{
                data.competition && data.competition.announce ? (data.competition.announce.length < 12 ? data.competition.announce : data.competition.announce.slice(0, 12) + '...') : '还未设置公告哦~'
              }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
        </div>
      </van-cell>
      <van-cell @click="userRulesShow=true">
        <div class="items-center justify-between flex">
          <div class="text-black">赛事规则</div>
          <div class="flex items-center justify-end">
            <p>
              {{
                data.competition && data.competition.rules ? (data.competition.rules.length < 12 ? data.competition.rules : data.competition.rules.slice(0, 12) + '...') : '还未设置规则哦~'
              }}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
          </div>
        </div>
      </van-cell>
      <van-cell>
        <div class="items-center justify-between flex">
          <div class="text-black">标签</div>
          <div class="flex items-center justify-end">
            <p>
              <n-dynamic-tags v-model:value="data.competition.tags" :max="3"/>
            </p>
          </div>
        </div>
      </van-cell>
      <div class="mt-4">
        <van-button block hairline plain type="primary" @click="onSumbit">更新赛事</van-button>
      </div>
      <van-popup v-model:show="competitionMaxNumShow" round position="bottom">
        <van-picker
            title="报名队伍数量"
            :columns="data.maxNumColumns"
            @cancel="competitionMaxNumShow = false"
            @confirm="onMaxNumConfirm"
        />
      </van-popup>
      <van-popup v-model:show="teamMaxNumShow" round position="bottom">
        <van-picker
            title="队伍人数上限"
            :columns="data.teamMaxNumColumns"
            @cancel="teamMaxNumShow = false"
            @confirm="teamMaxNumConfirm"
        />
      </van-popup>
      <van-popup v-model:show="modalType" round position="bottom">
        <van-picker
            title="比赛模式"
            :columns="data.modelColumns"
            @cancel="modalType = false"
            @confirm="onConfirm"
        />
      </van-popup>
      <van-popup v-model:show="competitionType" round position="bottom">
        <van-picker
            @change="competitionTypeChange"
            title="比赛类型"
            :columns="data.typeColumns"
            @cancel="competitionType = false"
            @confirm="onTypeConfirm"
        />
      </van-popup>
      <van-popup v-model:show="rewardShow" round position="bottom">
        <div class="flex justify-center items-center"></div>
        <div>
          <van-picker
              title="赛事奖励"
              :columns="data.rewardShowColumns"
              @cancel="rewardShow = false"
              @confirm="rewardShowConfirm"
          />
        </div>
      </van-popup>
      <van-dialog v-model:show="userAnnounceShow" title="赛事公告" show-cancel-button>
        <div>
          <van-field
              v-model="data.competition.announce"
              rows="2"
              autosize
              center
              clearable
              type="textarea"
              maxlength="30"
              placeholder="赛事公告"
              show-word-limit
          />
        </div>
      </van-dialog>
      <van-dialog v-model:show="addressShow" title="赛事地址" show-cancel-button>
        <div>
          <van-field
              v-model="data.competition.address"
              rows="2"
              autosize
              center
              clearable
              type="textarea"
              maxlength="50"
              placeholder="赛事地址"
              show-word-limit
          />
        </div>
      </van-dialog>
      <van-dialog v-model:show="userRulesShow" title="赛事规则" show-cancel-button>
        <div>
          <van-field
              v-model="data.competition.rules"
              rows="4"
              autosize
              center
              clearable
              type="textarea"
              maxlength="1000"
              placeholder="赛事规则"
              show-word-limit
          />
        </div>
      </van-dialog>
      <van-action-sheet v-model:show="examShow">
        <div class="mt-2">
          <search @searchResult="handleSearchResult"/>
          <van-picker
              v-if="data.columns &&data.columns.length>0"
              @click-option="clickOption"
              toolbar-position="bottom"
              :columns="data.columns"
              cancel-button-text=""
              confirm-button-text=""
          />
          <div v-else class="h-44 mt-6 col-span-3">
            <n-empty description="没找到考试哦~">
              <template #extra>
                <!--                todo-->
                <n-button size="small">
                  去创建
                </n-button>
              </template>
            </n-empty>
          </div>
        </div>
      </van-action-sheet>
      <div class="h-[56px]"></div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {
  CompeteExamControllerService,
  CompetitionControllerService,
  FileControllerService
} from "../../services/saiyou-backend";
import avatar from "../../assets/image/avatar.jpg";
import {useUserStore} from "../../stores/user";
import {showFailToast, showSuccessToast} from "vant";
import Search from "../../components/search/Search.vue";
import {useRoute, useRouter} from "vue-router";

const addressShow = ref(false);
const existedTagSearchList = ref([]);
const activeIndex = ref(0);

const examShow = ref(false);
const modalType = ref(false);
const userAnnounceShow = ref(false);
const rewardShow = ref(false);
const competitionType = ref(false);
const teamMaxNumShow = ref(false);
const competitionMaxNumShow = ref(false);
const userRulesShow = ref(false);
const route = useRoute();
const userStore = useUserStore();
const {loginUser} = userStore
const data = reactive({
  columns: [],
  searchText: '',
  exam: {examName: ''},
  competition: {
    competitionAvatarUrl: "",
    competitiveMode: 1,
    competitionType: 0,
    maxNum: 32,
    teamMaxNum: 5,
    announce: '',
    competitionName: '',
    reward: 1
  },
  maxNumColumns: [{text: '2队', value: 2},
    {text: '4队', value: 4}, {text: '8队', value: 8}, {
      text: '16队',
      value: 16
    }, {text: '32队', value: 32}, {text: '64队', value: 64}],
  teamMaxNumColumns: [{text: '5人', value: 5}, {text: '6人', value: 6}, {text: '7人', value: 7}, {
    text: '8人',
    value: 8
  }, {text: '9人', value: 9}, {text: '10人', value: 10}],
  modelColumns: [{text: '单人赛', value: 0}, {text: '多人赛', value: 1}],
  rewardShowColumns: [{text: '1积分', value: 1}, {text: '5积分', value: 5}, {
    text: '10积分',
    value: 10
  }, {text: '20积分', value: 20}, {text: '50积分', value: 50}, {text: '100积分', value: 100}],
  typeColumns: [{text: '线上赛', value: 0}, {text: '线下赛', value: 1}],
  fileList: [],
})
const clickOption = ({currentOption, selectedValues, selectedOptions, selectedIndexes, columnIndex}) => {
  data.exam.examName = currentOption.text
  data.exam.id = currentOption.value
  data.competition.examId = currentOption.value
  examShow.value = false
}
const rewardShowConfirm = async ({selectedValues}) => {
  data.competition.reward = selectedValues[0]
  rewardShow.value = false
};
const onMaxNumConfirm = async ({selectedValues}) => {
  data.competition.maxNum = selectedValues[0]
  competitionMaxNumShow.value = false
};
const onConfirm = async ({selectedValues}) => {
  data.competition.competitiveMode = selectedValues[0]
  modalType.value = false
};
const onTypeConfirm = async ({selectedValues}) => {
  data.competition.competitionType = selectedValues[0]
  if (selectedValues[0] === 0 && !data.exam.id) {
    examShow.value = true
  }
  competitionType.value = false
};

const router = useRouter();

const onSumbit = async () => {
  if (!data.competition.competitionName) {
    showFailToast("赛事名称不能为空")
    return;
  }
  if (!data.competition.endTime) {
    showFailToast("赛事结束时间不能为空")
    return;
  }
  if (!data.competition.tags||data.competition.tags.length<=0) {
    showFailToast("请先设置标签")
    return;
  }
  if (!data.competition.signUpDeadline) {
    showFailToast("赛事报名截止时间不能为空")
    return;
  }
  if (data.competition.competitionType === 0 && !data.competition.examId) {
    showFailToast("请先选择线上考试")
    examShow.value = true
    return
  }
  if (data.competition.competitionType === 1 && !data.competition.address) {
    showFailToast("请先填写线下赛事地址")
    addressShow.value = true
    return
  }
  console.log(data.exam)
  console.log(data.competition)
  const res = await CompetitionControllerService.updateCompetitionUsingPost(data.competition)
  if (res.data && res.code === 0) {
    showSuccessToast("更新成功")
    router.push("/competition")
  }
}

const handleSearchResult = (result) => {
  data.searchText = result;
  loadData()
};
const teamMaxNumConfirm = async ({selectedValues}) => {
  data.competition.teamMaxNum = selectedValues[0]
  teamMaxNumShow.value = false
};

const competitionTypeChange = ({selectedValues, selectedOptions, selectedIndexes, columnIndex}) => {

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
const competitionTypeEnumValue = {
  0: '线上赛',
  1: '线下赛'
}
const competitionModelEnumValue = {
  0: '单人赛',
  1: '多人赛'
}
const afterRead = async (file) => {
  const res = await FileControllerService.uploadFileUsingPost(file.file, "competition_avatar")
  if (res.data && res.code === 0) {
    data.competition.competitionAvatarUrl = res?.data
    data.fileList = [{url: res.data}]
  } else {
    data.fileList = [{url: loginUser.userAvatar ? loginUser.userAvatar : avatar}]
  }
};

const loadData = async () => {
  const res = await CompeteExamControllerService.listCompeteExamVoByPageUsingPost({
    searchText: data.searchText,
    state: 'create',
  })
  if (res.data && res.code === 0) {
    data.columns = res.data.records.map(record => {
      return {text: record.examName, value: record.id}
    })
  }
}

const loadData2 = async () => {
  const res = await CompetitionControllerService.getCompetitionVoByIdUsingGet(route.params.id)
  if (res.data && res.code === 0) {
    data.competition = res.data
    data.competition.tags=res.data.tagList
    if (res.data.competitionAvatarUrl){
      data.fileList = [{url: res.data.competitionAvatarUrl}]
    }
  }
}

onMounted(() => {
  if (!route.params.id){
    return
  }
  loadData2()
  loadData()
})

</script>

<style scoped>
/deep/ .van-image__img, .van-image__error, .van-image__loading {
  border-radius: 9999px;
}

/deep/ .van-uploader__preview-image {
  height: 6rem;
  width: 6rem;
}

.content {
  padding: 16px 16px 260px;
}
</style>
