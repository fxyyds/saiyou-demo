<template>
  <div class="min-w-[360px]">
    <van-sticky :offset-top="65">
      <van-dropdown-menu class="rounded">
        <van-dropdown-item v-model="value" @change="change" :options="options"/>
        <van-dropdown-item v-model="competitionSelection" @change="competitionSelectionChange"
                           :options="data.competitionSelectionOpts"/>
      </van-dropdown-menu>
      <search @searchResult="handleSearchResult" :show="addList.includes(value)">
        <div class="h-[34px] flex items-center">
          <van-button class="h-[34px]" size="small" @click="toAdd" type="primary">添加
          </van-button>
        </div>
      </search>
    </van-sticky>
    <div>
      <van-list
          class="space-y-2 mb-[56px]"
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >
        <div v-if="value==='user'" v-for="item in data.userList"
             class="mx-4 space-y-2 bg-gray-200 rounded">
          <div class="bg-gray-100 p-3 rounded-lg">
            <div class="flex justify-between items-center">
              <div @click="router.push('/user/'+item.id)" class="flex items-center justify-start space-x-2">
                <div>
                  <img class="rounded-full w-14 h-14"
                       :src="item.userAvatar?item.userAvatar:avtar">
                </div>
                <div class="flex flex-col items-start">
                  <div>昵称：{{
                      item.userName && item.userName.length < 8 ? item.userName : item.userName.slice(0, 8) + '...'
                    }}
                  </div>
                  <div>赛友号：{{
                      item.userAccount && item.userAccount.length < 8 ? item.userAccount : item.userAccount.slice(0, 8) + '...'
                    }}
                  </div>
                  <div>
                    状态:
                    <a-badge :color="item?.status===0?'green':'red'" :text="item?.status===0?'正常':'已封号'"/>
                  </div>
                </div>
              </div>
              <div class="space-x-1">
                <van-button plain size="small" @click="router.push('/admin/exit/'+item.id)" type="primary">编辑
                </van-button>
                <van-button v-if="item.status===1" @click="unBanUser(item)" plain size="small" type="primary">解封
                </van-button>
                <van-button v-else plain size="small" @click="banUser(item)" type="danger">封禁</van-button>
              </div>
            </div>
          </div>
          <!--    </div>-->
        </div>
        <div v-if="value==='post'" v-for="item in data.postList" class="mx-4 space-y-2 bg-gray-100 rounded">
          <div class="p-2">
            <div @click="router.push('/dynamic/'+item.id)">
              <div class="text-sm mt-1 whitespace-pre-wrap">
                <n-ellipsis :line-clamp="3">
                  {{ item.content }}
                </n-ellipsis>
              </div>
            </div>
            <div class="space-x-1 flex justify-end items-center">
              <van-button v-if="item.status===1" @click="unBanPost(item)" plain size="small" type="primary">上架
              </van-button>
              <van-button v-else plain size="small" @click="banPost(item)" type="danger">下架</van-button>
              <van-button plain size="small" @click="deletePost(item)" type="danger">删除</van-button>
            </div>
            <!--    </div>-->
          </div>
        </div>
        <div v-if="value==='comment'" v-for="item in data.commentList" class="mx-4 space-y-2 bg-gray-100 rounded">
          <div class="p-2">
            <div>
              <div class="text-sm mt-1 whitespace-pre-wrap">
                <n-ellipsis :line-clamp="3">
                  {{ item.content }}
                </n-ellipsis>
              </div>
            </div>
            <div class="space-x-1 flex justify-end items-center">
              <van-button v-if="item.status===1" @click="unBanComment(item)" plain size="small" type="primary">展示
              </van-button>
              <van-button v-else plain size="small" @click="banComment(item)" type="danger">屏蔽</van-button>
              <van-button plain size="small" @click="deleteComment(item)" type="danger">删除</van-button>
            </div>
            <!--    </div>-->
          </div>
        </div>
        <div v-if="value==='team'">
          <div class="mx-4 duration-500 break-all rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3">
            <team-page class=""
                       v-for="item in data.teamList"
                       :team="item">
              <div class="space-x-1 flex justify-end items-center mt-2 bg-gray-100">
                <van-button plain size="small" @click="exiTeam(item)" type="primary">更新</van-button>
                <van-button @click="clossTeam(item)" plain size="small" type="danger">解散
                </van-button>
              </div>
            </team-page>
          </div>
        </div>
        <div v-if="value==='product'" class="mx-4 space-y-2 rounded">
          <div class="grid grid-cols-2 mt-3 gap-3">
            <div v-for="item in data.productList" class="p-2 rounded border rounded">
              <div>
                <div class="flex justify-center items-center mt-4">
                  <img v-if="item&&item.img&&item.img.length>0" class="w-16 rounded-lg h-16 stroke-1" :src="item.img"/>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                       stroke="currentColor"
                       :class="data.activeIndex === item.id?'stroke-cyan-500':''"
                       class="w-16 h-16 stroke-1">
                    <path stroke-linecap="round" stroke-linejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                  </svg>
                </div>
                <p class="flex justify-center items-center mt-1 text-sm">
                  {{ item.name }}
                </p>
                <div v-if="item.total && item.total>=0" class="flex justify-center items-center mt-1 text-sm">
                  <span class="text-red-500"> {{ item.total }}</span>&nbsp;积分
                </div>
                <div class="space-x-1 flex justify-end items-center mt-2">
                  <van-button plain size="small" @click="exitProdout(item)" type="primary">更新</van-button>
                  <van-button v-if="item.status===1" @click="unBanProdout(item)" plain size="small" type="primary">上架
                  </van-button>
                  <van-button v-else plain size="small" @click="banProdout(item)" type="danger">下架</van-button>
                  <van-button plain size="small" @click="deleteProdout(item)" type="danger">删除</van-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="value==='competition'">
          <div class="mx-4 duration-500 break-all rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3">
            <competition-content class="" v-for="item in data.competitionList" :competition="item">
              <div class="space-x-1 flex justify-end items-center bg-gray-100">
                <van-button plain size="small" @click="exiCompetition(item)" type="primary">更新</van-button>
                <van-button @click="clossCompetition(item)" plain size="small" type="danger">取消
                </van-button>
                <van-button @click="deleteCompetition(item)" plain size="small" type="danger">删除
                </van-button>
              </div>
            </competition-content>
          </div>
        </div>
        <div v-if="value==='questionBank'">
          <div class="mx-4 duration-500 break-all rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3">
            <div class="flex border p-2 rounded hover:bg-gray-100 justify-between items-center"
                 v-for="item in data.questionBankList">
              <div @click="router.push('/question/'+item.id)" class="flex flex-col">
                <div>题库名称：{{ item.title }}</div>
                <div class="text-xs text-gray-400">备注：{{ item.remark }}</div>
                <div class="text-xs text-gray-400">创建时间：{{ formatTimestamp(item.createTime) }}</div>
              </div>
              <div class="space-x-1 flex justify-end items-center mt-2 bg-gray-100">
                <van-button plain size="small" @click="router.push('/question/'+item.id)" type="primary">查看
                </van-button>
                <van-button plain size="small" @click="exitQuestBank(item)" type="primary">编辑</van-button>
                <van-button @click="deleteQuestBank(item)" plain size="small" type="danger">删除
                </van-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="value==='paper'">
          <div class="mx-4 duration-500 break-all rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3">
            <div class="flex border p-2 rounded hover:bg-gray-100 justify-between items-center"
                 v-for="item in data.paperList">
              <div @click="router.push('/paper/'+item.id)" class="flex flex-col">
                <div>试卷名称：{{ item.title }}</div>
                <div class="text-xs text-gray-400">及格分数：{{ item.qualifyScore }}分</div>
                <div class="text-xs text-gray-400">总分数：{{ item.totalScore }}分</div>
                <div class="text-xs text-gray-400">创建时间：{{ formatTimestamp(item.createTime) }}</div>
              </div>
              <div class="space-x-1 flex justify-end items-center mt-2 bg-gray-100">
                <van-button plain size="small" @click="router.push('/paper/'+item.id)" type="primary">编辑</van-button>
                <van-button @click="deletePaper(item)" plain size="small" type="danger">删除
                </van-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="value==='exam'">
          <div class="mx-4 duration-500 break-all rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3">
            <div class="border p-2 rounded hover:bg-gray-100 "
                 v-for="item in data.examList">
              <div class="flex flex-col">
                <div>考试名称：{{ item.examName }}</div>
                <div class="text-xs text-gray-400">及格分数：{{ item.qualifyScore }}分</div>
                <div class="text-xs text-gray-400">总分数：{{ item.totalScore }}分</div>
                <div class="text-xs text-gray-400">考试时长：{{ item.totalTime }}分钟</div>
                <div v-if="item.description && item.description.length>0" class="text-xs text-gray-400">
                  考试描述：{{ item.description }}
                </div>
                <div class="text-xs text-gray-400">创建时间：{{ formatTimestamp(item.createTime) }}</div>
                <div>
                  考试状态:
                  <a-badge :color="colorEnum[item.state]" :text="colorStatusEnum[item.state]"/>
                </div>
              </div>
              <div class="space-x-1 flex justify-end items-center mt-2">
                <van-button plain size="small" @click="router.push('/exam/update/'+item.id)" type="primary">编辑考试
                </van-button>
                <van-button :disabled="item.state!=='create'" @click="openExam(item)" plain size="small" type="primary">
                  开始考试
                </van-button>
                <van-button @click="deleteExam(item)" plain size="small" type="danger">删除考试</van-button>
                <van-button :disabled="item.state==='finish'" @click="finishExam(item)" plain size="small"
                            type="danger">结束考试
                </van-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="value==='order'">
          <div class="mx-4 duration-500 break-all rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3">
            <div class="border p-2 rounded hover:bg-gray-100 "
                 v-for="item in data.orderList">
              <div class="flex flex-col">
                <div>商品名称：{{ item.orderName }}</div>
                <div>
                  商品状态:
                  <a-badge :color="orderStatusEnum[item.status]" :text="orderEnum[item.status]"/>
                </div>
                <div class="">积分价格：{{ item.total }}个</div>
                <div class="text-xs text-gray-400">商品描述：{{ item.productInfo }}</div>
                <div class="text-xs text-gray-400">创建时间：{{ formatTimestamp(item.createTime) }}</div>
              </div>
              <div class="space-x-1 flex justify-end items-center mt-2">
                <van-button @click="adoptOrder(item)" plain size="small" type="primary">
                  通过
                </van-button>
                <van-button @click="cancelOrder(item)" plain size="small" type="danger">取消</van-button>
                <van-button @click="refuseOrder(item)" plain size="small" type="danger">拒绝</van-button>
                <van-button @click="deleteOrder(item)" plain size="small"
                            type="danger">删除
                </van-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="value==='tag'">
          <div class="mx-4 duration-500 break-all rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3">
            <div class="border p-2 rounded hover:bg-gray-100 "
                 v-for="item in data.tagList">
              <div class="flex flex-col">
                <div>标签名称：
                  <van-tag type="primary" size="medium" plain>{{ item.tagName }}</van-tag>
                </div>
                <div>
                  标签状态:
                  <a-badge :color="tagEnum[item.status]" :text="tagStatusEnum[item.status]"/>
                </div>
              </div>
              <div class="space-x-1 flex justify-end items-center mt-2">
                <van-button @click="exitTag(item)" plain size="small" type="primary">
                  编辑
                </van-button>
                <van-button v-if="item.status===1" @click="unBanTag(item)" plain size="small" type="primary">上架
                </van-button>
                <van-button v-else plain size="small" @click="banTag(item)" type="danger">下架</van-button>
                <van-button @click="deleteTag(item)" plain size="small"
                            type="danger">删除
                </van-button>
              </div>
            </div>
          </div>
        </div>

      </van-list>
      <div class="h-[10px]"></div>
      <van-dialog v-model:show="tagsShow" title="添加标签"
                  @confirm="addTag"
                  show-cancel-button>
        <div class="min-h-12 m-2 mt-3">
          <n-dynamic-tags v-model:value="data.addTag" :max="8"/>
        </div>
      </van-dialog>
      <van-dialog v-model:show="exitShow" title="修改标签"
                  @confirm="exitNewTag"
                  show-cancel-button>
        <div class="min-h-12 m-2 mt-3">
          <n-dynamic-tags v-model:value="data.exitTag" :max="1"/>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {message} from "ant-design-vue";
