<!-- div da organização dos itens na home tanto para celular quanto para desktop-->
<template>
  <div class="items-list">
    <Loading v-if="isLoading" />
    <item v-for="item in itemsList" :key="item.id" :item="item"> </item>
  </div>
</template>

<script>
import axios from "axios";
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
      setTimeout(() => {
        axios
          .get(`http://localhost:3000/${this.selectedCategory}`)
          .then((response) => {
            this.itemsList = response.data;
            this.isLoading=false;
          });
      }, 100);
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
}
</style>
