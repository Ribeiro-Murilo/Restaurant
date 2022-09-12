<!-- quantidade dos itens tanto no calular quanto no desktop -->
<template>
  <div class="item--quantity">
    <button
      class="buttons"
      @click="onDecreaseButtonClick"
      :disabled="item.quantity === 0"
    >
      -
    </button>
    <span class="number">{{ item.quantity }}</span>
    <button class="buttons" @click="onIncreaseButtonClick">+</button>
    <Modal :show="showModal">
      <div class="modal-content">
        <h2>Deseja remover esse item do carrinho?</h2>
        <button class="secondary-button" @click="onCancelClick">
          Cancelar
        </button>
        <button class="primary-button" @click="onRemoveClick">
          Sim, remover
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Modal from "./Modal.vue";
export default {
  name: "itemQuantity",
  components: {
    Modal,
  },
  data() {
    return {
      showModal: false,
    };
  },
  props: {
    item: {},
    userStore: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    ...mapActions(["increaseQuantity", "decreaseQuantity"]),
    onDecreaseButtonClick() {
      if (this.userStore) {
        this.decreaseQuantity(this.item.id);
        if (!this.item.quantity) this.showModal = true;
        return;
      }
      --this.Item.quantity;
    },

    onIncreaseButtonClick() {
      if (this.userStore) {
        this.increaseQuantity(this.item.id);
        return;
      }
      ++this.Item.quantity;
    },
    onCancelClick() {
      this.increaseQuantity(this.item.id);
      this.showModal = false;
    },
    onRemoveClick() {
      this.showModal = false;
      this.$nextTick(() => {
        this.$store.dispatch("removeItem", this.item.id);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.item--quantity {
  display: flex;
  align-items: center;
  padding-right: 40px;
  .number {
    font-weight: 500;
    font-size: 18px;
    color: @yellow;
    width: 28px;
    text-align: center;
  }
  .buttons {
    font-size: 600;
    font-weight: 18px;
    cursor: pointer;
    background: none;
    border: 0;
    &:focus {
      outline: 0;
    }
  }
  .modal-content {
    text-align: center;
    h2 {
      margin-bottom: 40px;
    }
    button {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
