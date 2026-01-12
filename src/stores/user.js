import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo')) ||{
    id: 1,
    username: 'user123',
    nickname: '文档达人',
    motto: '知识共享，智慧共创',
    avatar: '',
    phone: '13800138000',
    projectCount: 8,
    docCount: 24,
    subjects: ['physics', 'cs'],
    fields: ['frontend', 'ai']
  })
  
  const recentActivities = ref([
    {
      action: '更新了文档《量子计算基础》',
      time: '2小时前',
      avatar: ''
    },
    {
      action: '加入了项目《深度学习数学基础》',
      time: '昨天',
      avatar: ''
    },
    {
      action: '创建了新项目《FPGA高速信号处理》',
      time: '3天前',
      avatar: ''
    }
  ])
  
  function handleAvatarChange(file) {
    userInfo.value.avatar = URL.createObjectURL(file.raw)
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    ElMessage.success('头像已更新')
  }
  
  function saveProfile() {
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    ElMessage.success('个人资料已保存')
  }
   // 注册成功后设置用户信息
  function setUserInfo(info) {
    userInfo.value = { ...userInfo.value, ...info }
    // 保存用户信息到 localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  }
  
  return {
    userInfo,
    recentActivities,
    handleAvatarChange,
    saveProfile
  }
})