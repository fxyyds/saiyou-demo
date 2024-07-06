<template>
  <div class="">
    <div class="h-4"></div>
    <van-cell-group class=" border mt-4" inset>
      <van-field
          v-model="data.paper.title"
          name="phone"
          label="试卷名称："
          placeholder="试卷名称"
          input-align="right"
          :rules="[{ required: true, message: '请填写试卷名称' }]"
      />
      <van-field
          v-model="data.paper.qualifyScore"
          name="phone"
          label="及格分数："
          placeholder="及格分数"
          input-align="right"
      />
      <van-field
          v-model="data.paper.totalScore"
          name="phone"
          readonly
          label="总分数："
          placeholder="总分数"
          input-align="right"
      />
      <van-field
          is-link
          readonly
          name="picker"
          label="选择题目"
          @click="seleteQuestion"
      />
    </van-cell-group>
    <div class="mx-4 mt-2">
      <van-button size="small" @click="add" plain block type="primary" native-type="submit">
        添加试卷
      </van-button>
    </div>
    <div class="mx-4">
      <div class="mt-2">
        <div v-for="(question, index) in data.questionList" :key="question.id" class="mb-4">
          <div class="flex justify-between items-center text-lg font-bold">
            <div>
              {{ index + 1 }}. {{ question.content }}
            </div>
          </div>
          <div class="flex justify-between mt-2">
            <div v-if="question.type === 1" class="text-sm text-gray-500">单选题</div>
            <div v-else-if="question.type === 2" class="text-sm text-gray-500">多选题</div>
            <div v-else-if="question.type === 3" class="text-sm text-gray-500">判断题</div>
<!--            <div v-else-if="question.type === 4" class="text-sm text-gray-500">主观题</div>-->
            <div class="gap-1 flex items-center self-end">
              <div class="border px-1 py-0.5 rounded">
                分值：
                <input v-model="question.score" class="w-8"/>
              </div>
              <div @click="deleteQuestion(question.id)"
                   class="cursor-pointer text-xs border px-2 py-1 rounded w-fit border-[#ee0a24] text-[#ee0a24]">
                删除
              </div>
            </div>
          </div>

          <div v-if="question.type !== 4">
            <div v-for="(answer, answerIndex) in question.questionAnswerList" :key="answer.id"
                 class="mt-2 p-2 rounded"
                 :class="{'bg-green-200': answer.isRight}">
              <label>{{ String.fromCharCode(65 + answerIndex) }}. {{ answer.content }}</label>
            </div>
          </div>
          <div v-else><textarea
              readonly
              class="mt-2 p-2 remove-scrollbar w-full rounded border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out">
            {{ question.questionAnswerList[0].content}}
         </textarea>
          </div>
        </div>
      </div>
    </div>
    <van-action-sheet :close-on-click-action="false" v-model:show="showPicker">
      <div class="pt-2">
        <van-field
            v-model="questionNameSearchText"
            label="搜索："
            @keyup.enter="questionNameSearch"
            placeholder="请输入关键词"
        />
        <div class="mx-4">
          <van-button plain block size="small" @click="seleteQuestionList">确认选择</van-button>
        </div>
        <div class="rounded  mx-4">
          <van-checkbox-group v-model="checked">
            <van-list
                v-if="data.back.questionList &&data.back.questionList.length>0"
                class="space-y-2 pt-3"
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了~"
                @load="onLoad"
            >
              <div v-for="(question, index) in data.back.questionList" :key="question.id" class="mb-4">
                <div class="flex justify-between items-center" @click="toggle(index)">
                  <div>
                    {{ question.content }}
                  </div>
                  <van-checkbox
                      :name="question"
                      :ref="el => checkboxRefs[index] = el"
                      @click.stop
                  />
                </div>
                <div class="flex justify-between mt-2">
                  <div v-if="question.type === 1" class="text-sm text-gray-500">单选题</div>
                  <div v-else-if="question.type === 2" class="text-sm text-gray-500">多选题</div>
                  <div v-else-if="question.type === 3" class="text-sm text-gray-500">判断题</div>
                  <div v-else-if="question.type === 4" class="text-sm text-gray-500">主观题</div>
                </div>
                <div v-if="question.type !== 4">
                  <div v-for="(answer, answerIndex) in question.questionAnswerList" :key="answer.id"
                       class="mt-2 p-2 rounded"
                       :class="{'bg-green-200': answer.isRight}">
                    <label>{{ String.fromCharCode(65 + answerIndex) }}. {{ answer.content }}</label>
                  </div>
                </div>
                <div v-else><textarea
                    readonly
                    class="mt-2 p-2 remove-scrollbar w-full rounded border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out">
            {{ question.questionAnswerList[0].content}}
         </textarea>
                </div>
              </div>
            </van-list>

            <!--          <van-cell-->
            <!--              v-for="(item, index) in data.back.questionList"-->
            <!--              clickable-->
            <!--              :key="item"-->
            <!--              :title="'判断题：'+item.content"-->
            <!--              @click="toggle(index)"-->
            <!--          >-->
            <!--            <template #right-icon>-->
            <!--              <van-checkbox-->
            <!--                  :name="item"-->
            <!--                  :ref="el => checkboxRefs[index] = el"-->
            <!--                  @click.stop-->
            <!--              />-->
            <!--            </template>-->
            <!--          </van-cell>-->
            <div v-else class="h-44 mt-6 col-span-3">
              <n-empty description="没找到题目哦~">
                <template #extra>
                  <!--                todo-->
                  <n-button @click="router.push('/system')" size="small">
                    去题库创建
                  </n-button>
                </template>
              </n-empty>
            </div>
          </van-checkbox-group>
        </div>
      </div>

    </van-action-sheet>
  </div>
  <div class="h-[50px]"></div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed, reactive, ref, watchEffect} from "vue";
