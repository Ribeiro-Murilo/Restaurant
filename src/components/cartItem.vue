<!-- div do item no carrinho tanto para celular quanto para desktop-->

<template>
  <div class="item">
    <ItemQuantity :item="item" />
    <div class="item--img-container">
      <img class="item--img" :src="imagePath" />
    </div>
    <div class="content">
      <h3 class="item--name">{{ item.name }}</h3>
      <span class="item--observation" @click="onShowObservartionModal"
        >Adicionar observação</span
      >
      <p class="item--observation-text"> {{ newPropItem.observations }} </p>
    </div>
    <p class="item--price">{{ item.price | currency }}</p>
    <Modal
      :show="ShowObservationModal"
      @onCancelClick="onCloseObservationModal"
    >
      <div class="Modal--content">
        <h1>Adicionar observação</h1>
        <textarea v-model="newPropItem.observations" rows="8"></textarea>
        <button class="secondary-button" @click="onCancelClick">Cancelar</button>
        <button class="primary-button" @click="salveObservation">Salvar</button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ItemQuantity from "./Quantity.vue";
import Mixin from "@/mixins/mixins";
import Modal from "./Modal.vue";

export default {
  name: "cartItem",
  components: {
    ItemQuantity,
    Modal,
  },
  data: function () {
    return {
      newPropItem:this.item,
      ShowObservationModal: false,
    };
  },
  mixins: [Mixin],

  props: {
    item: {},
  },

  filters: {
    currency(value) {
      return `R$ ${value.toLocaleString("pt-br", {
        minimumFractionDigits: 2,
      })}`;
    },
  },
  computed: {
    imagePath() {
      return require(`../assets/images/${this.item.id}.png`);
    },
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    onShowObservartionModal() {
      if (this.isSmallScreens()) {
        this.$router.push({ name: "addToCart", params: { id: this.item.id } });

        return;
      }
      this.ShowObservationModal = true;
    },
    onCloseObservationModal() {
      this.ShowObservationModal = false;
    },
    salveObservation() {
      this.$store.dispatch("addObservation", this.item);
      this.ShowObservationModal = false;
    },

    onCancelClick() {},
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid @light-grey;

  &--img-container {
    border-radius: 8px;
    background: @light-yellow;
    width: 81px;
    height: 66px;
    display: flex;
    align-items: center;
    margin: auto;
  }
  &--img {
    width: 65px;
    display: block;
    margin: auto ;
  }
  &--name {
    font-weight: 600;
    font-size: 18px;
    margin: 0;
  }
  &--observation {
    font-weight: 500;
    font-size: 12px;
    color: @dark-grey;
    text-decoration: underline;
    cursor: pointer;
  }
  &--observation-text {
    font-weight: 500;
    font-size: 12px;
    color: @dark-grey;
    max-height: 50px;
    overflow: auto;
    margin: 15px auto 0;
  }
  .content {
    flex-grow: 1;
    padding: 0 20px;
    max-width: 270px;
  }
  &--price {
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: @yellow;
    margin: auto;
  }

  .Modal--content {
    text-align: center;
    textarea {
      width: 100%;
      margin-bottom: 20px;
      border-radius: 8px;
      border: 1px solid @light-grey;
    }
    button + button {
      margin-left: 15px;
    }
  }
  @media @tablets {
    flex-wrap: wrap;
    &--img-container {
      order: 1;
    }
    .content {
      order: 2;
    }
    &--quantity {
      order: 3;
      padding: 0;
      width: 81px;
      justify-content: center;
    }
    &--price {
      order: 4;
      padding: 0 20px;
      margin: 5px 0;
    }
  }
}
</style>
