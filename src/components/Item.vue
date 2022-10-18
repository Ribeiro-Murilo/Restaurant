<!-- div do item home tanto para celular quanto para desktop-->
<template>
  <div class="item" @click="addToCart">
    <div class="conteiner">
      <div class="item--tag" v-if="item.offer">Oferta</div>
      <img class="item--img" :src="imagePath" alt="" />
    </div>
    <div class="content">
      <h2 class="item--name">{{ item.name }}</h2>
      <p class="item--description">{{ item.description }}</p>
      <p class="item--price">{{ item.price | currency }}</p>
    </div>
  </div>
</template>

<script>
import Mixin from "@/mixins/mixins";
import { db } from "@/components/db/dbase";
// import addToCart from "@/components/addToCart.vue"

export default {
  name: "Item-List",
  mixins: [Mixin],
  data() {
    return{
      id: this.item.id,
      name: this.item.name,
      description: this.item.description,
      price: this.item.price,
      offer: this.item.offer,
    };
  },
  filters: {
    currency(value) {
      if (!value) {
        return;
      }
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  props: {
    item: {},
    //selectedID: ""
  },
  computed: {
    imagePath() {
      if (!this.item?.id) return;
      return require(`../assets/images/${this.item.id}.png`);
    },
  },
  created(){
    // this.console();
  },
  methods: {
    addToCart() {
      if (this.isDesktop()) {
        this.$store.dispatch("addToCart", this.item);
        return;
      }
      this.removePreviousItem();
      this.itemSelected();
      this.$router.push({ name: "addToCart", params: { id: this.item.id } }); //usado para entrar no precarrinho para celular
    },

    removePreviousItem(){
      db.selectedItem.clear()
    },
    async itemSelected() {
      try {
        const id = await db.selectedItem.add({
          id: this.id,
          name: this.name,
          description: this.description,
          price: this.price,
          offer: this.offer,
        });
        this.status = `selectedItem ${this.name}
            successfully added. Got id ${id}`;
      } catch (error) {
        this.status = `Failed to add
            ${this.name}: ${error}`;
            // console.log("erro add to db")
      }
    },
    console(){
      //console.log("item.vue = "+this.id)
      console.log(this.itemID)
      
    }
  },
};
</script>

<style lang="less" scoped>
.item {
  width: 215px;
  height: 300px;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  position: relative;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  &--tag {
    position: absolute;
    border-radius: 8px;
    background-color: @pink;
    color: white;
    right: 15px;
    top: 15px;
    font-weight: 500;
    font-size: 12px;
    padding: 5px 8px;
  }
  &--img {
    display: block;
    margin: auto;
    width: 100%;
  }
  &--name {
    font-weight: 600;
    font-size: 18px;
    margin: 0 auto;
    text-align: center;
  }
  &--description {
    color: @dark-grey;
    font-weight: 300;
    font-size: 12px;
    margin: 0;
    max-width: 150px;
  }
  &--price {
    font-weight: 600;
    font-size: 18px;
    color: @yellow;
    margin: 0;
  }
  .content {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;
  }
  @media @small-desktop {
    margin: 0 auto 30px;
  }
  @media @tablets {
    width: 75%;
    height: fit-content;
    border: 1px solid @light-grey;
    flex-direction: row;
    margin: 10px auto;
    padding: 10px 20px;
    &--img {
      height: auto;
      order: 0;
    }
    &--price {
      text-align: right;
      margin: 5px 0 0 auto;
    }
    &--description {
      width: fit-content;
      margin: auto;
    }
    &--tag {
      position: static;
      order: 1;
      width: fit-content;
      margin: 0 20px 0 0;
    }
    .conteiner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 30%;
    }
    .content {
      flex-grow: 1;
    }
  }

  @media @smartphone {
    width: 100%;
  }
}
</style>