import Search from "../../components/search/Search.vue";
import avtar from '../../assets/image/avatar.jpg'
import {formatTimestamp} from "../../utlis/timeUtlis";
import {
  CommentControllerService,
  CompeteExamControllerService,
  CompetitionControllerService,
  ExamPaperControllerService,
  Post,
  PostControllerService,
  ProductInfoControllerService,
  ProductOrderControllerService,
  QuestionBankControllerService,
  TagControllerService,
  TeamControllerService,
  TeamVO,
  User,
  UserControllerService
} from "../../services/saiyou-backend";
import {useUserStore} from "../../stores/user";
import TeamPage from "../HomePage/components/TeamPage.vue";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import CompetitionContent from "../Competition/components/CompetitionContent.vue";

const addList = ['product', 'questionBank', 'paper', 'exam', 'competition', 'tag']
const tagsShow = ref(false)
const {loginUser} = useUserStore()
const router = useRouter();
const route = useRoute();
const competitionSelection = ref(null);
const options = [
  {text: '用户管理', value: 'user'},
  {text: '帖子管理', value: 'post'},
  {text: '评论管理', value: 'comment'},
  {text: '队伍管理', value: 'team'},
  {text: '商品管理', value: 'product'},
  {text: '竞赛管理', value: 'competition'},
  {text: '题库管理', value: 'questionBank'},
  {text: '试卷管理', value: 'paper'},
  {text: '考试管理', value: 'exam'},
  {text: '订单管理', value: 'order'},
  {text: '标签管理', value: 'tag'},
];

