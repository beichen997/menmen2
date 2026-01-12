<template>
  <header class="header">
    <div class="logo">
      <i class="el-icon-document logo-icon"></i>
      <span>DocCollab</span>
    </div>
    
    <div class="nav-menu">
      <div class="nav-item" :class="{active: $route.name === 'Home'}" @click="$router.push('/')">首页</div>
      <div class="nav-item" :class="{active: activeNav === 'projects'}" @click="activeNav = 'projects'">项目</div>
      <div class="nav-item" :class="{active: activeNav === 'docs'}" @click="activeNav = 'docs'">文档</div>
      <div class="nav-item" :class="{active: activeNav === 'team'}" @click="activeNav = 'team'">团队</div>
    </div>
    
    <div class="search-box">
      <el-input placeholder="搜索文档、项目..." v-model="searchKeyword">
        <template #prefix>
          <i class="el-icon-search"></i>
        </template>
      </el-input>
    </div>
    
    <div class="user-actions">
      <el-button type="primary" icon="el-icon-plus" @click="showCreateProject = true">新建</el-button>
      <el-badge :value="3" class="item">
        <el-button icon="el-icon-bell" circle></el-button>
      </el-badge>
      <el-dropdown>
        <div class="user-avatar">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="avatar">
          <div v-else style="display:flex;align-items:center;justify-content:center;height:100%;">
            {{ userInfo.nickname ? userInfo.nickname.charAt(0) : 'U' }}
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/user-center')">个人中心</el-dropdown-item>
            <el-dropdown-item @click="$router.push('/profile')">个人资料</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/projects'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'AppHeader',
  setup() {
    const router = useRouter()
    const projectStore = useProjectStore()
    const userStore = useUserStore()
    const authStore = useAuthStore()
    
    const activeNav = ref('home')
    const searchKeyword = computed({
      get: () => projectStore.searchKeyword,
      set: (value) => projectStore.searchKeyword = value
    })
    
    const showCreateProject = computed({
      get: () => projectStore.showCreateProject,
      set: (value) => projectStore.showCreateProject = value
    })
    
    const userInfo = computed(() => userStore.userInfo)
    
    const handleLogout = () => {
      authStore.logout()
      router.push('/auth')
    }
    
    return {
      activeNav,
      searchKeyword,
      showCreateProject,
      userInfo,
      handleLogout
    }
  }
}
</script>

<style scoped>
.header {
  height: var(--header-height);
  background: linear-gradient(135deg, #1e5799 0%, #207cca 51%, #2989d8 100%);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.logo {
  display: flex;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
  margin-right: 30px;
}

.logo-icon {
  font-size: 28px;
  margin-right: 10px;
}

.nav-menu {
  display: flex;
  flex: 1;
}

.nav-item {
  padding: 0 15px;
  height: var(--header-height);
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 15px;
}

.nav-item:hover, .nav-item.active {
  background-color: rgba(255, 255, 255, 0.15);
}

.search-box {
  width: 300px;
  margin: 0 20px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #eee;
  cursor: pointer;
  border: 2px solid rgba(255, 255, 255, 0.7);
  overflow: hidden;
}
</style>