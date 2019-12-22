<template>
  <div class="front-orders" style="background-color: #f1ede9;">
    <div class="orders-title-block text-center">
      <h5 class="py-2">訂單列表</h5>
    </div>
    <OrderList />
  </div>
</template>

<script>
import OrderList from "@/components/OrderList";

/*eslint no-console: ["error", { allow: ["warn", "error"] }] */
export default {
  components: {
    OrderList
  }
};
</script>

<style lang="scss" scoped>
.front-orders {
  margin-top: 104px;
  padding: 20px 50px 20px 50px;
  @media (max-width: 820px) {
    padding: 20px 50px 20px;
  }
  @media (max-width: 768px) {
    margin-top: 0px;
    padding: 20px 10px 20px;
  }
}

.orders-title-block {
  color: white;
  background: #7b2f3d;
}
</style>
