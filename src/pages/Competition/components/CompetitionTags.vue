<template>
  <tags-tab :tagList="props.tagList" @screeningClick="screeningClick"/>
</template>

<script setup lang="ts">
import TagsTab from "../../../components/tag/TagsTab.vue";
import {showSuccessToast} from "vant";
import {defineProps, reactive, withDefaults} from "vue";

interface Props {
  tagList: any[];
}

const props = withDefaults(defineProps<Props>(), {
  tagList: () => [],
});

const screeningClick = (result) => {
  showSuccessToast("赛事筛选" + result.toString())
};
</script>
<style scoped>
</style>
