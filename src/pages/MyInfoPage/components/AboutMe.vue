<template>
  <div class="pb-4">
    <div class="mt-3">
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500">
          个性签名
        </div>
        <div v-if="loginUser.userRole==='admin' && props.user.id===loginUser.id" @click="userProfileShowClick">
          <svg t="1707044059104" class="icon w-5 h-5 stroke-1" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="7969">
            <path
                d="M768.932 91.735c14.445 0.926 25.406 13.394 24.481 27.849-0.924 14.455-13.384 25.423-27.83 24.498-1.672-0.11-1.672-0.11-3.227-0.22-4.39-0.311-6.257-0.408-8.238-0.408H264.882c-100.839 0-183.464 82.685-183.464 183.587V702.96c0 100.924 82.612 183.587 183.464 183.587h489.236c100.852 0 183.464-82.663 183.464-183.587V363.95c0-14.485 11.734-26.227 26.209-26.227S990 349.466 990 363.951V702.96C990 832.853 883.919 939 754.118 939H264.882C135.082 939 29 832.853 29 702.959V327.04C29 197.171 135.093 91 264.882 91h489.236c3.599 0 6.342 0.143 11.715 0.523 1.715 0.12 1.715 0.12 3.099 0.212z m180.952 2.03c23.88-23.898 60.915 13.172 37.052 37.052C845.767 272.073 704.599 413.31 563.43 554.567c-23.88 23.898-60.915-13.172-37.052-37.052 141.169-141.256 282.337-282.512 423.506-423.75z"
                fill="#424242" p-id="7970"></path>
          </svg>
        </div>
      </div>
      <div class="mt-2 mx-1 bg-[#e0f2fe] rounded-lg p-7 min-h-20 flex justify-center items-center">
        <p class=" text-current">
          {{
            props.user.userProfile ? props.user.userProfile : props.user.id === loginUser.id ? '还未设置标签哦~' : 'Ta还未设置标签哦~'
          }}
        </p>
      </div>
    </div>
    <div class="mt-3">
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500">
          个性标签
        </div>
        <div v-if="loginUser.userRole==='admin' && props.user.id===loginUser.id" @click="userTagsShowClick">
          <svg t="1707044059104" class="icon w-5 h-5 stroke-1" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="7969">
            <path
                d="M768.932 91.735c14.445 0.926 25.406 13.394 24.481 27.849-0.924 14.455-13.384 25.423-27.83 24.498-1.672-0.11-1.672-0.11-3.227-0.22-4.39-0.311-6.257-0.408-8.238-0.408H264.882c-100.839 0-183.464 82.685-183.464 183.587V702.96c0 100.924 82.612 183.587 183.464 183.587h489.236c100.852 0 183.464-82.663 183.464-183.587V363.95c0-14.485 11.734-26.227 26.209-26.227S990 349.466 990 363.951V702.96C990 832.853 883.919 939 754.118 939H264.882C135.082 939 29 832.853 29 702.959V327.04C29 197.171 135.093 91 264.882 91h489.236c3.599 0 6.342 0.143 11.715 0.523 1.715 0.12 1.715 0.12 3.099 0.212z m180.952 2.03c23.88-23.898 60.915 13.172 37.052 37.052C845.767 272.073 704.599 413.31 563.43 554.567c-23.88 23.898-60.915-13.172-37.052-37.052 141.169-141.256 282.337-282.512 423.506-423.75z"
                fill="#424242" p-id="7970"></path>
          </svg>
        </div>
      </div>
      <div class="mt-2 ">
        <div v-if="props.user.tagList && props.user.tagList.length>0"
             class="flex space-x-2 space-y-1 flex-wrap items-center">
          <div v-for="item in props.user.tagList" class="rounded-full px-3 py-0.5 border border-black border-solid">
            {{ item }}
          </div>
        </div>
        <n-empty v-else :description="props.user.id===loginUser.id?'还未设置标签哦~':'Ta还未设置标签哦~'"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits} from "vue";
import {defineProps} from "vue/dist/vue";
import {useUserStore} from "../../../stores/user";

const {loginUser} = useUserStore();
let emit = defineEmits(["userProfileShowClick", "userTagsShowClick"]);

const userProfileShowClick = () => {
  emit("userProfileShowClick", true);
};

const userTagsShowClick = () => {
  emit("userTagsShowClick", true);
};
const props = defineProps({
  user: {},
})

</script>

<style scoped>

</style>
