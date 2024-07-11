<script setup>
// 在 Vue3 CompositionAPI 中
// 1. 获取路由对象 router  useRouter
//  const router = useRouter()
// 2. 获取路由参数 route  useRoute
//  const route = useRoute()
import { useRouter, useRoute } from 'vue-router'

import { useUserStore, useCounterStore } from '@/stores'
// import { useUserStore } from '@/stores/modules/user'
// import { useCounterStore } from '@/stores/modules/counter'

const router = useRouter()
const route = useRoute()

const goList = () => {
  console.log(router, route)
  router.push('/list')
}

const userStore = useUserStore()
const counterStore = useCounterStore()
</script>

<template>
  <div>
    <router-view></router-view>
    <hr />
    <hr />
    <hr />

    我是App
    <TestDemo></TestDemo>
    <el-button @click="$router.push('/home')">跳首页</el-button>
    <el-button @click="goList">跳列表页</el-button>

    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>

    <p>{{ userStore.token }}</p>
    <el-button @click="userStore.setToken('Bearer daifhajghsjnsj')">
      登录
    </el-button>
    <el-button @click="userStore.removeToken">退出</el-button>

    <hr />
    <p>{{ counterStore.count }}</p>
    <el-button @click="counterStore.addCount(2)">加法2</el-button>
  </div>
</template>
