import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import cart from "@/components/cart.vue";
import addToCart from "@/components/addToCart.vue"
import Payment from "../views/Payment.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/cart",
    name: "cart",
    component: cart,
  },
  {
    path: "/payment",
    name: "Payment",
    component: Payment,
  },
  {
    path: "/addToCart/:id",
    name: "addToCart",
    component: addToCart,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
