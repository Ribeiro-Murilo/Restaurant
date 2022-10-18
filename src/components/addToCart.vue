<!-- pre-carrinho somente para small desktops para baixo -->

<template>
  <div class="add-cart">
    <router-link class="add-cart--go-back" to="/">←️ Home</router-link>
    <li class="add-cart--item" v-for="item in selectedItem" :key="item.id">
      <!-- <img class="item--img" :src="imageItem" alt="" /> -->
      <div class="content">
        <h2 class="name">{{ item.name }}</h2>
        <p class="offer" v-if="item.offer">Oferta</p>
        <p class="description">{{ item.description }}</p>
        <p class="price">R$ {{ item.price }},00</p>
      </div>
    </li>

    <p class="add-cart--observations">Observações</p>
    <textarea v-model="item.observations" rows="4">item.observations</textarea>
    <button class="primary-button" @click="addToCartButtonClick">
      Concluir
    </button>
  </div>
</template>

<script>
import Mixin from "@/mixins/mixins";
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "@/components/db/dbase";
// import item from "./Item";

export default {
  name: "addToCart",

  mixins: [Mixin],

  setup() {
    return {
      db,
      selectedItem: useObservable(liveQuery(() => db.selectedItem.toArray())),
    };
  },
  data() {
    return {
      //imgId: "",
      item: {},
    };
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
    // imageItem(){
    //   //if (!this.item?.id) return;
    //   this.console()

    //   return require(`../assets/images/${this.item.id}.png`);
    //   //"../assets/images/0001.png"
    // }
  },
  created() {
    if (this.isDesktop()) {
      this.$router.push({ name: "home" });
    }
    this.itemSelected();
  },
  methods: {
    addToCartButtonClick() {
      this.$store.dispatch("addToCart", this.item);
      this.$router.push({ name: "cart" });
    },
    async itemSelected() {
      try {
        const id = await db.selectedItem.add({
          id: this.item.id,
        });
        this.status = `selectedItem ${this.name}
            successfully added. Got id ${id}`;
      } catch (erro) {
        this.status = `Failed to add
            ${this.id}: erro`;
      }
    },
    console() {
      console.log("imgID = " + this.imgId);
      console.log("item.id = " + this.item.id);
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
    width: 330px;
    height: 154px;
    border-radius: 8px;
    background-color: rgb(255, 255, 255);
    position: relative;
    margin: 10px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
    .name {
      font-weight: 600;
      font-size: 18px;
      margin: 0 auto;
      text-align: center;
    }
    .offer {
      position: absolute;
      width: min-content;
      font-weight: 500;
      font-size: 12px;
      color: white;
      background-color: @pink;
      border-radius: 8px;
      padding: 5px 8px;
      left: 15px;
      top: 10px;
    }
    .description {
      color: @dark-grey;
      font-weight: 300;
      font-size: 12px;
      margin: auto;
      text-align: center;
      // max-width: 150px;
    }
    .price {
      position: absolute;
      font-weight: 600;
      font-size: 18px;
      color: @yellow;
      margin: 0;
      right: 15px;
      bottom: 10px;

    }
    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-top: 10px;
    }
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
