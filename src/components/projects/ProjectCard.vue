<template>
  <div class="card">
    <div class="card-header">
      <span>{{ project.name }}</span>
      <el-tag size="small" :type="project.type === 'creative' ? 'success' : 'warning'">
        {{ project.type === 'creative' ? '创意项目' : '解析项目' }}
      </el-tag>
    </div>
    <div class="card-body">
      <p>{{ project.description }}</p>
      <div style="margin-top:15px;display:flex;align-items:center">
        <el-avatar :size="30" :src="project.owner.avatar"></el-avatar>
        <span style="margin-left:10px">{{ project.owner.nickname }}</span>
      </div>
    </div>
    <div class="card-footer">
      <el-button size="small" @click="$emit('open', project)">查看详情</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  emits: ['open']
}
</script>

<style scoped>
.card {
  background-color: white;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.card-header {
  padding: 15px;
  border-bottom: 1px solid var(--border-color);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-body {
  padding: 15px;
}

.card-footer {
  padding: 10px 15px;
  background-color: #fafafa;
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
}
</style>