import { defineStore } from 'pinia'
import { ref } from 'vue'

// 数字计数
export const useCounterStore = defineStore('big-counter', () => {
  const count = ref(100)
  const addCount = (num) => {
    count.value += num
  }

  return {
    count,
    addCount
  }
})
