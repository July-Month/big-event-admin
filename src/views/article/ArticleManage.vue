<script setup>
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import ArticleEdit from './components/ArticleEdit.vue'
import { artGetArticleListService } from '@/api/article'
import { formatTime } from '@/utils/format'
// import { objectToFormData } from '@/utils/format'
const articleList = ref([])
const total = ref(0)
// 定义请求参数对象
const params = ref({
  pagenum: 1, // 当前页
  pagesize: 5, // 当前生效的每页条数
  cate_id: '',
  state: ''
})
const loading = ref(false)
const getList = async () => {
  loading.value = true
  const { data } = await artGetArticleListService(params.value)
  articleList.value = data.data
  total.value = data.total
  loading.value = false
}
getList()

// 搜索
const handleSearch = () => {
  params.value.pagenum = 1
  getList()
}
// 重置
const handleReset = () => {
  params.value.cate_id = ''
  params.value.state = ''
  params.value.pagenum = 1
  getList()
}

const drawerRef = ref(null)

// 添加文章
const onAddArticle = () => {
  drawerRef.value.open({})
}
// 编辑
const onEditArticle = (row) => {
  drawerRef.value.open(row)
}
// 删除
const onDelArticle = (row) => {
  console.log(row)
}

// 处理分页逻辑
const handleSizeChange = (val) => {
  params.value.pagesize = val
  params.value.pagenum = 1
  getList()
}
const handleCurrentChange = (val) => {
  params.value.pagenum = val
  getList()
}

// 添加/编辑 成功
const onSuccess = (state) => {
  if (state === 'add') {
    // 添加，最好渲染最后一页
    // 更新成最大页码数, 再渲染
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getList()
}

// const obj = ref({
//   name: 'John Doe',
//   profile: {
//     age: 30,
//     city: 'New York'
//   },
//   list: [
//     {
//       name: 'zs',
//       age: '18'
//     },
//     {
//       name: 'ls',
//       age: '18'
//     }
//   ]
// })
// const test = () => {
//   obj.value = objectToFormData(obj.value)
//   for (let [key, value] of obj.value.entries()) {
//     console.log(key, value)
//   }
// }
</script>

<template>
  <PageContainer title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">发布文章</el-button>
      <!-- <el-button type="primary" @click="test">发布文章</el-button> -->
    </template>

    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类:" style="width: 300px">
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="发布状态:" style="width: 300px">
        <el-select v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    />

    <ArticleEdit ref="drawerRef" @success="onSuccess"></ArticleEdit>
  </PageContainer>
</template>

<style lang="scss" scoped></style>
