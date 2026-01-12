<template>
  <div class="sidebar">
    <div class="sidebar-section">
      <div class="sidebar-title">个人中心</div>
      <div class="sidebar-item" :class="{active: $route.name === 'Home'}" @click="$router.push('/')">
        <i class="el-icon-user sidebar-icon"></i>
        <span class="sidebar-text">首页</span>
      </div>
      <div class="sidebar-item" :class="{active: $route.name === 'UserCenter'}" @click="$router.push('/user-center')">
        <i class="el-icon-folder sidebar-icon"></i>
        <span class="sidebar-text">我的项目</span>
      </div>
      <div class="sidebar-item" :class="{active: activeView === 'notes'}" @click="activeView = 'notes'">
        <i class="el-icon-notebook-2 sidebar-icon"></i>
        <span class="sidebar-text">个人笔记</span>
      </div>
    </div>
    
    <div class="sidebar-section">
      <div class="sidebar-title">项目分类</div>
      <div class="sidebar-item" :class="{active: activeCategory === 'physics'}" @click="activeCategory = 'physics'">
        <i class="el-icon-cpu sidebar-icon"></i>
        <span class="sidebar-text">物理</span>
      </div>
      <div class="sidebar-item" :class="{active: activeCategory === 'math'}" @click="activeCategory = 'math'">
        <i class="el-icon-data-analysis sidebar-icon"></i>
        <span class="sidebar-text">数学</span>
      </div>
      <div class="sidebar-item" :class="{active: activeCategory === 'cs'}" @click="activeCategory = 'cs'">
        <i class="el-icon-monitor sidebar-icon"></i>
        <span class="sidebar-text">计算机</span>
      </div>
      <div class="sidebar-item" :class="{active: activeCategory === 'bio'}" @click="activeCategory = 'bio'">
        <i class="el-icon-orange sidebar-icon"></i>
        <span class="sidebar-text">生物</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useProjectStore } from '@/stores/projects'

export default {
  name: 'AppSidebar',
  setup() {
    const projectStore = useProjectStore()
    
    const activeView = ref('home')
    const activeCategory = computed({
      get: () => projectStore.activeCategory,
      set: (value) => projectStore.activeCategory = value
    })
    
    return {
      activeView,
      activeCategory
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  background-color: white;
  border-right: 1px solid var(--border-color);
  padding: 20px 0;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 25px;
}

.sidebar-title {
  padding: 10px 20px;
  font-weight: bold;
  color: var(--info-color);
  font-size: 14px;
}

.sidebar-item {
  padding: 12px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.sidebar-item:hover {
  background-color: #f5f7fa;
  color: var(--primary-color);
}

.sidebar-item.active {
  background-color: #ecf5ff;
  color: var(--primary-color);
  border-right: 3px solid var(--primary-color);
}

.sidebar-icon {
  margin-right: 10px;
  font-size: 18px;
}

@media (max-width: 768px) {
  .sidebar-title, .sidebar-text {
    display: none;
  }
  
  .sidebar-icon {
    margin-right: 0;
  }
}
</style>