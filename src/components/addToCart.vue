<!-- pre-carrinho somente para small desktops para baixo -->

<template>
  <div class="add-cart">
    <router-link class="add-cart--go-back" to="/" >←️ Home</router-link>
    <item :item="item" class="add-cart--item" />
    <p class="add-cart--observations">Observações</p>
    <textarea v-model="item.observations" rows="4">item.observations</textarea>
    <button class="primary-button" @click="addToCartButtonClick">Concluir</button>
  </div>
</template>

<script>
import Mixin from "@/mixins/mixins";
import axios from "axios";
import item from "./Item";

export default {
  props: ["id"],
  components: {
    item,
  },

  mixins: [Mixin],

  data() {
    return {
      item: {},
    };
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
  },
  created() {
    if(this.isDesktop()){
      this.$router.push({name: 'home'})
    }
    axios
      .get(`http://localhost:3000/${this.selectedCategory}/${this.id}`)
      .then((response) => {
        this.item = { quantity: 1, ...response.data };
      });
  },
  methods: {
    addToCartButtonClick() {
      this.$store.dispatch('addToCart', this.item);
      this.$router.push({ name: "cart" });
    },
  },
};
</script>

<style lang="less" scoped>
.add-cart {
  max-width: 700px;
  padding: 50px 20px;
  margin: auto;
  &--go-back {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
    color: black;
    text-decoration: none;
  }
  &--item {
    margin-top: 50px;
  }
  &--observations {
    font-weight: 600;
    font-size: 16px;
  }
  textarea {
    width: 100%;
    border-radius: 8px;
    border: 1px solid @light-grey;
  }
  button {
    width: 100%;
    margin-top: 30px;
    
  }
}
</style>
