<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <h2>{{ isLoginView ? '欢迎回来' : '创建账户' }}</h2>
        <p>{{ isLoginView ? '请登录您的账户' : '加入我们，开始协作之旅' }}</p>
      </div>
      
      <div class="auth-body">
        <el-form v-if="isLoginView" :model="loginForm" label-position="top">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleLogin" style="width:100%;margin-top:10px">登录</el-button>
        </el-form>
        
        <el-form v-else :model="registerForm" label-position="top">
          <el-form-item label="用户名">
            <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="registerForm.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="registerForm.password" type="password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="registerForm.confirmPassword" type="password" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="registerForm.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-button type="primary" @click="handleRegister" style="width:100%;margin-top:10px">注册</el-button>
        </el-form>
      </div>
      
      <div class="auth-footer">
        <span>{{ isLoginView ? '没有账户？' : '已有账户？' }}</span>
        <span class="auth-switch" @click="toggleAuthView">
          {{ isLoginView ? '立即注册' : '立即登录' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'AuthForm',
  setup() {
    const authStore = useAuthStore()
    
    const isLoginView = computed(() => authStore.isLoginView)
    const loginForm = computed(() => authStore.loginForm)
    const registerForm = computed(() => authStore.registerForm)
    
    const handleLogin = () => authStore.handleLogin()
    const handleRegister = () => authStore.handleRegister()
    const toggleAuthView = () => authStore.toggleAuthView()
    
    return {
      isLoginView,
      loginForm,
      registerForm,
      handleLogin,
      handleRegister,
      toggleAuthView
    }
  }
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
}

.auth-card {
  width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.auth-header {
  background: linear-gradient(135deg, #1e5799 0%, #207cca 51%, #2989d8 100%);
  color: white;
  padding: 25px;
  text-align: center;
}

.auth-body {
  padding: 25px;
}

.auth-footer {
  padding: 15px 25px;
  text-align: center;
  background-color: #f5f7fa;
  border-top: 1px solid var(--border-color);
}

.auth-switch {
  color: var(--primary-color);
  cursor: pointer;
  font-weight: 500;
}

@media (max-width: 576px) {
  .auth-card {
    width: 90%;
  }
}
</style>