const userOpts = [
  {text: '全部', value: null},
  {text: '正常', value: 0},
  {text: '封号', value: 1},
];
const orderOpts = [
  {text: '全部', value: null},
  {text: '未支付', value: 0},
  {text: '已支付', value: 1},
  {text: '已取消', value: 2},
  {text: '已通过', value: 3},
  {text: '已拒绝', value: 4},

];
const examOpts = [
  {text: '全部', value: null},
  {text: '未开始', value: 'create'},
  {text: '进行中', value: 'open'},
  {text: '已结束', value: 'finish'},
];
const competitionOpts = [
  {text: '全部', value: null},
  {text: '报名中', value: "signingUp"},
  {text: '已开始', value: 'running'},
  {text: '已取消', value: 'cancel'},
];

const postOpts = [
  {text: '全部', value: null},
  {text: '上架中', value: 0},
  {text: '已下架', value: 1},
];

const tagOpts = [
  {text: '全部', value: null},
  {text: '上架中', value: 0},
  {text: '已下架', value: 1},
];

const commentOpts = [
  {text: '全部', value: null},
  {text: '正常', value: 0},
  {text: '已屏蔽', value: 1},
];

const teamOpts = [
  {text: '全部', value: null},
  {text: '公开队伍', value: 0},
  {text: '加密队伍', value: 1},
];

