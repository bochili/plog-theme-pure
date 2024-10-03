<template>
  <div class="select-none relative">
    <div @click="$router.push('/')"
         class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-4xl max-xl:text-4xl text-center cursor-pointer">
      <span class="font-medium">影集</span><span class="font-extralight"
                                                 v-if="props.subtitle">·{{ props.subtitle }}</span>
    </div>
    <div class="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer" @click="$emit('menu')">
      <icon-menu class="text-3xl"/>
    </div>
  </div>
</template>
<script setup>
import { IconMenu } from '@arco-design/web-vue/es/icon';
import {watch} from "vue";
import {useRoute} from "vue-router";
const props = defineProps({
  subtitle: {
    type: String,
    default: ''
  }
})
const route = useRoute()
watch(route, (to, from) => {
  // scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>