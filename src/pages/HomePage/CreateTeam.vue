<template>
  <div class="mt-2 mx-4">
    <div>
        <van-cell>
          <div class="items-center justify-between flex-col flex">
            <div justify="space-between" class="flex items-center justify-end">
              <van-uploader
                  :before-read="beforeRead"
                  max-count="1" reupload
                  :after-read="afterRead"
                  v-model="data.fileList"
                  :deletable="false"
              />
            </div>
          </div>
        </van-cell>
        <van-field
            required
            v-model="data.team.teamName"
            type="text"
            name="队伍名称"
            input-align="right"
            label="队伍名称"
            placeholder="队伍名称"
            :rules="[{ required: true, message: '赛事名称' }]"
        />
        <van-field
            required
            v-model="data.team.maxNum"
            name="队伍最大人数"
            label="最大人数"
            input-align="right"
            placeholder="队伍最大人数"
            :rules="[{ required: true, message: '请填写队伍最大人数' }]"
        />
        <van-field required name="teamStatus" input-align="right" label="队伍状态">
          <template #input>
            <van-radio-group v-model="checked" direction="horizontal">
              <van-radio :name="0">公开</van-radio>
              <van-radio :name="1">加密</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="checked===1"
            v-model="data.team.teamPassword"
            type="teamPassword"
            required
            input-align="right"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-cell>
          <div class="items-center justify-between flex">
            <div class="text-black">队伍标签</div>
            <div class="flex items-center justify-end">
              <p>
                <n-dynamic-tags v-model:value="data.team.tags" :max="3"/>
              </p>
            </div>
          </div>
        </van-cell>
        <van-cell>
          <div class="items-center justify-between flex">
            <div class="text-black">想找标签</div>
            <div class="flex items-center justify-end">
              <p>
                <n-dynamic-tags v-model:value="data.team.wantToTags" :max="3"/>
              </p>
            </div>
          </div>
        </van-cell>
        <van-field
            v-model="data.team.announce"
            rows="3"
            autosize
            maxlength="40"
            show-word-limit
            label="队伍公告"
            type="textarea"
            placeholder="请输入队伍公告"
        />
      <div class="mt-4">
        <van-button block plain hairline type="primary" @click="onSumbit">创建队伍</van-button>
      </div>
    </div>
  </div>
  <div class="mb-[56px]"></div>

</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {FileControllerService, TeamControllerService} from "../../services/saiyou-backend";
import avatar from "../../assets/image/avatar.jpg";
import {useUserStore} from "../../stores/user";
import {showFailToast} from "vant";
import {useRouter} from "vue-router";
import {createDiscreteApi} from "naive-ui";

const {message} = createDiscreteApi(["message"])

const checked = ref(0)
const router = useRouter();
const userStore = useUserStore();
const {loginUser} = userStore
const data = reactive({
  fileList: [],
  team: {}
})

const onSumbit = async () => {
  const {teamName, maxNum, teamPassword, tags} = data.team
  if (!teamName) {
    message.error("队伍名称不能为空")
    return
  }
  if (isNaN(maxNum)) {
    message.error("队伍最大人数请输入数字")
    return
  }
  if (!maxNum || maxNum > 10 || maxNum < 1) {
    message.error("队伍最大人数不能大于10小于1")
    return
  }
  if (checked.value === 1 && !teamPassword) {
    message.error("加密队伍必须设置密码")
    return
  }
  if (!tags) {
    message.error("请输入标签")
    return
  }
  const res = await TeamControllerService.addTeamUsingPost({...data.team, teamStatus: checked.value})
  if (res.data && res.code === 0) {
    message.success("创建成功")
    router.push("/")
  }
}

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
  const res = await FileControllerService.uploadFileUsingPost(file.file, "team_avatar")
  if (res.data && res.code === 0) {
    data.team.teamAvatarUrl = res?.data
    data.fileList = [{url: res.data}]
  } else {
    data.fileList = [{url: loginUser.userAvatar ? loginUser.userAvatar : avatar}]
  }
};


</script>

<style scoped>
/deep/ .van-image__img, .van-image__error, .van-image__loading {
  border-radius: 9999px;
}

/deep/ .van-uploader__preview-image {
  height: 6rem;
  width: 6rem;
}

.content {
  padding: 16px 16px 260px;
}
</style>