const productOpts = [
  {text: '全部', value: null},
  {text: '上架中', value: 0},
  {text: '已下架', value: 1},
];
const colorEnum = {
  'create': 'geekblue',
  'open': 'green',
  'finish': '#bdc3c7'
}
const colorStatusEnum = {
  'create': '未开始',
  'open': '进行中',
  'finish': '已结束'
}

const orderEnum = {
  0: '未支付',
  1: '已支付',
  2: "已取消",
  3: '已通过',
  4: '已拒绝'
}
const orderStatusEnum = {
  0: '#bdc3c7',
  1: 'green',
  2: '#bdc3c7',
  3: 'geekblue',
  4: 'red'
}
const tagStatusEnum = {
  0: '显示中',
  1: '已屏蔽',
}

const tagEnum = {
  0: 'green',
  1: '#bdc3c7',
}

const allOpts = [
  {text: '全部', value: null},
];
const data = reactive<{
  competitionSelectionOpts: any[],
  searchText: string,
  initPageNum: number,
  userList: User[]
  commentList: Comment[]
  postList: Post[]
  teamList: TeamVO[]
  examList: any[]
  productList: any[]
  competitionList: any[]
} | any>
({
  competitionSelectionOpts: userOpts,
  searchText: '',
  addTag: [],
  thisTag: {},
  tagList: [],
  initPageNum: 1,
  examList: [],
  userList: [],
  questionBankList: [],
  postList: [],
  commentList: [],
  paperList: [],
  exitTag: [],
  productList: [],
  teamList: [],
  orderList: [],
  competitionList: []
})
const exitShow = ref(false)
const toAdd = () => {
  switch (value.value) {
    case 'competition':
      router.push('/competition/create')
      break;
    case 'product':
      router.push('/product/add')
      break;
    case 'questionBank':
      router.push('/questionBank/add')
      break;
    case 'paper':
      router.push('/paper/add')
      break;
    case 'exam':
      router.push('/exam/add')
      break;
    case 'tag':
      tagsShow.value = true
      break
  }
}

