<script setup lang="ts">
import Headers from "../../components/headers.vue";
import Menu from "../../components/menu.vue";
import {useSetsStore} from "../../store";
import {useRoute} from "vue-router";
import {IconCalendarClock, IconCamera, IconRecord} from "@arco-design/web-vue/es/icon";
import {ref} from "vue";

const id = useRoute().query.id
const setsStore = useSetsStore()
const setInfo = ref({
  name: '',
  pics: [],
  date: '',
  address: ''
})
const currentImg = ref({
  "name": "",
  "img": "",
  "date": "",
  "desc": "",
  "tags": [""],
  "size": [0, 0],
  "address": "",
  "camera": "",
  "lens": "",
  "focal": "",
  "fstop": "",
  "shutter": "",
  "iso": ""
})
const currentIndex = ref(0)
const imgList = ref([])
const currentRef = ref(null)
const showingImg = ref(null)
const loadData = () => {
  setInfo.value = setsStore.sets[id]
  document.title = `${setInfo.value['name']} - 影集`
  imgList.value = setInfo.value.pics.map((id: string) => setsStore.pics[id])
  currentIndex.value = 0
  currentImg.value = imgList.value[0]
}
const animateCSS = (node, animation, prefix = 'animate__') =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`;
      node.classList.add(`${prefix}animated`, animationName);

      // When the animation ends, we clean the classes and resolve the Promise
      function handleAnimationEnd(event) {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        resolve('Animation ended');
      }

      node.addEventListener('animationend', handleAnimationEnd, {once: true});
    });
const switchPic = (index: Number) => {
  currentImg.value = imgList.value[index]
  currentIndex.value = index
  animateCSS(currentRef.value, 'fadeIn')
  window.scrollTo({top: 0, behavior: 'smooth'})
}
const prevPic = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = imgList.value.length - 1
  } else {
    currentIndex.value--
  }
  switchPic(currentIndex.value)
}
const nextPic = () => {
  if (currentIndex.value === imgList.value.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }
  switchPic(currentIndex.value)
}
const isShowMenu = ref(false)
setsStore.$subscribe((mutation, state) => {
  loadData()
})
if (setsStore.sets[id]) {
  loadData()
}
</script>

<template>
  <div
      class="w-full pb-40 gradient min-h-screen"
  >

    <Menu :visible="isShowMenu" @close="isShowMenu=false"/>
    <Headers :subtitle="setInfo.name" @menu="isShowMenu=true"
             class="h-36 w-4/5 max-md:w-[90%] mx-auto overflow-visible"/>
    <div class="w-4/5 max-md:w-[90%] mx-auto -mt-8">
      <div class="text-center">
        <div class="font-light text-center mx-auto text-xl max-w-[500px] " v-if="setInfo.desc">{{ setInfo.desc }}</div>
        <div class="mt-2">
          <div class="text-lg pt-2 leading-5 text-[#4b505a] inline-block">
            {{ setInfo.date }}
          </div>
          <div class="text-lg pt-2.5 ml-3 leading-5 text-[#4b505a] font-light inline-block">
            <span class="bg-[#e5e7eb] dark:bg-zinc-800 rounded-md pl-2 pr-2 text-sm pt-1 pb-1 mb-1">{{
                setInfo.pics.length
              }} PICS</span>
            <span class="bg-[#e5e7eb] dark:bg-zinc-800 rounded-md pl-2 pr-2 text-sm pt-1 pb-1 mb-1 ml-2">IN {{
                setInfo.address
              }}</span>
          </div>
        </div>
      </div>
      <div class="flex w-40 items-center justify-between mt-5 mx-auto">
        <div @click="prevPic"
             class="w-8 h-8 text-lg bg-gray-200 dark:bg-zinc-800 transition-all cursor-pointer rounded-full content-center text-center">
          <
        </div>
        <div>
          {{ currentIndex + 1 }}/{{ imgList.length }}
        </div>
        <div @click="nextPic"
             class="w-8 h-8 text-lg bg-gray-200 dark:bg-zinc-800 transition-all cursor-pointer rounded-full content-center text-center">
          >
        </div>
      </div>
      <div ref="currentRef" class="mt-5 flex justify-items-start max-xl:flex-col animate_duration_fast"
           :class="currentImg?.size[1]>currentImg?.size[0]?'sm:flex-row':''">
        <!--        :class="-->
        <!--             (`w-auto max-w-[60%] max-h-[${Math.round((currentImg?.size[0]/currentImg?.size[1])*60)}%] max-2xl:max-w-[60%] max-xl:w-[100%] max-xl:max-w-[100%] `)+(-->
        <!--             currentImg?.size[1]>currentImg?.size[0]?'sm:max-w-[50%] sm:max-h-[65vh]':'')-->
        <!--            "-->
        <a-image
            ref="showingImg"
            class="showing-img relative"
            :class="(`w-auto max-w-[60%] max-h-[90vh] max-2xl:max-w-[60%] max-xl:w-[100%] max-xl:max-w-[100%] `)+(
                    currentImg?.size[1]>currentImg?.size[0]?'sm:max-w-[50%] sm:max-h-[65vh]':'')"
            fit="contain"
            :src="currentImg?.img">
          <template #loader>
            <img
                class="w-full h-full object-contain object-right backdrop-blur-xl"
                :src="currentImg?.thumbnail"
                :width="currentImg?.size[0]+'px'"
                :height="currentImg?.size[1]+'px'"
            />
          </template>
          <template #error>
            <img
                class="w-full h-full object-contain object-right backdrop-blur-xl"
                :src="currentImg?.thumbnail"
                :width="currentImg?.size[0]+'px'"
                :height="currentImg?.size[1]+'px'"
            />
          </template>
        </a-image>
        <div class="ml-8 mt-2 w-full relative max-xl:ml-0 max-xl:mt-6 transition-all"
             :class="currentImg?.size[1]>currentImg?.size[0]?'sm:ml-8':''">
          <div class="text-4xl font-medium">{{ currentImg?.name }}</div>
          <div class="text-lg font-medium mt-5 text-gray-500" v-html="currentImg?.desc"></div>
          <div class="absolute bottom-2 max-xl:relative max-xl:mt-8 text-sm">
            <div class="mt-2 text-gray-500 font-medium" v-if="currentImg?.camera">
              <icon-camera class="text-2xl align-middle"/>
              <span class="pl-3">{{ currentImg?.camera }}</span>
            </div>
            <div class="mt-2 text-gray-500 font-medium" v-if="currentImg?.lens">
              <icon-record class="text-2xl align-middle"/>
              <span class="pl-3">{{ currentImg?.lens }}</span>
            </div>
            <div class="mt-2 text-gray-500 font-medium" v-if="currentImg?.date">
              <icon-calendar-clock class="text-2xl align-middle"/>
              <span class="pl-3">{{ currentImg?.date }}</span>
            </div>
            <div class="mt-2 text-gray-500 font-medium">
              <span v-if="currentImg?.fstop">{{ currentImg?.focal }}</span>
              <span v-if="currentImg?.fstop" class="pl-5">{{ currentImg?.fstop }}</span>
              <span v-if="currentImg?.shutter" class="pl-5">{{ currentImg?.shutter }}s</span>
              <span v-if="currentImg?.iso" class="pl-5">ISO {{ currentImg?.iso }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <!--        <div @click="showLargePic"-->
        <!--             class="hover:bg-gray-200 p-1 text-sm rounded-lg cursor-pointer w-fit transition-all ease-in-out duration-200">-->
        <!--          <Icon name="akar-icons:enlarge" class="text-lg align-middle"/>-->
        <!--          {{ isEnlarge ? 'Zoom Out' : 'Zoom In' }}-->
        <!--        </div>-->
      </div>
      <div class="mt-5 columns-4 2xl:columns-6 gap-2">
        <div v-for="(item,index) in imgList"
             class="mb-2 cursor-pointer hover:scale-[1.05] transition-all ease-in-out duration-200"
             @click="switchPic(index)">
          <img
              class="object-contain object-center block w-[100%] hover:h-full h-[100%] hover:transition-all ease-in-out duration-200"
              v-lazy="item?.thumbnail || item?.img"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.arco-icon) {
  vertical-align: -5px;
}

:deep(.showing-img>img) {
  object-position: top right;
  width: 100%;
  height: 100%;
}
</style>