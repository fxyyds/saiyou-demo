<template>
  <div class="mx-4 mt-6">
    <div class="fixed top-[75px] bottom-[54px] left-4 right-4 overflow-auto">
      <div class="flex justify-between items-center mx-1">
        <div @click="router.back()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6 stroke-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
          </svg>
        </div>
        <div>
          <button
              @click="onsubmit"
              :class="data.post.content.length<=0?'bg-gray-200 text-gray-400':'text-white bg-green-500 hover:bg-green-600'"
              :disabled="data.post.content.length<=0"
              class="flex-1 px-3 py-1 rounded text-sm"
          >发表
          </button>
        </div>
      </div>
      <div class="flex min-h-32 mt-2">
        <div class="flex-1 mx-2">
          <n-input
              placeholder="这一刻想说..."
              type="textarea"
              v-model:value="data.post.content"
              style="--n-border-hover:0;--n-border:0;--n-box-shadow-focus:0;--n-border-focus:0;--n-padding-left:0;margin-left:0"
              class="remove-scrollbar"
              size="small"
              :autosize="{
                minRows: 3,
                 maxRows: 6
               }"
          />
        </div>
      </div>
      <div class="ml-3 mt-2">
        <van-uploader
            :before-read="beforeRead"
            max-count="9"
            :after-read="afterRead"
            v-model="data.fileList"
            :deletable="false"
        />
      </div>
      <div class="mx-3 text-sm text-gray-400 text-black">帖子标签:</div>
      <van-cell class="-ml-1">
        <div class="items-center flex">
          <div class="flex items-center justify-end">
            <p>
              <n-dynamic-tags v-model:value="data.post.tags" :max="6"/>
            </p>
          </div>
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {reactive} from "vue";
import {FileControllerService, PostControllerService} from "../../services/saiyou-backend";
import {showFailToast} from "vant";
import {message} from "ant-design-vue";

const router = useRouter();
const route = useRoute();
const data = reactive({
  post: {content: '', imgList: []},
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
  const res = await FileControllerService.uploadFileUsingPost(file.file, "post_image")
  if (res.data && res.code === 0) {
    data.post.imgList.push(res?.data)
  }
};

const onsubmit = async () => {
  if (!data.post.content) {
    message.error("请输入内容")
    return
  }
  const res = await PostControllerService.addPostUsingPost(data.post)
  if (res.data && res.code === 0) {
    message.success("发布成功")
   router.push('/dynamic')
  }
}
</script>

<style scoped>


/deep/ .van-uploader__preview-image {
  height: 6rem;
  width: 6rem;
}

/deep/ .van-uploader__upload {
  height: 6rem;
  width: 6rem;
}

.content {
  padding: 16px 16px 260px;
}
</style>
