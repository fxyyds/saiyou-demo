<template>
  <div
      class="max-h-[40rem] duration-500 remove-scrollbar md:mb-0 overflow-x-auto rounded grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 gap-3 mb-[69px] md:mb-[29px]"
  >
    <div
        v-if="props.competitionList&&props.competitionList.length>0"
        v-for="item in props.competitionList"
        class="bg-gray-100 rounded-lg p-1 pb-4 shadow"
        style="height: fit-content;"
    >
      <competition-content @deleteResult="handleDeleteResult" :competition="item"/>
    </div>
    <div class="rounded-lg mt-2" v-else v-for="item in 10">
      <n-skeleton text :repeat="6"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import CompetitionContent from "./CompetitionContent.vue";
import {defineProps, withDefaults} from "vue";
import {CompetitionVO} from "../../../services/saiyou-backend";
import {defineEmits} from "vue";
import {useRouter} from "vue-router";
const emit = defineEmits(["deleteResult"]);
const router = useRouter();
interface Props {
  competitionList: CompetitionVO[];
}

const props = withDefaults(defineProps<Props>(), {
  competitionList: () => [],
});

const handleDeleteResult = (result) => {
  emit("deleteResult",result);
};

</script>

<style scoped>
.remove-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
