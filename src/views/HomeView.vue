<template>
  <div>
    <div class="page-title">
      <span>欢迎回来，{{ userInfo.nickname || userInfo.username }}</span>
      <el-button type="primary" icon="el-icon-plus" @click="showCreateProject = true">创建新项目</el-button>
    </div>
    
    <!-- 轮播图 -->
    <el-carousel height="300px" style="margin-bottom:30px">
      <el-carousel-item v-for="item in carouselItems" :key="item.id">
        <div style="height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(45deg, #6a11cb 0%, #2575fc 100%);color:white;font-size:24px">
          {{ item.title }}
        </div>
      </el-carousel-item>
    </el-carousel>
    
    <!-- 项目展示 -->
    <h3 style="margin-bottom:15px">推荐项目</h3>
    <div class="card-container">
      <ProjectCard 
        v-for="project in recommendedProjects" 
        :key="project.id" 
        :project="project"
        @open="openProject"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useProjectStore } from '@/stores/projects'
import { useUserStore } from '@/stores/user'
import ProjectCard from '@/components/projects/ProjectCard.vue'

export default {
  name: 'HomeView',
  components: {
    ProjectCard
  },
  setup() {
    const projectStore = useProjectStore()
    const userStore = useUserStore()
    
    const userInfo = computed(() => userStore.userInfo)
    const showCreateProject = computed({
      get: () => projectStore.showCreateProject,
      set: (value) => projectStore.showCreateProject = value
    })
    const carouselItems = computed(() => projectStore.carouselItems)
    const recommendedProjects = computed(() => projectStore.recommendedProjects)
    
    const openProject = (project) => projectStore.openProject(project)
    
    return {
      userInfo,
      showCreateProject,
      carouselItems,
      recommendedProjects,
      openProject
    }
  }
}
</script>

<style scoped>
.page-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

@media (max-width: 992px) {
  .card-container {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

@media (max-width: 576px) {
  .card-container {
    grid-template-columns: 1fr;
  }
}
</style>