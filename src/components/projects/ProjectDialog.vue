<template>
  <el-dialog title="创建新项目" v-model="showCreateProject" width="600px">
    <el-form :model="projectForm" label-position="top">
      <el-form-item label="学科">
        <el-select v-model="projectForm.subject" placeholder="请选择学科" style="width:100%">
          <el-option label="物理" value="physics"></el-option>
          <el-option label="数学" value="math"></el-option>
          <el-option label="计算机" value="cs"></el-option>
          <el-option label="生物" value="bio"></el-option>
          <el-option label="化学" value="chemistry"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="具体领域">
        <el-input v-model="projectForm.field" placeholder="请输入具体领域"></el-input>
      </el-form-item>
      
      <el-form-item label="项目类型">
        <el-radio-group v-model="projectForm.type">
          <el-radio label="creative">创造性项目</el-radio>
          <el-radio label="analytical">解析类项目</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item label="项目名称">
        <el-input v-model="projectForm.name" placeholder="请输入项目名称"></el-input>
      </el-form-item>
      
      <el-form-item label="项目描述">
        <el-input 
          v-model="projectForm.description" 
          type="textarea" 
          :rows="3"
          placeholder="请输入项目描述"
        ></el-input>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <el-button @click="showCreateProject = false">取消</el-button>
      <el-button type="primary" @click="createProject">创建</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { computed } from 'vue'
import { useProjectStore } from '@/stores/projects'

export default {
  name: 'ProjectDialog',
  setup() {
    const projectStore = useProjectStore()
    
    const showCreateProject = computed({
      get: () => projectStore.showCreateProject,
      set: (value) => projectStore.showCreateProject = value
    })
    
    const projectForm = computed(() => projectStore.projectForm)
    const createProject = () => projectStore.createProject()
    
    return {
      showCreateProject,
      projectForm,
      createProject
    }
  }
}
</script>