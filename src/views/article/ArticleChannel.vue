<script setup>
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

const channelList = ref([])

const loading = ref(false)

const getChannelList = async () => {
  loading.value = true
  const { data } = await artGetChannelsService()
  channelList.value = data.data
  loading.value = false
}
getChannelList()

const dialogRef = ref(null)

const onEditChannel = (row) => {
  dialogRef.value.open(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认要删除该分类么', '温馨提示', {
    type: 'warning',
    confirmButtonText: '删除',
    cancelButtonText: '取消'
  })

  await artDelChannelService({
    id: row.id
  })
  ElMessage.success('删除成功')
  getChannelList()
}
const onAddChannel = () => {
  dialogRef.value.open({})
}
// const onSuccess = () => {
//   getChannelList()
// }
</script>

<template>
  <PageContainer title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column type="index" label="序号" width="100" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column prop="操作" label="操作" width="100">
        <!-- row 一行的数据，就是 channelList 的一项 -->
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="没有数据"></el-empty>
      </template>
    </el-table>
    <ChannelEdit ref="dialogRef" @success="getChannelList"></ChannelEdit>
  </PageContainer>
</template>

<style lang="scss" scoped></style>
