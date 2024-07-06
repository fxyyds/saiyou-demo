<template>
  <div>
    <van-search :show-action="props.show" v-model="input" class="mx-1" @update:model-value="change" placeholder="请输入搜索关键词"
                @search="onSearch">
      <template #action>
        <slot></slot>
      </template>
    </van-search>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, ref,defineProps} from "vue";

const input = ref("");

let emit = defineEmits(["searchResult", "change"]);

const onSearch = (val) => {
  emit("searchResult", val);
};

const props = defineProps({
  show:Boolean,
})

const change = (val) => {
  emit("change", val);
}

</script>

<style scoped>
:deep(.van-search__field) {
  flex: 1;
  align-items: center;
  padding: 0 var(--van-padding-xs) 0 0;
  height: var(--van-search-input-height);
  background-color: transparent;
}
</style>