const handleSearchResult = (result) => {
  data.searchText = result;
  competitionSelectionChange()
};

const value = ref("user");
const loading = ref(false);
const finished = ref(false);

const finishExam = (item) => {
  showConfirmDialog({
    title: '结束考试',
    message: '确认后将提前结束该考试！'
  }).then(async () => {
    const res = await CompeteExamControllerService.finishExamUsingPost(item.id)
    if (res.code === 0 && res.data) {
      item.state = 'finish'
      showSuccessToast("结束考试成功")
    }
  }).catch(() => {
    // on cancel
  });
}
const deleteExam = (item) => {
  showConfirmDialog({
    title: '删除考试',
    message: '确认后将删除该考试！'
  }).then(async () => {
    const res = await CompeteExamControllerService.deleteCompeteExamUsingPost({id: item.id})
    if (res.code === 0 && res.data) {
      data.examList = data.examList.filter(team => team.id !== item.id)
      showSuccessToast("删除考试成功")
    }
  }).catch(() => {
    // on cancel
  });
}
const openExam = (item) => {
  showConfirmDialog({
    title: '开始考试',
    message: '确认后将提前开始考试！'
  }).then(async () => {
    const res = await CompeteExamControllerService.openExamUsingPost(item.id)
    if (res.code === 0 && res.data) {
      item.state = 'open'
      showSuccessToast("开始考试成功")
    }
  }).catch(() => {
    // on cancel
  });
}

const change = (val) => {
  loading.value = false
  finished.value = false
  data.initPageNum = 1
  switch (val) {
    case 'user':
      data.competitionSelectionOpts = userOpts
      break;
    case 'post':
      data.competitionSelectionOpts = postOpts
      break;
    case 'comment':
      data.competitionSelectionOpts = commentOpts
      break;
    case 'team':
      data.competitionSelectionOpts = teamOpts
      break;
    case 'product':
      data.competitionSelectionOpts = productOpts
      break;
    case 'competition':
      data.competitionSelectionOpts = competitionOpts
      break;
    case 'questionBank':
    case 'paper':
      data.competitionSelectionOpts = allOpts
      break;
    case 'exam':
      data.competitionSelectionOpts = examOpts
      break;
    case 'order':
      data.competitionSelectionOpts = orderOpts
      break
    case 'tag':
      data.competitionSelectionOpts = tagOpts
      break
  }
  competitionSelection.value = data.competitionSelectionOpts[0].value
  onLoad()
}


