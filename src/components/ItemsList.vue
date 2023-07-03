<!-- div da organização dos itens na home tanto para celular quanto para desktop-->
<template>
  <div class="items-list">
    <Loading v-if="isLoading" />
    <item class="item" v-for="item in itemsList" :key="item.id" :item="item"> </item>
  </div>
</template>

<script>
import Item from "./Item.vue";
import Loading from "./LoadingItem.vue";

export default {
  name: "ItemsList",
  components: {
    Item,
    Loading,
  },
  data() {
    return {
      itemsList: [],
      isLoading: false,
      selected: " List",
      pizzaList: [
        {
          id: "0001",
          name: "Calabresa",
          description: "Molho de tomate, calabresa e queijo",
          price: 23.0,
          offer: true,
        },
        {
          id: "0002",
          name: "4 Queijos",
          description: "Molho de tomate e 4 queijos",
          price: 27.0,
          offer: false,
        },
        {
          id: "0003",
          name: "Strogonoff",
          description: "Molho de tomate e strogonoff de carne",
          price: 29.0,
          offer: false,
        },
        {
          id: "0004",
          name: "1 Queijo",
          description: "Molho de tomate e 1 queijo",
          price: 27.0,
          offer: false,
        },
      ],
      drinksList: [
        {
          id: "0005",
          name: "Coca-cola lata",
          description: "Lata 350ml",
          price: 4.5,
          offer: false,
        },
        {
          id: "0006",
          name: "Guaraná Lata",
          description: "Lata 350ml",
          price: 4.5,
          offer: false,
        },
      ],
      desertsList: [
        {
          id: "0007",
          name: "Casquinha mista",
          description: "Casquinha mista de creme e chocolate",
          price: 2.5,
          offer: true,
        },
        {
          id: "0008",
          name: "Sorvete de morango",
          description: "Sorvete de morango na casquinha",
          price: 6.0,
          offer: false,
        },
        {
          id: "0009",
          name: "Milshake",
          description: "Milskahe de chocolate",
          price: 10.0,
          offer: false,
        },
      ],
      comboList: [
        {
          id: "0010",
          name: "Combo 1",
          description:
            "1 hamburguer duplo, 1 guaraná lata e 1 milkshake chocolate",
          price: 50.0,
          offer: true,
        },
        {
          id: "0011",
          name: "Combo 2",
          description: "2 pizzas",
          price: 45.0,
          offer: true,
        },
      ],
      burguersList: [
        {
          id: "0012",
          name: "Duplo Burguer",
          description:
            "Pão, maionese, 2 carnes de 180g, alface, tomate, bacon e cebola roxa",
          price: 25.0,
          offer: true,
        },
        {
          id: "0013",
          name: "Triplo Burguer",
          description:
            "Pão, maionese, 3 carnes de 180g, alface, tomate, bacon e cebola roxa",
          price: 32.0,
          offer: true,
        },
        {
          id: "0014",
          name: "Chicken Burguer",
          description:
            "Pão, maionese, carne de frango, alface, tomate e queijo",
          price: 16.0,
          offer: false,
        },
        {
          id: "0015",
          name: "Kids Burguer",
          description:
            "Pão, maionese, 1 hamburguer de 180g e 1 fatia de queijo cheddar",
          price: 12.0,
          offer: false,
        },
        {
          id: "0016",
          name: "Chicken Burguer",
          description:
            "Pão, maionese, carne de frango, alface, tomate e queijo",
          price: 16.0,
          offer: false,
        },
        {
          id: "0017",
          name: "Chicken Burguer",
          description:
            "Pão, maionese, carne de frango, alface, tomate e queijo",
          price: 16.0,
          offer: false,
        },
        {
          id: "0018",
          name: "Chicken Burguer",
          description:
            "Pão, maionese, carne de frango, alface, tomate e queijo",
          price: 16.0,
          offer: false,
        },
        {
          id: "0019",
          name: "Chicken Burguer",
          description:
            "Pão, maionese, carne de frango, alface, tomate e queijo",
          price: 16.0,
          offer: false,
        },
        {
          id: "0020",
          name: "Chicken Burguer",
          description:
            "Pão, maionese, carne de frango, alface, tomate e queijo",
          price: 16.0,
          offer: false,
        },
        {
          id: "0021",
          name: "Chicken Burguer",
          description:
            "Pão, maionese, carne de frango, alface, tomate e queijo",
          price: 16.0,
          offer: false,
        },
        {
          id: "0022",
          name: "Chicken Burguer",
          description:
            "Pão, maionese, carne de frango, alface, tomate e queijo",
          price: 16.0,
          offer: false,
        },
      ],
    };
  },
  created() {
    this.getItemsList();
  },
  computed: {
    selectedCategory() {
      return this.$store.state.selectedCategory;
    },
  },
  methods: {
    getItemsList() {
      this.isLoading = true;
      this.itemsList = [];
      this.changeItemsList();
      this.isLoading = false;
    },
    changeItemsList() {
      let variableSelected = this.selectedCategory;
      let changeVariable = this.selected.replace(" ", variableSelected);
      if (changeVariable == "pizzaList") {
        this.itemsList = this.pizzaList;
      }
      if (changeVariable == "drinksList") {
        this.itemsList = this.drinksList;
      }
      if (changeVariable == "desertsList") {
        this.itemsList = this.desertsList;
      }
      if (changeVariable == "comboList") {
        this.itemsList = this.comboList;
      }
      if (changeVariable == "burguersList") {
        this.itemsList = this.burguersList;
      }
      this.variableSelected = this.itemsList;
    },
  },
  watch: {
    selectedCategory() {
      this.getItemsList();
    },
  },
};
</script>

<style lang="less" scoped>
.items-list {
  flex-wrap: wrap;
  display: flex;
  height: fit-content;
  @media @small-desktop {
    flex-wrap: wrap;
    margin: 20px;
  }
  .item{
    cursor: pointer;
  }
}
</style>
