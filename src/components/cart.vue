<!-- carrinho para desktops area 'seus pedidos' -->

<template>
  <div class="cart">
    <router-link class="cart--go-back" to="/">←️ Home</router-link>
    <h2 class="cart--title">Seu Pedido</h2>
    <div class="cart--content">
      <p v-if="hasNoItem">Seu carrinho esta vazio</p>
      <transition-group name="list">
        <cartItem v-for="item in cartList" :key="item.id" :item="item" />
      </transition-group>
    </div>
    <div class="cart--total" v-if="!hasNoItem">
      <span>Total: </span>
      <span class="price">{{ getCartTotal | currency }}</span>
    </div>
    <button
      class="primary-button payment-button"
      v-if="cartList.length && !isPaymentScreen"
      @click="goToPayment"
    >
      Finalizar compra
    </button>
  </div>
</template>

<script>
import cartItem from "./cartItem.vue";
import { mapGetters } from "vuex";
import Mixin from "@/mixins/mixins";
import feather from "feather-icons";

export default {
  name: "CartFull",
  mixins: [Mixin],
  components: {
    cartItem,
  },
  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  computed: {
    ...mapGetters(["getCartTotal"]),
    cartList() {
      return this.$store.state.cartList;
    },
    hasNoItem() {
      return !this.cartList.length;
    },
    circleIcon() {
      return feather.icons.circle.toSvg();
    },
    isPaymentScreen() {
      return  this.$route.name === "Payment"
    },
  },
  methods: { 
    goToPayment() {
      this.$router.push({ name: "Payment" });
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  background-color: rgb(255, 255, 255);
  width: 540px;
  min-width: 540px;
  height: 100vh;
  padding: 50px 20px 70px 0;
  display: flex;
  flex-direction: column;
  h2 {
    margin: auto;
  }
  &--go-back {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
    color: black;
    text-decoration: none;
    display: none;
    @media @small-desktop {
      display: block;
    }
  }
  &--title {
    font-weight: 600;
    font-size: 24px;
  }
  &--content {
    flex-grow: 1;
    overflow: auto;
    p {
      margin-top: 50px;
      display: flex;
      justify-content: center;
    }
  }
  &--total {
    font-weight: 600;
    font-size: 18px;
    text-align: right;
    margin-top: 30px;
    .price {
      color: @yellow;
      padding-left: 10px;
    }
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateX(-30px);
  }
}

@media @small-desktop {
  .cart {
    width: 100%;
    min-width: unset;
    max-width: 800px;
    margin: auto;
    border-radius: 50px;
    padding: 50px 25px 25px;
  }
}
</style>