const clossTeam = async (item) => {
  showConfirmDialog({
    title: '解散队伍',
    message: '确认后将解散并删除该队伍！'
  }).then(async () => {
    const res = await TeamControllerService.deleteTeamUsingPost({id: item.id})
    if (res.code === 0 && res.data) {
      data.teamList = data.teamList.filter(team => team.id !== item.id)
      showSuccessToast("解散队伍成功")
    }
  }).catch(() => {
    // on cancel
  });
}

const competitionSelectionChange = () => {
  loading.value = false
  finished.value = false
  data.initPageNum = 1
  switch (value.value) {
    case 'user':
      data.userList = []
      break;
    case 'post':
      data.postList = []
      break;
    case 'comment':
      data.commentList = []
      break;
    case 'team':
      data.teamList = []
      break;
    case 'product':
      data.productList = []
      break;
    case 'competition':
      data.competitionList = []
      break;
    case 'questionBank':
      data.questionBankList = []
      break;
    case 'paper':
      data.paperList = []
      break;
    case 'exam':
      data.examList = []
      break;
    case 'order':
      data.orderList = []
      break
    case 'tag':
      data.tagList = []
      break
  }
  onLoad()
}

const addTag = async () => {
  const res = await TagControllerService.addTagUsingPost({
    tags: data.addTag
  })
  if (res.code === 0 && res.data) {
    message.success('添加成功')
    competitionSelectionChange()
    data.addTag = []
  }
}

const banUser = async (item) => {
  const res = await UserControllerService.banUserUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('封禁成功')
    item.status = 1
  }
}

const unBanUser = async (item) => {
  const res = await UserControllerService.normalUserUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('解封成功')
    item.status = 0
  }
}

const deletePost = async (item) => {
  const res = await PostControllerService.deletePostUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('删除成功')
    data.postList = data.postList.filter(post => post.id !== item.id)
  }
}

const banPost = async (item) => {
  const res = await PostControllerService.offlinePostUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('下架成功')
    item.status = 1
  }
}
const unBanPost = async (item) => {
  const res = await PostControllerService.onlinePostUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('上架成功')
    item.status = 0
  }
}

const banComment = async (item) => {
  const res = await CommentControllerService.offlineCommentUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('屏蔽成功')
    item.status = 1
  }
}
const unBanComment = async (item) => {
  const res = await CommentControllerService.onlineCommentUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('展示成功')
    item.status = 0
  }
}
const deleteComment = async (item) => {
  const res = await CommentControllerService.deleteCommentUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('删除成功')
    data.commentList = data.commentList.filter(i => i.id !== item.id)
    item.status = 0
  }
}

const exiTeam = (item) => {
  router.push('/update/team/' + item.id)
}

const deleteOrder = (item) => {
  showConfirmDialog({
    title: '删除订单',
    message: '确认后将删除订单该订单，已支付将退款积分给用户！'
  }).then(async () => {
    const res = await ProductOrderControllerService.deleteOrderUsingPost(item.id)
    if (res.data && res.code === 0) {
      message.success('删除成功')
      data.orderList = data.orderList.filter(o => o.id !== item.id)
    }
  }).catch(() => {
    // on cancel
  });
}

const cancelOrder = async (item) => {
  showConfirmDialog({
    title: '取消订单',
    message: '取消订单后，已支付订单将退款积分给用户！'
  }).then(async () => {
    const res = await ProductOrderControllerService.cancelOrderUsingPost(item.id)
    if (res.data && res.code === 0) {
      message.success('取消成功')
      item.status = 3
    }
  }).catch(() => {
    // on cancel
  });
}
const refuseOrder = async (item) => {
  showConfirmDialog({
    title: '拒绝订单',
    message: '拒绝订单后，已支付订单将退款积分给用户！'
  }).then(async () => {
    const res = await ProductOrderControllerService.refuseOrderUsingPost(item.id)
    if (res.data && res.code === 0) {
      message.success('拒绝成功')
      item.status = 4
    }
  }).catch(() => {
    // on cancel
  });
}
const adoptOrder = async (item) => {
  const res = await ProductOrderControllerService.refuseOrderUsingPost(item.id)
  if (res.data && res.code === 0) {
    message.success('通过成功')
    item.status = 3
  }
}

