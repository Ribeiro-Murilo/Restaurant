<template>
  <div class="payment">
    <div class="payment--content">
      <router-link class="payment--go-back" to="/">←️ Home</router-link>
      <orderPayment class="dataPayment"></orderPayment>
    </div>
    <cart v-if="isDesktop()" class="cart" ></cart>
  </div>
</template>
<script>
import Mixin from "@/mixins/mixins";
import Cart from "@/components/cart.vue";
import orderPayment from "@/components/order.vue"
export default {
  name: "PaymentView",
  components: {
    Cart,
    orderPayment
  },
  mixins: [Mixin],
};
</script>

<style scoped lang="less">
.payment {
  display: flex;
  &--content {
    flex-grow: 1;
  }
  &--go-back {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
    color: black;
    text-decoration: none;
  }
@media @small-desktop {
    &--content{
      padding: 50px 20px;
    }
    .cart{
      display: none;
    }
  }
  
}
</style>
