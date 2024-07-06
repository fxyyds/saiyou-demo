<template>
  <div class="mx-4">
    <div class="h-4"></div>
    <van-cell-group class="border mt-4" inset>
      <van-field
          v-model="data.question.content"
          name="phone"
          label="题目名称："
          placeholder="题目名称"
          input-align="right"
          :rules="[{ required: true, message: '请填写题目名称' }]"
      />
      <van-field input-align="right"
                 name="radio" label="题目类型:">
        <template #input>
          <van-radio-group v-model="checked" direction="horizontal">
            <van-radio @click="typeChange" name="1">单选题</van-radio>
            <br/>
            <van-radio @click="typeChange" name="2">多选题</van-radio>
            <br/>
            <van-radio @click="typeChange" name="3">判断题</van-radio>
            <br/>
<!--            <van-radio @click="typeChange" name="4">主观题</van-radio>-->
          </van-radio-group>
        </template>
      </van-field>
      <soan class="text-xs ml-4 text-red-500">选中表示正确答案</soan>
      <van-field label="答案：">
        <template #input>
          <van-radio-group v-if="checked==='1'||checked==='3'" v-model="answerChecked" class="space-y-2">
            <div class="flex" v-for="(answer, index) in data.question.questionAnswerList">
              <van-radio :name="index">
                {{ String.fromCharCode(65 + index) }}.
              </van-radio>
              <input v-model="answer.content" placeholder="请输入答案内容">
              <div @click="removeAnswer(index)"
                   v-if="checked==='1'"
                   class="cursor-pointer text-xs border px-2 py-1 rounded w-fit border-[#ee0a24] text-[#ee0a24]">
                移除答案
              </div>
            </div>
            <van-button @click="pushAnswer" v-if="checked==='1'" plain size="small">添加答案</van-button>
          </van-radio-group>
          <van-checkbox-group v-if="checked==='2'" v-model="groupChecked" class="space-y-2">
            <div class="flex" v-for="(answer, index) in data.question.questionAnswerList">
              <van-checkbox :name="index" shape="square" @click.stop>
                {{ String.fromCharCode(65 + index) }}.
              </van-checkbox>
              <input v-model="answer.content" placeholder="请输入答案内容">
              <div @click="removeAnswer(index)"
                   class="cursor-pointer text-xs border px-2 py-1 rounded w-fit border-[#ee0a24] text-[#ee0a24]">
                移除答案
              </div>
            </div>
            <van-button plain size="small" @click="pushAnswer">添加答案</van-button>
          </van-checkbox-group>
          <textarea
              placeholder="请输入答案内容"
              v-if="checked==='4'"
              v-model="data.question.questionAnswerList[0].content"
              class="mt-2 p-2 remove-scrollbar w-full rounded border border-gray-300 bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition duration-150 ease-in-out"/>
        </template>
      </van-field>
      <div class="p-2">
        <van-button block plain @click="update">更新题目</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watchEffect} from "vue";
import {message} from "ant-design-vue";
import {QuestionControllerService} from "../../services/saiyou-backend";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();
const data = reactive({
  question: {}
});

const groupChecked = ref([]);
const removeAnswer = (index) => {
  data.question.questionAnswerList.splice(index, 1);
}
const pushAnswer = () => {
  data.question.questionAnswerList.push({
    content: '',
    isRight: 0
  });
}
const load = ref(false);
const typeChange = (val) => {
  switch (checked.value) {
    case '1':
    case '3':
      data.question.questionAnswerList = [
        {
          content: "正确",
          isRight: 1
        },
        {
          content: "错误",
          isRight: 0
        }
      ];
      break;
    case '2':
      data.question.questionAnswerList = [
        {
          content: "",
          isRight: 0
        },
        {
          content: "",
          isRight: 0
        }
      ];
      break
    case '4':
      data.question.questionAnswerList = [
        {
          content: "",
          isRight: 1
        }
      ];
      break;
    default:
      break;
  }
}

watchEffect(async () => {
  if (!route.query.id) {
    message.error("参数错误")
    return;
  }
  load.value = true;
  const res = await QuestionControllerService.getQuestionVoByIdUsingGet(route.query.id);
  if (res.code === 0 && res.data) {
    data.question = res.data;
    console.log(data.question)
    data.question.questionAnswerList = res.data.questionAnswerList;
    console.log(data.question.questionAnswerList);
    const type = res.data.type;
    switch (type) {
      case 1:
        answerChecked.value = res.data.questionAnswerList.findIndex(item => item.isRight === 1);
        checked.value = '1';
        break;
      case 3:
        checked.value = '3';
        answerChecked.value = res.data.questionAnswerList.findIndex(item => item.isRight === 1);
        break;
      case 2:
        checked.value = '2';
        groupChecked.value = res.data.questionAnswerList.filter(item => item.isRight === 1).map(item => res.data.questionAnswerList.indexOf(item));
        break;
      case 4:
        checked.value = '4';
        break;
    }
  }
})


const answerChecked = ref(0);

const checked = ref("1");

const update = async () => {
  if (!checked.value) {
    message.error("请选择题目类型")
    return;
  }
  switch (checked.value) {
    case '1':
    case '3':
      data.question.questionAnswerList.forEach((item, index) => {
        if (!item.content) {
          message.error("答案内容不能为空")
          return;
        }
        item.isRight = index === answerChecked.value ? 1 : 0;
      })
      break;
    case '2':
      if (!groupChecked.value || groupChecked.value.length === 0) {
        message.error("至少选择一个正确答案")
        return;
      }
      data.question.questionAnswerList.forEach((item, index) => {
        if (!item.content) {
          message.error("答案内容不能为空")
          return;
        }
        item.isRight = groupChecked.value.includes(index) ? 1 : 0;
      })
      break;
    case '4':
      break;
  }
  const res = await QuestionControllerService.updateQuestionUsingPost({
    content: data.question.content,
    questionAnswerList: data.question.questionAnswerList,
    type: Number(checked.value),
    id: data.question.id
  });
  if (res.code === 0 && res.data) {
    message.success("更新成功")
    router.push("/question/" + route.query.questionBankId)
  }
}
//
// onMounted(async () => {
//
// })

</script>

<style scoped>
textarea {
  resize: none;
}
</style>