const deleteProdout = async (item) => {
  const res = await ProductInfoControllerService.deleteProductInfoUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('删除成功')
    data.productList = data.productList.filter(post => post.id !== item.id)
  }
}

const banProdout = async (item) => {
  const res = await ProductInfoControllerService.offlineProductInfoUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('下架成功')
    item.status = 1
  }
}

const exitQuestBank = (item) => {
  router.push({path: '/questionBank/update/' + item.id})
}

const deleteQuestBank = (item) => {
  showConfirmDialog({
    title: '删除题库',
    message: '请确认是否删除该题库'
  }).then(async () => {
    const res = await QuestionBankControllerService.deleteQuestionBankUsingPost({id: item.id})
    if (res.code === 0 && res.data) {
      message.success('删除成功')
      data.questionBankList = data.questionBankList.filter(post => post.id !== item.id)
    }
  }).catch(() => {
    // on cancel
  });
}

const deletePaper = (item) => {
  showConfirmDialog({
    title: '删除试卷',
    message: '请确认是否删除该试卷'
  }).then(async () => {
    const res = await ExamPaperControllerService.deleteExamPaperUsingPost({id: item.id})
    if (res.code === 0 && res.data) {
      message.success('删除成功')
      data.paperList = data.paperList.filter(post => post.id !== item.id)
    }
  }).catch(() => {
    // on cancel
  });
}
const unBanProdout = async (item) => {
  const res = await ProductInfoControllerService.onlineProductInfoUsingPost({id: item.id})
  if (res.code === 0 && res.data) {
    message.success('上架成功')
    item.status = 0
  }
}

const exitProdout = (item) => {
  router.push({path: '/product/update/' + item.id})
}

const exiCompetition = (item) => {
  if (item.competitionStatus === 'end') {
    showFailToast("赛事已结束，无法修改")
    return
  }
  if (item.competitionStatus === 'running') {
    showFailToast("赛事进行中，无法修改")
    return
  }
  router.push({path: `/competition/update/${item.id}`})
}

const deleteCompetition = (item) => {
  showConfirmDialog({
    title: '删除竞赛',
    message: '请确认是否删除该竞赛'
  }).then(async () => {
    const res = await CompetitionControllerService.deleteCompetitionUsingPost({id: item.id})
    if (res.code === 0 && res.data) {
      showSuccessToast("删除成功")
      data.competitionList = data.competitionList.filter(competition => competition.id !== item.id)
    }
  }).catch(() => {
    // on cancel
  });
}

const clossCompetition = (item) => {
  if (item.competitionStatus === 'end') {
    showFailToast("赛事已结束，无法取消")
    return
  }
  if (item.competitionStatus === 'running') {
    showFailToast("赛事进行中，无法取消")
    return
  }
  showConfirmDialog({
    title: '取消竞赛',
    message: '请确认是否取消该竞赛'
  }).then(async () => {
    const res = await CompetitionControllerService.cancelCompetitionUsingPost(item.id)
    if (res.code === 0 && res.data) {
      showSuccessToast("取消成功")
      item.competitionStatus = 'cancel'
    }
  }).catch(() => {
    // on cancel
  });
}

const deleteTag = (item) => {
  showConfirmDialog({
    title: '删除标签',
    message: '删除标签后将不可用该标签检索'
  }).then(async () => {
    const res = await TagControllerService.deleteTagUsingGet(item.id)
    if (res.code === 0 && res.data) {
      showSuccessToast("删除成功")
      data.tagList = data.tagList.filter(t => t.id !== item.id)
    }
  }).catch(() => {
    // on cancel
  });
}
const banTag = async (item) => {
  const res = await TagControllerService.offlineTagUsingGet(item.id)
  if (res.code === 0 && res.data) {
    showSuccessToast("下架成功")
    item.status = 1
  }
}

const unBanTag = async (item) => {
  const res = await TagControllerService.onlineTagUsingGet(item.id)
  if (res.code === 0 && res.data) {
    showSuccessToast("展示成功")
    item.status = 0
  }
}
const exitTag = (item) => {
  data.thisTag = item
  data.exitTag = [item.tagName]
  exitShow.value = true
}

