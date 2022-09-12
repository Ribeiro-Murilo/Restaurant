import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    selectedCategory: "",
    cartList: [],
  },
  mutations: {
    changeCategory(state, id) {
      state.selectedCategory = id;
    },
    addToCart(state, el) {
      state.cartList.push({ ...el, quantity: 1 });
    },
    increaseQuantity(state, index) {
      ++state.cartList[index].quantity;
    },
    decreaseQuantity(state, index) {
      --state.cartList[index].quantity;
    },
    addObservation(state, { index, observations }) {
      state.cartList[index].observations = observations;
    },
    removeItem(state, index) {
      state.cartList.splice(index, 1);
    },
  },
  actions: {
    changeCategory(context, id) {
      context.commit("changeCategory", id);
    },

    addToCart({ state, commit }, el) {
      const cartItem = state.cartList.find((cartItem) => cartItem.id === el.id);
      if (!cartItem) {
        commit("addToCart", el);
        return;
      }

      const index = state.cartList.findIndex(
        (cartItem) => cartItem.id === el.id
      );

      // cartItem ? commit("increaseQuantity", index) : commit("addToCart", el);

      if (el.observations) {
        commit("addObservation", {
          index: index,
          observations: el.observations,
        });
      }
    },

    increaseQuantity({ state, commit }, id) {
      const index = state.cartList.findIndex((cartItem) => cartItem.id === id);
      commit("increaseQuantity", index);
    },
    decreaseQuantity({ state, commit }, id) {
      const index = state.cartList.findIndex((cartItem) => cartItem.id === id);
      commit("decreaseQuantity", index);
    },
    removeItem({ state, commit }, id) {
      const index = state.cartList.findIndex((cartItem) => cartItem.id === id);
      if (index !== -1) commit("removeItem", index);
    },

    addObservation({ state, commit }, el) {
      const index = state.cartList.findIndex(
        (cartItem) => cartItem.id === el.id
      );
      commit("addObservation", {
        index: index,
        observations: el.observations,
      });
    },
  },
  getters: {
    getCartTotal: (state) => {
      return state.cartList.reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0);
    },
  },
});
