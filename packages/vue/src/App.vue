<template>
  <div>hello world</div>
  <div>{{ greeting }}</div>
  <div>{{ time }}</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getGreeting } from '@template/template'
const time = ref(new Date())
const greeting = ref(getGreeting())

setInterval(() => {
  time.value = new Date()
}, 1000)
</script>
