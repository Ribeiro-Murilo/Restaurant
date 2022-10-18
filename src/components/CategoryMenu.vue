<!-- div das categorias tanto para celular quanto para desktop-->
<template>
  <div class="category-menu">
    <ul>
      <li
        v-for=" category in categoriesList"
        :key="category.id"
        @click="onCategoryClick(category.id)"
        :class="{ active: isActive(category.id) }"
      >
        <component :is="category.icon" />
        <p>{{ category.label }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import Pizza from "../assets/icons/pizza.svg";
import Combo from "../assets/icons/french-fries.svg";
import Deserts from "../assets/icons/ice-cream.svg";
import Drinks from "../assets/icons/smothie.svg";
import Burguer from "../assets/icons/food.svg";

export default {
  name: "CategoryMenu",
  components: {
    Pizza,
    Combo,
    Deserts,
    Drinks,
    Burguer,
  },
  data() {
    return {
      categoriesList: [
        { label: "Combos", icon: "Combo", id: "combo" },
        { label: "Pizza", icon: "Pizza", id: "pizza" },
        { label: "Burguers", icon: "Burguer", id: "burguers" },
        { label: "Bebidas", icon: "Drinks", id: "drinks" },
        { label: "Doces", icon: "Deserts", id: "deserts" },
      ],
      selectedCategory: "",
    };
  },
  mounted() {
    this.onCategoryClick("pizza");
  },
  methods: {
    onCategoryClick(id) {id
      this.selectedCategory = id;
      this.$store.dispatch("changeCategory", id);
    },
    isActive(id) {
      return this.selectedCategory === id;
    },
  },
};
</script>

<style lang="less" scoped>
.category-menu {
  width: 130px;
  height: 100vh;
  background: white;

  display: flex;
  align-items: center;

  ul {
    list-style: none;
    padding: 0;
    width: 100%;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px;
      cursor: pointer;
      p {
        margin-bottom: 0;
        font-weight: 500;
        font-size: 14px;
        color: @dark-grey;
      }
      svg {
        path {
          fill: @dark-grey;
        }
      }
      &.active {
        background-color: @yellow;
        border-radius: 10px;
        svg {
          path {
            fill: black;
          }
        }
        p {
          color: black;
        }
      }
    }
  }
  @media @small-desktop {
    width: 100%;
    min-width: 100%;
    height: fit-content;
    margin: 0 auto;
    ul {
      display: flex;
      margin: 10px 20px 20px 20px;
      overflow: scroll;
      justify-content: center;
      li {
        min-width: 100px;
      }
    }
  }
  @media @smartphone {
    width: 100%;
    height: fit-content;
    ul {
      display: flex;
      margin: 10px 20px 20px 20px;
      overflow: scroll;
      justify-content: unset;

      li {
        min-width: 80px;
      }
    }
  }
}
</style>
