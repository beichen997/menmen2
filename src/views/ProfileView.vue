<template>
  <div>
    <div class="page-title">
      <span>个人资料</span>
      <el-button type="primary" @click="saveProfile">保存资料</el-button>
    </div>
    
    <el-row :gutter="20">
      <el-col :span="16">
        <div style="background:white;border-radius:6px;padding:20px">
          <el-form label-position="top">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="用户名">
                  <el-input v-model="userInfo.username" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="昵称">
                  <el-input v-model="userInfo.nickname"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-form-item label="密码">
              <el-input v-model="userInfo.password" type="password" placeholder="请输入新密码"></el-input>
            </el-form-item>
            
            <el-form-item label="座右铭">
              <el-input v-model="userInfo.motto" placeholder="一句话介绍自己"></el-input>
            </el-form-item>
            
            <el-form-item label="手机号">
              <el-input v-model="userInfo.phone"></el-input>
            </el-form-item>
            
            <el-form-item label="关注学科">
              <el-select v-model="userInfo.subjects" multiple style="width:100%">
                <el-option label="物理" value="physics"></el-option>
                <el-option label="数学" value="math"></el-option>
                <el-option label="计算机" value="cs"></el-option>
                <el-option label="生物" value="bio"></el-option>
                <el-option label="化学" value="chemistry"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="关注领域">
              <el-select v-model="userInfo.fields" multiple style="width:100%">
                <el-option label="前端" value="frontend"></el-option>
                <el-option label="后台" value="backend"></el-option>
                <el-option label="AI" value="ai"></el-option>
                <el-option label="硬件" value="hardware"></el-option>
                <el-option label="FPGA" value="fpga"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      
      <el-col :span="8">
        <div style="background:white;border-radius:6px;padding:20px;text-align:center">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleAvatarChange"
          >
            <el-avatar :size="120" :src="userInfo.avatar" style="margin-bottom:15px">
              {{ userInfo.nickname ? userInfo.nickname.charAt(0) : 'U' }}
            </el-avatar>
            <div class="el-upload__tip" style="margin-top:10px">点击修改头像</div>
          </el-upload>
          
          <div style="margin-top:20px">
            <h4>账号信息</h4>
            <div style="margin-top:10px;color:var(--info-color)">
              <div>注册时间: 2023-06-15</div>
              <div>最后登录: 2023-10-18</div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

export default {
  name: 'ProfileView',
  setup() {
    const userStore = useUserStore()
    
    const userInfo = computed(() => userStore.userInfo)
    const handleAvatarChange = (file) => userStore.handleAvatarChange(file)
    const saveProfile = () => userStore.saveProfile()
    
    return {
      userInfo,
      handleAvatarChange,
      saveProfile
    }
  }
}
</script>