import {ExamPaperControllerService, QuestionBankControllerService, QuestionBankVo} from "../../services/saiyou-backend";
import {showSuccessToast} from "vant";

const showPicker = ref(false);

const router = useRouter();
const route = useRoute();
const data = reactive<{
  paper: QuestionBankVo
} | any>({
  questionList: [],
  back: {questionList: []},
  paper: {},
  initPageNum: 1,
})
const checked = ref([]);
const deleteQuestion = (id) => {
  data.questionList = data.questionList.filter((item) => item.id !== id);
}
const checkboxRefs = ref([]);
const toggle = (index) => {
  checkboxRefs.value[index].toggle();
};

const seleteQuestionList = () => {
  data.questionList.push(...checked.value.map(q => {
    return {
      ...q,
      score: 0
    }
  }))
  showPicker.value = false;
}

const add = async () => {
  const res = await ExamPaperControllerService.addExamPaperUsingPost({
    title: data.paper.title,
    qualifyScore: data.paper.qualifyScore,
    paperQuestionList: data.questionList.map(item => {
      return {
        questionId: item.id,
        score: item.score
      }
    })
  });
  if (res.code === 0 && res.data) {
    showSuccessToast("添加成功")
    router.push("/paper/"+res.data)
  }
}

watchEffect(() => {
  data.paper.totalScore = data.questionList.reduce((prev, cur) => {
    return Number(prev) + Number(cur.score)
  }, 0)
});

const loading = ref(false);
const finished = ref(false);
const onLoad = async () => {
  loading.value = true;
  const res = await QuestionBankControllerService.listQuestionBankAndQuestionByIdUsingPost({
    id: route.params.id,
    current: data.initPageNum,
    searchText: questionNameSearchText.value
  });
  if (res.code === 0) {
    if (res.data.questionList.length <= 0) {
      finished.value = true;
      return
    } else {
      setTimeout(() => {
        data.back.questionList.push(...res.data.questionList);
        data.back.questionList = data.back.questionList.filter((item, index) => {
          return data.back.questionList.findIndex(obj => obj.id === item.id) === index;
        })
        data.initPageNum += 1;
        loading.value = false;
      }, 200)
    }
  }
}

const questionNameSearch = () => {
  data.back.questionList = [];
  onLoad()
}
const questionNameSearchText = ref("");

const seleteQuestion = () => {
  showPicker.value = true;
  onLoad()
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
