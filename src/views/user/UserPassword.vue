<script setup>
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { userUpdatePwdService } from '@/api/user'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
const userStore = useUserStore()
const router = useRouter()
// 表单数据
const pwdForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const formRef = ref()

// 自定义验证：新密码不能与原密码相同
function validatePwd(rule, value, callback) {
  if (value === pwdForm.value.old_pwd) {
    callback(new Error('新密码不能与旧密码相同'))
  } else {
    callback()
  }
}

// 自定义验证：新密码与确认密码相同
function validateRePwd(rule, value, callback) {
  if (value !== pwdForm.value.new_pwd) {
    callback(new Error('两次输入的密码不一致!'))
  } else {
    callback()
  }
}
// 表单验证规则
const rules = {
  old_pwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' }
  ],
  new_pwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' },
    { validator: validatePwd, trigger: 'blur' }
  ],
  re_pwd: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { min: 6, max: 15, message: '密码长度在 6 到 15 个字符', trigger: 'blur' },
    { validator: validateRePwd, trigger: 'blur' }
  ]
}

// 提交表单
const onSubmit = async () => {
  await formRef.value.validate()
  await userUpdatePwdService(pwdForm.value)
  ElMessage.success('密码修改成功')

  // 密码修改成功后，退出重新登陆
  // 清空本地存储的 token 和 个人信息
  userStore.removeToken()
  userStore.setUser({})
  // 拦截到登录页
  router.push('/login')
}

// 重置表单
const onReset = () => {
  formRef.value.resetFields()
}
</script>

<template>
  <page-container title="重置密码">
    <el-row>
      <el-col :span="12">
        <el-form
          :model="pwdForm"
          :rules="rules"
          ref="formRef"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input
              v-model="pwdForm.old_pwd"
              type="password"
              :show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="pwdForm.new_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="re_pwd">
            <el-input v-model="pwdForm.re_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit" type="primary">修改密码</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
