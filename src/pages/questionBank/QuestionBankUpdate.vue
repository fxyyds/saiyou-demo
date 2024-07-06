<template>
  <div class="mx-4">
    <div class="h-4"></div>
    <van-cell-group class=" border mt-4" inset>
      <van-field
          v-model="data.questionBank.title"
          name="phone"
          label="题库名称："
          placeholder="题库名称"
          input-align="right"
          :rules="[{ required: true, message: '请填写题库名称' }]"
      />
      <van-field
          v-model="data.questionBank.remark"
          name="phone"
          label="题库描述："
          placeholder="题库描述"
          input-align="right"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button @click="update" round block type="primary" native-type="submit">
        更新题库
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive} from "vue";
import {QuestionBankControllerService, QuestionBankVo} from "../../services/saiyou-backend";
import {showSuccessToast} from "vant";
import {message} from "ant-design-vue";

const router = useRouter();
const route = useRoute();
const data = reactive<{
  questionBank: QuestionBankVo
}>({
  questionBank: {},
})

const update = async () => {
  const res = await QuestionBankControllerService.updateQuestionBankUsingPost(data.questionBank);
  if (res.code === 0 && res.data) {
    showSuccessToast("更新成功")
    router.push("/system")
  }
}

onMounted(async () => {
  const id = route.params.id as string;
  if (!id) {
    message.error("参数错误")
    return;
  }
  const res = await QuestionBankControllerService.getQuestionBankVoByIdUsingGet(id);
  if (res.code === 0 && res.data) {
    data.questionBank = res.data;
  }
})
</script>

<style scoped>

</style>
