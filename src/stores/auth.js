import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';


export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true')
  const isLoginView = ref(true)
  
  const loginForm = ref({
    username: '',
    password: ''
  })
  
  const registerForm = ref({
    username: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })
  
  function handleLogin() {
    if (loginForm.value.username && loginForm.value.password) {
      isAuthenticated.value = true
      localStorage.setItem('isAuthenticated', 'true')
      ElMessage.success('登录成功！')
      router.push('/')
      
    } else {
      ElMessage.error('请输入用户名和密码')
    }
  }
  
  function handleRegister() {
    if (!registerForm.value.username || !registerForm.value.password) {
      ElMessage.error('用户名和密码不能为空')
      return
    }
    
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
      ElMessage.error('两次输入的密码不一致')
      return
    }
    
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
    ElMessage.success('注册成功！')
    router.push('/')
  }
  
  function toggleAuthView() {
    isLoginView.value = !isLoginView.value
  }
  
  function logout() {
    isAuthenticated.value = false
    localStorage.removeItem('isAuthenticated')
    ElMessage.success('已退出登录')
  }
  
  return {
    isAuthenticated,
    isLoginView,
    loginForm,
    registerForm,
    handleLogin,
    handleRegister,
    toggleAuthView,
    logout
  }
})