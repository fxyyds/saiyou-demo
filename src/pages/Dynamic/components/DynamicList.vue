<template>
  <div class="max-h-[52rem] duration-500 remove-scrollbar overflow-x-auto mb-[50px] md:mb-[29px]">
    <div
        v-if="props.dynamicList&&props.dynamicList.length>0"
        v-for="item in props.dynamicList"
        class="rounded-lg p-3"
    >
      <dynamic-content :dynamic="item"/>
    </div>
    <div v-else class="h-44 mt-6 col-span-3">
      <n-empty description="还没有动态哦~">
        <template #extra>
          <!--                todo-->
          <n-button @click="router.push('/add/post')" size="small">
            去发帖
          </n-button>
        </template>
      </n-empty>
    </div>

  </div>
</template>

<script setup lang="ts">
import {defineProps, withDefaults} from "vue";
import DynamicContent from "./DynamicContent.vue";
import {useRouter} from "vue-router";

const router = useRouter();

interface Props {
  dynamicList: any[]
}

const props = withDefaults(defineProps<Props>(), {
  dynamicList: () => [],
});

</script>

<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
