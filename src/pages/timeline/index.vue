<script setup lang="ts">
import Headers from "../../components/headers.vue";
import Menu from "../../components/menu.vue";
import { computed, ref } from "vue";
import { IconLoop } from "@arco-design/web-vue/es/icon";

const isShowMenu = ref(false);
import { useSetsStore } from "../../store";
const setsData = ref([]);
const setsStore = useSetsStore();
const setSetData = () => {
  setsData.value = setsStore.sortedSets.filter(
    (el) => !el?.memo || el.memo === "false"
  );
};
const size = ref(6);
const computedSetsList = computed(() => {
  return setsData.value.slice(0, size.value);
});
setsStore.$subscribe((mutation, state) => {
  setSetData();
});
if (Object.keys(setsStore.sets).length !== 0) {
  setSetData();
}
</script>

<template>
  <div class="w-full pb-40 gradient min-h-screen">
    <Menu :visible="isShowMenu" @close="isShowMenu = false" />
    <Headers
      :subtitle="'Archives'"
      @menu="isShowMenu = true"
      class="h-36 w-4/5 max-md:w-[90%] mx-auto overflow-visible"
    />
    <div
      class="w-3/5 max-xl:w-[90%] max-2xl:w-4/5 max-md:w-[90%] mx-auto md:mt-8 max-md:mt-10"
    >
      <div class="md:grid md:grid-cols-2 md:gap-10">
        <div
          class="w-[100%] h-[350px] max-md:mb-8 group transition-all rounded-xl relative"
          v-for="item in computedSetsList"
          :key="item?.key"
          @click="$router.push('/sets?id=' + item?.key)"
        >
          <img
            class="w-[100%] rounded-xl h-[100%] object-cover"
            v-lazy="setsStore.pics[item?.img]?.img"
          />
          <div
            class="absolute top-0 left-0 rounded-xl group-hover:opacity-100 group-hover:backdrop-blur-lg group-hover:bg-white/60 dark:group-hover:bg-zinc-800/60 opacity-0 transition-all ease-in-out duration-300 cursor-pointer w-full h-full text-center drop-shadow-lg text-black font-medium"
          >
            <div
              class="absolute top-1/2 -translate-y-1/2 left-1/2 w-[85%] -translate-x-1/2"
            >
              <div
                class="text-4xl pt-8 group-hover:-translate-y-5 delay-100 transition-all"
              >
                {{ item?.name }}
              </div>
              <div
                class="text-xl mt-2 group-hover:-translate-y-5 text-gray-800 delay-[150] transition-all truncate"
                v-if="item?.desc"
              >
                {{ item?.desc }}
              </div>
              <div
                class="text-xl mt-2 text-gray-800 group-hover:-translate-y-5 delay-[150] transition-all"
              >
                {{ item?.date }}
              </div>
              <div
                class="text-lg mt-2.5 text-[#4b505a] font-light group-hover:-translate-y-5 delay-[150] transition-all"
              >
                <span
                  class="bg-[#e5e7eb] dark:bg-zinc-800 rounded-md pl-2 pr-2 text-sm pt-1 pb-1 mb-1"
                  >{{ item?.pics.length }} PICS</span
                >
                <span
                  class="bg-[#e5e7eb] dark:bg-zinc-800 rounded-md pl-2 pr-2 text-sm pt-1 pb-1 mb-1 ml-2"
                  >IN {{ item?.address }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="Object.keys(setsData).length > size"
        @click="size += 6"
        class="mt-8 shadow-sm cursor-pointer bg-white dark:bg-zinc-800 hover:bg-blue-500 hover:dark:bg-blue-800 transition-all hover:text-white w-44 text-center pt-3 pb-3 text-xl rounded-full mb-8 mx-auto"
      >
        <icon-loop />
        LOAD MORE
      </div>
      <div class="text-2xl text-center mt-10">
        {{ setsData.length }} Sets,
        {{ setsData.length - size < 0 ? 0 : setsData.length - size }} Left
      </div>
    </div>
  </div>
</template>

<style scoped></style>
