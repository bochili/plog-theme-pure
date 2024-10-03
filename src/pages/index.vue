<template>
  <div
      @wheel="scrollHorizontal"
      class="w-screen h-screen gradient"
  >
    <Menu :visible="isShowMenu" @close="isShowMenu=false"/>
    <Headers class="w-4/5 mx-auto h-52" @menu="isShowMenu=true"/>
    <div class="w-4/5 absolute top-1/2 left-[10%] text-2xl -translate-y-1/2"
         v-if="bannerList.length === 0">None
    </div>
<!--     snap-x snap-mandatory-->
    <div
        v-else
        ref="imgSlider"
        class="img-slider w-screen absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-scroll overflow-y-visible whitespace-nowrap"
    >
      <div v-for="item in bannerList" @click="$router.push(`/sets?id=${item['key']}`)"
           class="inline-block mr-7 cursor-pointer snap-normal snap-center">
        <div class=" transition-all relative ">
          <img
              class="xl:h-[28rem] max-xl:h-[20rem] w-auto max-w-[95vw] object-contain object-bottom transition-all ease-in-out duration-200 hover:-translate-y-2"
              v-lazy="picsData[item.img]['img']"/>
          <div class="font-medium text-2xl pt-4">{{ item?.name }}
            <div class="text-lg float-right">
              {{ item?.date }}
            </div>
          </div>
          <div class="text-lg mt-2.5 text-[#4b505a] font-light">
            <span class="bg-[#e5e7eb] dark:bg-zinc-800 rounded-md pl-2 pr-2 text-sm pt-1 pb-1 mb-1">{{ item?.pics.length }} PICS</span>
            <span class="bg-[#e5e7eb] dark:bg-zinc-800 rounded-md pl-2 pr-2 text-sm pt-1 pb-1 mb-1 ml-2">IN {{ item?.address }}</span>
          </div>
        </div>
      </div>
    </div>
    <div @click="imgSlider.scrollBy({left: -350, behavior: 'smooth'})"
         class="w-14 h-14 text-xl bg-gray-200 dark:bg-zinc-800 transition-all cursor-pointer rounded-full content-center text-center top-1/2 absolute left-[2.5%] -translate-y-1/2">
      <
    </div>
    <div @click="imgSlider.scrollBy({left: 350, behavior: 'smooth'})"
         class="w-14 h-14 text-xl bg-gray-200 dark:bg-zinc-800 transition-all cursor-pointer rounded-full content-center text-center top-1/2 absolute right-[2.5%] -translate-y-1/2">
      >
    </div>
  </div>
</template>
<style scoped>
.img-slider::-webkit-scrollbar {
  display: none;
}

.img-slider {
  padding-left: 10%;
  padding-right: calc(45%);
  padding-top: 50px;
}
</style>
<script setup>
import 'animate.css'
import Headers from "../components/Headers.vue";
import Menu from "../components/menu.vue";
import {onMounted, ref} from "vue";
import {useSetsStore} from "../store/index.js";

const bannerList = ref({})
const imgSlider = ref(null)
const setsStore = useSetsStore()
const picsData = ref({})
const scrollHorizontal = (e) => {
  // e.preventDefault();
  imgSlider.value.scrollBy({left: e.deltaY, behavior: 'auto'})
}
const setSetData = () => {
  picsData.value = setsStore.pics
  bannerList.value = setsStore.sortedSets.filter(el=>el?.show==='true')
}
const isShowMenu = ref(false)
setsStore.$subscribe((mutation, state) => {
  // bannerList.value = setsStore.sets
  setSetData()
})
if (Object.keys(setsStore.sets).length !== 0) {
  // bannerList.value = setsStore.sets
  setSetData()
}
</script>
