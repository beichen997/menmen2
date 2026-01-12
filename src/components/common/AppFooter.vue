<template>
  <footer class="footer">
    <div>© 2023 DocCollab 文档协作平台</div>
    <div style="margin-top:10px;font-size:13px">
      联系我们: contact@doccollab.com | 服务协议 | 隐私政策
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.footer {
  background-color: white;
  border-top: 1px solid var(--border-color);
  padding: 20px;
  text-align: center;
  color: var(--info-color);
  font-size: 14px;
}
</style>