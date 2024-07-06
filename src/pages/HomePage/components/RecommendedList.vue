<template>
  <div class="grid duration-500 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2">
    <div
        @click="router.push('/competition')"
        class="shadow-md whitespace-nowrap duration-500 bg-gradient-to-l from-cyan-300 to-blue-400 row-span-2 sm:col-span-2 lg:col-span-1 lg:row-span-2 rounded-lg"
    >
      <div class="ml-4 mt-6 duration-500 md:ml-8 lg:ml-10">
        <div>
          <div class="font-bold text-lg duration-500 sm:text-2xl md:text-3xl lg:text-4xl text-gray-50">
            赛事专区
          </div>
          <div class="font-medium text-sm duration-500 md:text-sm lg:text-lg text-gray-50">
            海量竞赛等你来战
          </div>
        </div>
        <div class="float-right self-end">
          <img class="max-h-40" :src="astro"/>
        </div>
      </div>
    </div>
    <div class="shadow-md whitespace-nowrap bg-gradient-to-l from-sky-400 to-indigo-400 rounded-lg"
         @click="router.push('/dynamic')"
    >
      <div class="ml-4 mt-6 duration-500 md:ml-8 lg:ml-10 flex justify-between">
        <div>
          <div class="font-medium text-sm duration-500 sm:text-lg md:text-xl lg:text-2xl text-gray-50">休闲动态
          </div>
          <div class="font-medium text-xs duration-500 md:text-sm lg:text-lg text-gray-50">
            今日新鲜事
          </div>
        </div>
        <div>
          <img class="max-h-28" :src="dynamic"/>
        </div>
      </div>
    </div>
    <div @click="router.push('/user/list')" class="shadow-md whitespace-nowrap bg-gradient-to-l duration-500 from-purple-400 to-pink-400 rounded-lg">
      <div class="ml-4 mt-6 duration-500 md:ml-8 lg:ml-10 flex justify-between">
        <div>
          <div class="font-medium text-sm duration-500 sm:text-lg md:text-xl lg:text-2xl text-gray-50">扩列派对
          </div>
          <div class="font-medium text-xs duration-500 md:text-sm lg:text-lg text-gray-50">
            寻找心动好友
          </div>
        </div>
        <div>
          <img class="max-h-28" :src="friends"/>
        </div>
      </div>
    </div>
    <div class="shadow-md whitespace-nowrap bg-gradient-to-l from-indigo-300 to-violet-500 rounded-lg"
         @click="router.push('/create/team')"
    >
      <div class="ml-4 mt-6 duration-500 md:ml-8 lg:ml-10 flex justify-between">
        <div>
          <div class="font-medium text-sm duration-500 sm:text-lg md:text-xl lg:text-2xl text-gray-50">组建队伍
          </div>
          <div class="font-medium text-xs duration-500 md:text-sm lg:text-lg text-gray-50">
            开启赛友之旅
          </div>
        </div>
        <div>
          <img class="max-h-28" :src="team"/>
        </div>
      </div>
    </div>
    <div @click="router.push('/product')" class="shadow-md whitespace-nowrap bg-gradient-to-r from-yellow-600 to-amber-400 rounded-lg">
      <div class="ml-4 mt-6 duration-500 md:ml-8 lg:ml-10 flex justify-between">
        <div>
          <div class="font-medium text-sm duration-500 sm:text-lg md:text-xl lg:text-2xl text-gray-50">积分商城
          </div>
          <div class="font-medium text-xs duration-500 md:text-sm lg:text-lg text-gray-50">
            积分兑好物
          </div>
        </div>
        <div>
          <img class="max-h-28 mr-2" :src="mall" />
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import astro from '../../../assets/image/astro.svg'
import friends from '../../../assets/image/friends.svg'
import dynamic from '../../../assets/image/dynamic.svg'
import mall from '../../../assets/image/mall.svg'
import team from '../../../assets/image/team.svg'

const router = useRouter();
</script>

<style scoped></style>
