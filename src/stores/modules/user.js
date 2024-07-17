import { userGetUserInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }

    const userInfo = ref({})
    const getUser = async () => {
      const res = await userGetUserInfoService() // 请求获取数据
      userInfo.value = res.data.data
    }
    const setUser = (obj) => {
      userInfo.value = obj
    }

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
