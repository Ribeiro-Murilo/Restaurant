<template>
  <div class="home">
    <router-link to="/cart" class="cart-icon">
      <cartIcon />
    </router-link>
    <CategoryMenu />
    <ItemsList />
    <cart class="cart" />
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryMenu from "@/components/CategoryMenu.vue";
import ItemsList from "@/components/ItemsList.vue";
import Cart from "@/components/cart.vue";
import Mixin from "@/mixins/mixins";
import cartIcon from "@/assets/icons/cart.svg";

export default {
  name: "HomeView",
  components: {
    CategoryMenu,
    ItemsList,
    Cart,
    cartIcon,
  },
  mixins: [Mixin],
};
</script>

<style scopet lang="less">
.home {
  display: flex;
  .cart{
    margin: 0 0 auto auto;
  }
  .cart-icon{
    display: none;
  } 
  @media @small-desktop {
    .cart{
      display: none;

    }
    .cart-icon {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: @pink;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px 20px 20px auto;
      svg {
        path {
          fill: none;
        }
      }
    }
    flex-direction: column;
  }
}
</style>
