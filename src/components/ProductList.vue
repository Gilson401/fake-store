<template>
  <div>
    <h1>Nicollas Petit And Alexs Dubois Products</h1>
    <h2>Total do Carrinho {{ totalCartValue }}</h2>
    <ProductListItem v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>

<script>
import ProductListItem from "./ProductListItem.vue";

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ProductListItem,
  },
  computed: {
    totalCartValue() {
      const total = this.$store.getters.cartTotalPrice.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
    return total
    },
  },
};
</script>

<style></style>
