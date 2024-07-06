<template>
  <div class="flex items-center justify-between space-x-1.5">
    <div class="remove-scrollbar overflow-x-auto ">
      <van-tabs v-if="props.tagList&&props.tagList.length>0"
                v-model:active="active" swipeable animated shrink @click-tab="changeTag(active)">
        <van-tab v-for="item in props.tagList"
                 :name='item.id'>
          <template #title>
            <div class="rounded-full px-1.5 text-sm"
                 :class="active===item.id?'bg-sky-400 text-gray-50 font-normal':'text-gray-500 font-bold'"
            >
              <p class="m-0.5">{{ item.tagName }}</p>
            </div>
          </template>
        </van-tab>
      </van-tabs>
      <n-skeleton v-else :width="4000" :height="22" :sharp="false" class="mb-2 mt-2" size="large"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, reactive, ref, withDefaults} from "vue";

interface Props {
  tagList: any[];
}

const emits = defineEmits(['screeningClick']);
const props = withDefaults(defineProps<Props>(), {
  tagList: () => [],
});

const data = reactive({
  tagIndex: 1,
  isClick: false,
  tagList: []
})

const changeTag = (item: any) => {
  console.log(item)
  emits("screeningClick", item)
}
const active = ref(1)

</script>

<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}

/deep/ .van-tabs__line {
  width: 0;
}

/deep/ .van-tab {
  padding: 0;
}
</style>

