<template>
  <div class="mx-4">
    <div class="h-4"></div>
    <van-cell-group class=" border mt-4" inset>
      <van-field
          v-model="data.product.name"
          name="phone"
          label="商品名称："
          placeholder="商品名称"
          input-align="right"
          :rules="[{ required: true, message: '请填写商品名称' }]"
      />
      <van-field
          v-model="data.product.total"
          name="phone"
          input-align="right"
          label="商品价格："
          placeholder="商品价格（积分个数）"
          :rules="[{ required: true, message: '请填写商品价格（积分个数）' }]"
      />
      <van-field
          v-model="data.product.description"
          name="phone"
          label="商品描述："
          placeholder="商品描述"
          input-align="right"
      />
      <van-field name="uploader" input-align="right"
                 label="商品图片:">
        <template #input>
          <van-uploader
              multiple
              :before-read="beforeRead"
              max-count="1"
              :after-read="afterRead"
              v-model="data.fileList"
              :deletable="true"
          />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button @click="add" round block type="primary" native-type="submit">
        添加商品
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";
import {
  FileControllerService,
  ProductInfoAddRequest,
  ProductInfoControllerService
} from "../../services/saiyou-backend";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();
const data = reactive<{
  fileList: any[],
  product: ProductInfoAddRequest
}>({
  product: {},
  fileList: []
})

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

const afterRead = async (file) => {
  const res = await FileControllerService.uploadFileUsingPost(file.file, "user_avatar")
  if (res.data && res.code === 0) {
    data.fileList = [{url: res.data}]
    return true
  } else {
    data.fileList = []
  }
};

const add = async () => {
  data.product.img = data.fileList ? data.fileList[0].url : ''
  const res = await ProductInfoControllerService.addProductInfoUsingPost(data.product);
  if (res.code === 0 && res.data) {
    showSuccessToast("添加成功")
    router.push("/product")
  }
}
</script>

<style scoped>

</style>
