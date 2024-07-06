<template>
  <div class="mt-2">
    <div class="h-2"></div>
    <div v-if="!data.error" class="rounded pt-2 mx-4 border px-3">
      <div class="flex justify-between items-center">
        <div class="mb-2 text"> 考试时长：{{ data.userPaper.totalTime }}分钟</div>
        <!--        <div class="">-->
        <!--          <a-statistic-countdown-->
        <!--              :value="data.totalTime"-->
        <!--          />-->
        <!--        </div>-->
      </div>
      <hr class="mb-2"/>
      <div v-for="(question, index) in data.userPaper.questionList" :key="question.id" class="mb-4">
        <div class="flex justify-between items-center">
          <div>
            {{ question.content }}
          </div>
        </div>
        <div class="flex justify-between mt-2">
          <div v-if="question.type === 1" class="text-sm text-gray-500">单选题</div>
          <div v-else-if="question.type === 2" class="text-sm text-gray-500">多选题</div>
          <div v-else-if="question.type === 3" class="text-sm text-gray-500">判断题</div>
          <div v-else-if="question.type === 4" class="text-sm text-gray-500">主观题</div>
        </div>
        <div v-if="question.type !== 4">
          <div v-if="question.type===2" v-for="(answer, answerIndex) in question.questionAnswerList" :key="answer.id"
               class="mt-2 rounded">
            <label class="flex gap-2">
              <input type="radio" @click="updateSelete(answer,index)" :name="answer.questionId+''+answerIndex"
                     :value="true"
                     v-model="answer.select">
              {{ String.fromCharCode(65 + answerIndex) }}. {{ answer.content }}
            </label>
          </div>
          <div v-else v-for="(answer, answerIndex) in question.questionAnswerList" :key="answer.id"
               class="mt-2 rounded">
            <label class="flex gap-2">
              <input type="radio" @click="updateSelete(answer,index)" :name="answer.questionId"
                     :value="true"
                     v-model="answer.select">
              {{ String.fromCharCode(65 + answerIndex) }}. {{ answer.content }}
            </label>
          </div>
        </div>
        <div v-else><textarea
            class="mt-2 p-2 remove-scrollbar w-full rounded border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out">
            {{ question.questionAnswerList[0].content}}
         </textarea>
        </div>
      </div>
      <div class="mb-3">
        <van-button type="primary" @click="submit" size="small" plain block>提交试卷</van-button>
      </div>
    </div>
    <div v-else>
      <van-empty description="考试已结束或已提交"/>
    </div>
    <div class="h-[50px]"></div>
  </div>
  <van-dialog v-model:show="show" title="提交成功！">
    <div class="p-2">
      <div class="flex justify-center">得分：{{ data.sumbit.totalScore }}分</div>
      <div class="flex justify-center">总耗时：{{ data.sumbit.userTime }}分钟</div>
    </div>
  </van-dialog>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {message} from "ant-design-vue";
import {CompeteExamControllerService, ExamPaperControllerService} from "../../services/saiyou-backend";

const show = ref(false);
const router = useRouter();
const route = useRoute();
const data = reactive({
  userPaper: {},
  totalTime: 0,
  sumbit: {},
  error: false
})
const checked = ref([]);

const checkboxRefs = ref([]);
const toggle = (index) => {
  checkboxRefs.value[index].toggle();
};

let set = null;

onMounted(async () => {
  if (!route.query.id) {
    message.error('参数错误')
    return
  }
  const dataLine = localStorage.getItem('userPaper:' + route.query.id);
  if (dataLine) {
    data.totalTime = Date.now() + 1000 * Number(dataLine) * 60 * 60
    setTimeout(() => {
      localStorage.setItem('userPaper:' + route.query.id, dataLine)
    }, 1000)
  }
  const res = await ExamPaperControllerService.listUserPaperVoByIdUsingPost(route.query.id)
  if (res.code === 0 && res.data) {
    data.userPaper = res.data
    if (!dataLine && res.data.state === 'open') {
      console.log(dataLine, '2')
      data.totalTime = Date.now() + 1000 * res.data.totalTime * 60 * 60
      setTimeout(() => {
        localStorage.setItem('userPaper:' + route.query.id, res.data.totalTime)
      }, 1000)
    }
  } else {
    data.error = true
    localStorage.removeItem('userPaper:' + route.query.id)
  }
  if (!data.error) {
    set = setInterval(async () => {
      const res = await ExamPaperControllerService.getUserPaperStatusUsingGet(data.userPaper.id)
      if (res.code === 0) {
        if (res.data === false) {
          await submit()
          data.error = true
        }
      }
    }, 10000)
  }
})


const submit = async () => {
  await CompeteExamControllerService.saveAnswerUsingPost({
    id: data.userPaper.id,
    userAnswerList: data.userPaper.questionList
        .flatMap(item => item.questionAnswerList.filter(answer => answer.select || item.type === 4))
        .map(answer => {
          return {
            questionId: answer.questionId,
            answerId: answer.id,
            subjectiveAnswer: answer.content
          };
        })
  });
  const res = await CompeteExamControllerService.submitPaperUsingPost({
    id: data.userPaper.id
  });
  if (res.code === 0 && res.data) {
    data.sumbit = res.data
    show.value = true
  } else {
    if (set) clearTimeout(set)
  }
}


const selectedAnswer = ref('')
const updateSelete = async (answer, index) => {
  const questionListElement = data.userPaper.questionList[index];
  if (questionListElement.type === 2) {
    answer.select = !answer.select
  } else {
    answer.select = true
    questionListElement.questionAnswerList.forEach((item) => {
      if (item.id !== answer.id) {
        item.select = false
      }
    })
  }
  const res = await CompeteExamControllerService.saveAnswerUsingPost({
    id: data.userPaper.id,
    userAnswerList: data.userPaper.questionList
        .flatMap(item => item.questionAnswerList.filter(answer => answer.select || item.type === 4))
        .map(answer => {
          return {
            questionId: answer.questionId,
            answerId: answer.id,
            subjectiveAnswer: answer.content
          };
        })
  });
}
</script>

<style scoped>
textarea {
  resize: none;
}
</style>
