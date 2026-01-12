<template>
  <div id="app">
    <AuthView v-if="!isAuthenticated" />
    <div v-else>
      <AppHeader />
      <div class="main-container">
        <AppSidebar />
        <div class="content-area">
          <router-view />
        </div>
      </div>
      <AppFooter />
      <ProjectDialog />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthView from '@/views/AuthView.vue'
import AppHeader from '@/components/common/AppHeader.vue'
import AppSidebar from '@/components/common/AppSidebar.vue'
import AppFooter from '@/components/common/AppFooter.vue'
import ProjectDialog from '@/components/projects/ProjectDialog.vue'

export default {
  name: 'App',
  components: {
    AuthView,
    AppHeader,
    AppSidebar,
    AppFooter,
    ProjectDialog
  },
  setup() {
    const authStore = useAuthStore()
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    return {
      isAuthenticated
    }
  }
}
</script>

<style>
:root {
  --primary-color: #409EFF;
  --success-color: #67C23A;
  --warning-color: #E6A23C;
  --danger-color: #F56C6C;
  --info-color: #909399;
  --bg-color: #f5f7fa;
  --sidebar-width: 240px;
  --header-height: 60px;
  --border-color: #ebeef5;
}

body {
  background-color: var(--bg-color);
  color: #333;
  min-height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-container {
  display: flex;
  flex: 1;
}

.content-area {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>