<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateUserService } from '@/api/user'
// import { storeToRefs } from 'pinia'
const userStore = useUserStore()

// 使用仓库中 数据的初始值(无需响应式) 直接解构无问题
const {
  userInfo: { username, id, nickname, email },
  getUser
} = userStore
const form = ref({
  id,
  username,
  nickname,
  email
})

const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称长度在 2 到 10 个非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    {
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ]
}
const formRef = ref(null)

const submitForm = async () => {
  await formRef.value.validate()
  await userUpdateUserService(form.value)
  await getUser()
  ElMessage.success('修改成功')
}
</script>

<template>
  <page-container title="基本资料">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="登录名称" prop="username">
        <el-input
          v-model="form.username"
          disabled
          placeholder="请查看登录名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input
          v-model="form.nickname"
          placeholder="请输入用户昵称"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input
          v-model="form.email"
          type="email"
          placeholder="请输入用户邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>
