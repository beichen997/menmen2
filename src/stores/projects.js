import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export const useProjectStore = defineStore('project', () => {
  const showCreateProject = ref(false)
  const activeCategory = ref('physics')
  const searchKeyword = ref('')
  
  const projectForm = ref({
    subject: '',
    field: '',
    type: 'creative',
    name: '',
    description: ''
  })
  
  const carouselItems = ref([
    { id: 1, title: '探索物理世界的新视角' },
    { id: 2, title: '数学建模实战案例分享' },
    { id: 3, title: '人工智能前沿技术解析' },
    { id: 4, title: '生物医学工程创新项目' }
  ])
  
  const recommendedProjects = ref([
    {
      id: 1,
      name: '量子计算基础研究',
      description: '探索量子计算的基本原理和实现方法',
      type: 'creative',
      owner: { nickname: '张教授', avatar: '' }
    },
    {
      id: 2,
      name: '深度学习数学基础',
      description: '深入解析深度学习背后的数学原理',
      type: 'analytical',
      owner: { nickname: '李博士', avatar: '' }
    },
    {
      id: 3,
      name: 'FPGA高速信号处理',
      description: '基于FPGA的高速信号处理系统实现',
      type: 'creative',
      owner: { nickname: '王工程师', avatar: '' }
    },
    {
      id: 4,
      name: '生物信息学分析',
      description: '利用计算机技术分析生物数据',
      type: 'analytical',
      owner: { nickname: '赵研究员', avatar: '' }
    }
  ])
  
  const userProjects = ref([
    {
      id: 1,
      label: '量子计算基础研究',
      icon: 'el-icon-folder',
      children: [
        { id: 11, label: '基础理论', icon: 'el-icon-document' },
        { id: 12, label: '实验数据', icon: 'el-icon-document' },
        { id: 13, label: '研究论文', icon: 'el-icon-document' }
      ]
    },
    {
      id: 2,
      label: '深度学习数学基础',
      icon: 'el-icon-folder',
      children: [
        { id: 21, label: '线性代数', icon: 'el-icon-document' },
        { id: 22, label: '概率论', icon: 'el-icon-document' },
        { id: 23, label: '优化方法', icon: 'el-icon-document' }
      ]
    }
  ])
  
  const userNotes = ref([
    {
      id: 1,
      label: '学习笔记',
      icon: 'el-icon-notebook-2',
      children: [
        { id: 11, label: 'Vue3 高级技巧', icon: 'el-icon-tickets' },
        { id: 12, label: '算法笔记', icon: 'el-icon-tickets' }
      ]
    },
    {
      id: 2,
      label: '会议记录',
      icon: 'el-icon-notebook-2',
      children: [
        { id: 21, label: '项目讨论会', icon: 'el-icon-tickets' },
        { id: 22, label: '技术分享会', icon: 'el-icon-tickets' }
      ]
    }
  ])
  
  function createProject() {
    if (!projectForm.value.name) {
      ElMessage.error('请输入项目名称')
      return
    }
    
    const newProject = {
      id: Date.now(),
      name: projectForm.value.name,
      description: projectForm.value.description,
      type: projectForm.value.type,
      owner: {
        nickname: '当前用户',
        avatar: ''
      }
    }
    
    recommendedProjects.value.unshift(newProject)
    userProjects.value.unshift({
      id: newProject.id,
      label: newProject.name,
      icon: 'el-icon-folder',
      children: []
    })
    
    showCreateProject.value = false
    projectForm.value = {
      subject: '',
      field: '',
      type: 'creative',
      name: '',
      description: ''
    }
    
    ElMessage.success('项目创建成功！')
  }
  
  function openProject(project) {
    ElMessage.info(`已打开项目: ${project.name}`)
  }
  
  return {
    showCreateProject,
    activeCategory,
    searchKeyword,
    projectForm,
    carouselItems,
    recommendedProjects,
    userProjects,
    userNotes,
    createProject,
    openProject
  }
})