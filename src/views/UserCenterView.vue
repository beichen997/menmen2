<template>
  <div>
    <div class="page-title">
      <span>个人中心</span>
    </div>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <div style="background:white;border-radius:6px;padding:20px;text-align:center">
          <el-avatar :size="100" :src="userInfo.avatar" style="margin-bottom:15px">
            {{ userInfo.nickname ? userInfo.nickname.charAt(0) : 'U' }}
          </el-avatar>
          <h3>{{ userInfo.nickname || userInfo.username }}</h3>
          <p style="color:var(--info-color);margin:10px 0">{{ userInfo.motto || '这个人很懒，还没有座右铭' }}</p>
          <el-button type="primary" icon="el-icon-edit" @click="$router.push('/profile')">编辑资料</el-button>
          
          <div style="margin-top:20px;display:flex;justify-content:space-around">
            <div style="text-align:center">
              <div style="font-size:24px;font-weight:bold">{{ userInfo.projectCount || 0 }}</div>
              <div style="color:var(--info-color);font-size:14px">参与项目</div>
            </div>
            <div style="text-align:center">
              <div style="font-size:24px;font-weight:bold">{{ userInfo.docCount || 0 }}</div>
              <div style="color:var(--info-color);font-size:14px">编辑文档</div>
            </div>
          </div>
        </div>
        
        <div style="background:white;border-radius:6px;padding:15px;margin-top:20px">
          <div class="sidebar-title">最近活动</div>
          <div style="margin-top:10px">
            <div v-for="(activity, index) in recentActivities" :key="index" style="padding:10px 0;border-bottom:1px solid var(--border-color)">
              <div style="display:flex;align-items:center">
                <el-avatar :size="30" :src="activity.avatar"></el-avatar>
                <div style="margin-left:10px">
                  <div style="font-size:14px">{{ activity.action }}</div>
                  <div style="font-size:12px;color:var(--info-color)">{{ activity.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      
      <el-col :span="16">
        <div style="background:white;border-radius:6px;padding:20px;margin-bottom:20px">
          <div style="display:flex;align-items:center;margin-bottom:15px">
            <el-input placeholder="搜索项目或文档..." style="flex:1"></el-input>
            <el-button type="primary" icon="el-icon-search" style="margin-left:10px">搜索</el-button>
            <el-button type="success" icon="el-icon-plus" @click="showCreateProject = true" style="margin-left:10px">新建项目</el-button>
          </div>
          
          <el-tabs v-model="userActiveTab">
            <el-tab-pane label="参与的项目" name="projects">
              <div class="project-tree">
                <el-tree :data="userProjects" node-key="id" :props="treeProps" :expand-on-click-node="false">
                  <template #default="{ node, data }">
                    <span style="display:flex;align-items:center">
                      <i :class="data.icon" style="margin-right:5px"></i>
                      <span>{{ node.label }}</span>
                    </span>
                  </template>
                </el-tree>
              </div>
            </el-tab-pane>
            
            <el-tab-pane label="个人笔记" name="notes">
              <div class="project-tree">
                <el-tree :data="userNotes" node-key="id" :props="treeProps" draggable>
                  <template #default="{ node, data }">
                    <span style="display:flex;align-items:center">
                      <i :class="data.icon" style="margin-right:5px"></i>
                      <span>{{ node.label }}</span>
                    </span>
                  </template>
                </el-tree>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useProjectStore } from '@/stores/projects'
import { useUserStore } from '@/stores/user'

export default {
  name: 'UserCenterView',
  setup() {
    const projectStore = useProjectStore()
    const userStore = useUserStore()
    
    const userActiveTab = ref('projects')
    const treeProps = {
      children: 'children',
      label: 'label'
    }
    
    const userInfo = computed(() => userStore.userInfo)
    const recentActivities = computed(() => userStore.recentActivities)
    const showCreateProject = computed({
      get: () => projectStore.showCreateProject,
      set: (value) => projectStore.showCreateProject = value
    })
    const userProjects = computed(() => projectStore.userProjects)
    const userNotes = computed(() => projectStore.userNotes)
    
    return {
      userActiveTab,
      treeProps,
      userInfo,
      recentActivities,
      showCreateProject,
      userProjects,
      userNotes
    }
  }
}
</script>

<style scoped>
.project-tree {
  background: white;
  border-radius: 6px;
  padding: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>