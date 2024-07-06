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
      <van-button @click="add" round block type="primary" native-type="submit">
        添加题库
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";
import {QuestionBankControllerService, QuestionBankVo} from "../../services/saiyou-backend";
import {showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();
const data = reactive<{
  questionBank: QuestionBankVo
}>({
  questionBank: {},
})

const add = async () => {
  const res = await QuestionBankControllerService.addQuestionBankUsingPost(data.questionBank);
  if (res.code === 0 && res.data) {
    showSuccessToast("添加成功")
    router.push("/system")
  }
}
</script>

<style scoped>

</style>
