<script setup lang="ts">
import { ref, watch } from "vue";
import {
  IconClose,
  IconSunFill,
  IconMoonFill,
  IconDesktop,
} from "@arco-design/web-vue/es/icon";
import { useSetsStore } from "../store";

const setsStore = useSetsStore();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
watch(
  () => props.visible,
  (val) => {}
);
const menus = ref([
  {
    name: "Archives >",
    path: "/timeline",
  },
  {
    name: "一些記憶 >",
    path: "/cities",
  },
  {
    name: "首頁 >",
    path: "/",
  },
]);
const toggleTheme = () => {
  if (setsStore.theme === "light") {
    setsStore.setTheme("dark");
  } else if (setsStore.theme === "dark") {
    setsStore.setTheme("auto");
  } else if (setsStore.theme === "auto") {
    setsStore.setTheme("light");
  }
};
</script>

<template>
  <div
    :style="{
      height: props.visible ? '100vh' : '0',
      'border-radius': props.visible ? '0' : '0 0 30px 30px',
    }"
    class="select-none fixed w-screen left-1/2 -translate-x-1/2 backdrop-blur-xl z-[1] bg-white/50 dark:bg-zinc-800/60 transition-all ease-in-out duration-500 overflow-hidden"
    @click="$emit('close')"
  >
    <div class="absolute top-[42%] -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div
        v-for="item in menus"
        class="h-20 font-medium text-4xl max-md:text-2xl text-center whitespace-nowrap"
      >
        <RouterLink class="hover:underline" :to="item.path">{{
          item.name
        }}</RouterLink>
      </div>
    </div>

    <div
      class="font-medium cursor-pointer text-4xl absolute bottom-32 left-1/2 -translate-x-1/2"
    >
      <icon-close />
    </div>
    <transition>
      <div
        v-if="props.visible"
        @click.stop="toggleTheme"
        class="gap-2 shadow-sm cursor-pointer bg-white dark:bg-zinc-800 hover:bg-blue-500 hover:dark:bg-blue-800 transition-all hover:text-white w-40 text-center pt-3 pb-3 text-xl rounded-full mb-8 absolute top-10 left-1/2 -translate-x-1/2"
      >
        <div v-if="setsStore.theme === 'light'">
          <icon-sun-fill />
          LIGHT
        </div>
        <div v-else-if="setsStore.theme === 'dark'">
          <icon-moon-fill />
          DARK
        </div>
        <div v-else>
          <icon-desktop />
          DEVICE
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped></style>
