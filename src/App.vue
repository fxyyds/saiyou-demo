<template>
  <div v-if="!writeList.includes(route.path)">
    <base-layout v-if="!loading"/>
    <div v-else>
      <network-is-not-available/>
    </div>
  </div>
  <div v-else>
    <router-view/>
  </div>
</template>
<script setup lang="ts">
import {useDocumentVisibility, useOnline, watchOnce} from "@vueuse/core";
import {computed} from "vue";
import BaseLayout from "./layouts/BaseLayout.vue";
import NetworkIsNotAvailable from "./components/status/NetworkIsNotAvailable.vue";
import {useRoute, useRouter} from "vue-router";
import {createDiscreteApi} from 'naive-ui'
import {useTitle} from "@vueuse/core/index";
import {useUserStore} from "./stores/user";
import {useNotReadStore} from "./stores/notRead";
import {FriendsApplyControllerService, TagControllerService} from "./services/saiyou-backend";
import {useTagStore} from "./stores/Tag";

const {getLoginUser, loginUser} = useUserStore();
const WHITE_LIST = ['/login', '/register', '/404', '/403', '/500', '/email/login', '/email/register','/dynamic']
const router = useRouter();
const route = useRoute();
const writeList = ['/login', '/register', '/email/login', '/email/register']
const online = useOnline();
const networkStatus = computed(() => (online.value ? "Online" : "Offline"));
const loading = computed(() => networkStatus.value !== "Online");
const {tag} = useTagStore()
const {message} = createDiscreteApi(["message"])
const visibility = useDocumentVisibility()
const {notRead} = useNotReadStore()
watchOnce(visibility, () => {
  if (visibility.value === "visible") {
    message.success("欢迎回来")
  }
})

router.beforeEach(async (to, from, next) => {
  if (!WHITE_LIST.includes(to.path) && !to.path.includes('/dynamic')) {
    await getLoginUser()
  }
  if (!WHITE_LIST.includes(to.path)){
    await getNotRead()
    await getTagList()
  }
  // @ts-ignore
  useTitle(to.name ? "赛友校园 - " + to.name : "赛友校园");
  next();
});

const getNotRead = async () => {
  const res = await FriendsApplyControllerService.notReadCountUsingGet()
  if (res.code === 0 && res.data) {
    notRead.count = res.data
  }
}

const getTagList = async () => {
  const res = await TagControllerService.listVoTagUsingGet()
  if (res.code === 0 && res.data) {
    tag.tagList = res.data
  }
}


</script>
<style>


</style>
