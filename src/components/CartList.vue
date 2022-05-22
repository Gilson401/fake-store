<template>
  <div>
    <h2 v-if="!items.length" class="pad-y-10">Não há itens no carrinho.</h2>
    <h2 v-else class="pad-y-10">Total do Carrinho {{ cartTotalPrice }}</h2>

    <CartListItem v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";

export default {
  name: "CartList",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CartListItem,
  },

  computed: {
    cartTotalPrice() {
      const total = this.$store.getters.cartTotalPrice.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
      return total;
    },
  },
};
</script>
