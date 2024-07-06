<template>
  <van-sticky :offset-top="65">
    <search @searchResult="handleSearchResult" show>
      <div class="h-[34px] flex items-center">
        <van-button class="h-[34px]" size="small" @click="toAdd" type="primary">添加
        </van-button>
      </div>
    </search>
  </van-sticky>
  <div class="mx-4">
    <van-list
        class="space-y-2 pt-3"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了~"
        @load="onLoad"
    >
      <div class="mt-2">
        <div v-for="(question, index) in data.questionList" :key="question.id" class="mb-4">
          <div class="flex justify-between items-center text-lg font-bold">
            <div class="whitespace-pre-wrap">
              {{ index + 1 }}. {{ question.content }}
            </div>
            <div class="gap-1 flex items-center flex-wrap ">
              <div @click="router.push({
              path: '/question/update',
                query: {
                  id: question.id,
                  questionBankId: route.params.id
                }
              })" class="cursor-pointer text-xs border px-2 py-1 rounded w-fit border-[#1989fa] text-[#1989fa]">
                修改
              </div>
              <div @click="deleteQuestion(question.id)"
                   class="cursor-pointer text-xs border px-2 py-1 rounded w-fit border-[#ee0a24] text-[#ee0a24]">
                删除
              </div>
            </div>
          </div>
          <div v-if="question.type === 1" class="text-sm text-gray-500">单选题</div>
          <div v-else-if="question.type === 2" class="text-sm text-gray-500">多选题</div>
          <div v-else-if="question.type === 3" class="text-sm text-gray-500">判断题</div>
          <div v-else-if="question.type === 4" class="text-sm text-gray-500">主观题</div>
          <div v-if="question.type !== 4">
            <div v-for="(answer, answerIndex) in question.questionAnswerList" :key="answer.id"
                 class="mt-2 p-2 rounded"
                 :class="{'bg-green-200': answer.isRight}">
              <label>{{ String.fromCharCode(65 + answerIndex) }}. {{ answer.content }}</label>
            </div>
          </div>
          <div v-else>
       <textarea
           readonly
           class="mt-2 p-2 remove-scrollbar w-full rounded border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out">
  {{ question.questionAnswerList[0].content}}
</textarea>
          </div>
        </div>
      </div>
    </van-list>
  </div>
  <div class="h-[50px]"></div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {QuestionBankControllerService, QuestionControllerService} from "../../services/saiyou-backend";
import Search from "../../components/search/Search.vue";
import {message} from "ant-design-vue";
import {showConfirmDialog} from "vant";

const router = useRouter();
const route = useRoute();
const data = reactive({
  questionList: [],
  initPageNum: 1,
  searchText: ''
})

const handleSearchResult = async (val) => {
  data.searchText = val;
  const res = await QuestionBankControllerService.listQuestionBankAndQuestionByIdUsingPost({
    id: route.params.id,
    searchText: data.searchText
  });
  if (res.code === 0 && res.data) {
    data.questionList = res.data.questionList
    if (res.data.current * res.data.questionList.length >= res.data.total) {
      finished.value = true;
    }
  }
}

const toAdd = () => {
  if (!route.params.id) {
    message.error("参数错误")
    return
  }
  router.push({
    path: "/question/add",
    query: {
      questionBankId: route.params.id
    }
  })
}
const deleteQuestion = (id) => {
  showConfirmDialog({
    title: '删除题目',
    message: '请确认是否删除该题目'
  }).then(async () => {
    const res = await QuestionControllerService.deleteQuestionUsingPost({
      id: id
    });
    if (res.code === 0 && res.data) {
      message.success("删除成功")
      data.questionList = data.questionList.filter(item => item.id !== id);
    }
  }).catch(() => {
    // on cancel
  });
}


const loading = ref(false);
const finished = ref(false);
const onLoad = async () => {
  loading.value = true;
  const res = await QuestionBankControllerService.listQuestionBankAndQuestionByIdUsingPost({
    id: route.params.id,
    current: data.initPageNum,
    searchText: data.searchText
  });
  if (res.code === 0) {
    if (res.data.questionList.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.questionList.push(...res.data.questionList);
        data.questionList = data.questionList.filter((item, index) => {
          return data.questionList.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}
</script>

<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}

textarea {
  resize: none;
}
</style>
