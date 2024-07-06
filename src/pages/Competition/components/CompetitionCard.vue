<template>
  <div class="grid duration-500 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-2">
    <div
        class="shadow-md whitespace-nowrap bg-gradient-to-l from-blue-400 from-10% via-sky-400 via-40% to-emerald-300 from-indigo-400 to-70%  rounded-lg">
      <div class="ml-4 mt-6 duration-500 md:ml-8 lg:ml-10 flex justify-between">
        <div>
          <div class="font-medium text-lg duration-500 sm:text-lg md:text-xl lg:text-2xl text-gray-50">1 V 1 模式
          </div>
          <div class="font-medium text-xs duration-500 md:text-sm lg:text-lg text-gray-50">
            单人竞技模式
          </div>
        </div>
        <div>
          <img class="max-h-28" :src="dynamic"/>
        </div>
      </div>
    </div>
    <div
        class="shadow-md whitespace-nowrap duration-500 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-lg">
      <div class="ml-4 mt-6 duration-500 md:ml-8 lg:ml-10 flex justify-between">
        <div>
          <div class="font-medium text-lg duration-500 md:text-xl lg:text-2xl text-gray-50">多人竞赛
          </div>
          <div class="font-medium text-xs duration-500 md:text-sm lg:text-lg text-gray-50">
            多人竞赛模式
          </div>
        </div>
        <div>
          <img class="max-h-28" :src="friends"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import friends from '../../../assets/image/friends.svg'
import dynamic from '../../../assets/image/dynamic.svg'


</script>

<style scoped></style>
