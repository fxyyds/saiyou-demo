<template>
  <div class="">
    <div class="h-4"></div>
    <van-cell-group class=" border mt-4" inset>
      <van-field
          v-model="data.exam.examName"
          name="phone"
          label="考试名称："
          placeholder="考试名称"
          input-align="right"
          :rules="[{ required: true, message: '请填写考试名称' }]"
      />
      <van-field
          v-model="data.exam.qualifyScore"
          name="phone"
          label="及格分数："
          placeholder="及格分数"
          input-align="right"
      />
      <van-field
          v-model="data.exam.totalTime"
          name="phone"
          label="考试时长："
          placeholder="考试总时长（分钟）"
          input-align="right"
      />
      <van-field
          v-model="data.exam.totalScore"
          name="phone"
          label="总分数："
          readonly
          placeholder="考试总分数（选择试卷获取）"
          input-align="right"
      />
      <van-field
          v-model="data.exam.description"
          rows="2"
          autosize
          input-align="right"
          label="考试描述："
          placeholder="考试描述信息"
          type="textarea"
          maxlength="50"
          show-word-limit
      />
      <van-field
          is-link
          v-model="fieldValue"
          readonly
          name="picker"
          placeholder="请选择考试试卷"
          label="选择试卷"
          input-align="right"
          @click="seletePaper=true"
      />
    </van-cell-group>
    <div class="mx-4 mt-2">
      <van-button size="small" @click="add" plain block type="primary" native-type="submit">
        更新试卷
      </van-button>
    </div>
    <van-action-sheet :close-on-click-action="false" v-model:show="seletePaper">
      <div class="pt-2">
        <div v-if="data.paperList &&data.paperList.length>0"
        >
          <van-picker
              :columns-field-names="customFieldName"
              :columns="data.paperList"
              @cancel="seletePaper = false"
              @confirm="onConfirm"
          />
        </div>
        <div v-else class="h-44 mt-6 col-span-3">
          <n-empty description="没找到试卷哦~">
            <template #extra>
              <!--                todo-->
              <n-button @click="router.push('/paper/add')" size="small">
                去创建
              </n-button>
            </template>
          </n-empty>
        </div>
      </div>
    </van-action-sheet>
  </div>
  <div class="h-[50px]"></div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {computed,watchEffect, onMounted, reactive, ref} from "vue";
import {CompeteExamControllerService, ExamPaperControllerService} from "../../services/saiyou-backend";
import {message} from "ant-design-vue";

const router = useRouter();
const route = useRoute();
const data = reactive({
  exam: {},
  paperList: [],
  initPageNum: 1,
})
const seletePaper = ref(false)

const customFieldName = {
  text: 'title',
  value: 'id',
};
const fieldValue = ref('');

const onConfirm = ({selectedOptions}) => {
  data.exam.paperId = selectedOptions[0].id;
  data.exam.totalScore = selectedOptions[0].totalScore;
  seletePaper.value = false;
  fieldValue.value = selectedOptions[0].title;
};
const loadPaper = async () => {
  const res = await ExamPaperControllerService.listExamPaperByPageUsingPost({
    pageSize: 1000,
  })
  if (res.code === 0 && res.data) {
    data.paperList = res.data.records
  }
}
const add = async () => {
  if (!data.exam.paperId) {
    message.error("请选择试卷")
    return
  }
  if (isNaN(data.exam.qualifyScore)) {
    message.error("及格分数必须为数字")
    return
  }
  if (isNaN(data.exam.totalTime)) {
    message.error("考试时长必须为数字")
    return
  }
  if (Number(data.exam.qualifyScore) > Number(data.exam.totalScore)) {
    message.error("及格分数不能大于总分数")
    return
  }
  const res = await CompeteExamControllerService.updateCompeteExamUsingPost(data.exam);
  if (res.code === 0 && res.data) {
    message.success("更新成功")
    router.push("/system")
  }
}
onMounted(() => {
  if (!route.params.id) {
    message.error("参数错误")
    return;
  }
  loadPaper()
  loadExam()
})

watchEffect(() => {
  if(data.paperList&&data.paperList.length>0){
    const filterElement = data.paperList.filter(item => item.id === data.exam.paperId)[0];
    if (filterElement) {
      fieldValue.value = filterElement.title
    }
  }
})

const loadExam = async () => {
  const res = await CompeteExamControllerService.getCompeteExamVoByIdUsingGet(route.params.id)
  if (res.code === 0 && res.data) {
    data.exam = res.data
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
