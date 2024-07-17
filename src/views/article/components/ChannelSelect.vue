<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref, defineModel } from 'vue'

const modelValue = defineModel()
// defineProps({
//   modelValue: {
//     required: true,
//     type: [Number, String]
//   }
// })
// const emit = defineEmits(['update:modelValue'])

const channelList = ref([])
const getChannelList = async () => {
  const { data } = await artGetChannelsService()
  channelList.value = data.data
}
getChannelList()
</script>

<template>
  <!-- label是展示给用户看的，value是选中该项所拿到的值 - 提交给后台的 -->
  <!-- <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  > -->
  <el-select v-model="modelValue">
    <el-option
      v-for="item in channelList"
      :key="item.id"
      :label="item.cate_name"
      :value="item.id"
    ></el-option>
  </el-select>
</template>
