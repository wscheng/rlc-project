<template>
  <div class="member-center" style="background-color: #f1ede9;">
    <div class="favorites-title-block text-center">
      <h5 class="py-2">會員中心</h5>
    </div>
    <div class="list-group text-center">
      <router-link class="list-group-item list-group-item-action" to="/orders">訂單列表</router-link>
      <router-link class="list-group-item list-group-item-action" to="/admin/login">後台管理</router-link>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.member-center {
  margin-top: 104px;
  padding: 20px 50px 20px 50px;
  @media (max-width: 820px) {
    padding: 20px 50px 20px;
  }
  @media (max-width: 768px) {
    margin-top: 0;
    padding: 20px 10px 20px;
  }
}

.favorites-title-block {
  color: white;
  background: #7b2f3d;
}
</style>
