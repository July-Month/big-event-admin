<script setup>
import { ref } from 'vue'
import { artAddChannelService, artEditChannelService } from '@/api/article'
const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const form = ref(null)
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称必须是 1-10 位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名必须是 1-15 位的字符或数字',
      trigger: 'blur'
    }
  ]
}

// 组件对外暴露一个方法 open，基于open传来的参数，区分是 添加还是编辑
// open({}) => 表单无需渲染，说明是添加
// open(row) => 表单需要渲染，说明是编辑
// open调用后，可以打开弹层
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row } // 添加 => 重置了表单内容， 编辑 => 存储了需要回显的数据
}
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await form.value.validate()
  if (formModel.value.id) {
    await artEditChannelService(formModel.value)
    ElMessage.success('修改成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }

  dialogVisible.value = false
  emit('success')
}
// 向外暴露方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form
      :model="formModel"
      :rules="rules"
      ref="form"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input
          type="text"
          placeholder="请输入分类名称"
          v-model="formModel.cate_name"
        />
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input
          type="text"
          placeholder="请输入分类别名"
          v-model="formModel.cate_alias"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