const exitNewTag = async () => {
  const res = await TagControllerService.updateTagUsingPost({
    ...data.thisTag,
    tagName: data.exitTag[0]
  })
  if (res.data && res.code===0){
   competitionSelectionChange()
  }
}

const onLoadUserData = async () => {
  const res = await UserControllerService.listUserByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    status: competitionSelection.value
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.userList.push(...res.data.records);
        data.userList = data.userList.filter((item, index) => {
          return data.userList.findIndex(obj => obj.id === item.id) === index;
        }).filter(item => item.id !== loginUser.id);
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}


const onLoadPaperData = async () => {
  const res = await ExamPaperControllerService.listExamPaperByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.paperList.push(...res.data.records);
        data.paperList = data.paperList.filter((item, index) => {
          return data.paperList.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onLoadOrderData = async () => {
  const res = await ProductOrderControllerService.listMyProductOrderByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    state: competitionSelection.value
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.orderList.push(...res.data.records);
        data.orderList = data.orderList.filter((item, index) => {
          return data.orderList.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onLoadExamData = async () => {
  const res = await CompeteExamControllerService.listCompeteExamByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    state: competitionSelection.value
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.examList.push(...res.data.records);
        data.examList = data.examList.filter((item, index) => {
          return data.examList.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}


const onLoadCompetitionData = async () => {
  const res = await CompetitionControllerService.listCompetitionByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    competitionStatus: competitionSelection.value
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.competitionList.push(...res.data.records);
        data.competitionList = data.competitionList.filter((item, index) => {
          return data.competitionList.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onLoadPostData = async () => {
  const res = await PostControllerService.listPostByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    status: competitionSelection.value
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.postList.push(...res.data.records);
        data.postList = data.postList.filter((item, index) => {
          return data.postList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onLoadProductData = async () => {
  const res = await ProductInfoControllerService.listProductInfoUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    status: competitionSelection.value
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.productList.push(...res.data.records);
        data.productList = data.productList.filter((item, index) => {
          return data.productList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onLoadTeamData = async () => {
  const res = await TeamControllerService.listTeamVoByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    status: competitionSelection.value
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.teamList.push(...res.data.records);
        data.teamList = data.teamList.filter((item, index) => {
          return data.teamList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}
const onLoadQuestionBankData = async () => {
  const res = await QuestionBankControllerService.listQuestionBankUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.questionBankList.push(...res.data.records);
        data.questionBankList = data.questionBankList.filter((item, index) => {
          return data.questionBankList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}


const onLoadComment = async () => {
  const res = await CommentControllerService.listCommentByPageUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    status: competitionSelection.value
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.commentList.push(...res.data.records);
        data.commentList = data.commentList.filter((item, index) => {
          return data.commentList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}
const onLoadTagData = async () => {
  const res = await TagControllerService.listTagUsingPost({
    current: data.initPageNum,
    searchText: data.searchText,
    status: competitionSelection.value
  })
  if (res.code === 0) {
    if (res.data.records.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.tagList.push(...res.data.records);
        data.tagList = data.tagList.filter((item, index) => {
          return data.tagList.findIndex(obj => obj.id === item.id) === index;
        });
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const onLoad = () => {
  loading.value = true;
  switch (value.value) {
    case 'user':
      onLoadUserData()
      break;
    case 'post':
      onLoadPostData()
      break;
    case 'comment':
      onLoadComment()
      break;
    case 'team':
      onLoadTeamData()
      break;
    case "product":
      onLoadProductData()
      break;
    case "competition":
      onLoadCompetitionData()
      break;
    case "questionBank":
      onLoadQuestionBankData()
      break;
    case "paper":
      onLoadPaperData()
      break;
    case "exam":
      onLoadExamData()
      break;
    case 'order':
      onLoadOrderData()
      break
    case 'tag':
      onLoadTagData()
      break
  }
}

</script>

<style scoped>

</style>
