<template>
  <div>
    <transition :duration="550" name="slide-fade">
      <router-view/>
    </transition>
  </div>
</template>
<script setup>
import {useSetsStore} from './store/index';

const setsStore = useSetsStore();
setsStore.fetchSets();
setsStore.fetchPics();
if ('theme' in localStorage) setsStore.setTheme(localStorage.theme);
else setsStore.syncTheme();
window.matchMedia("(prefers-color-scheme: dark)")
    .addEventListener('change', () => {
      setsStore.syncTheme();
    })
</script>
