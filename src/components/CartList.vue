<template>
  <div>
    <h3 v-if="!items.length" class="pad-y-40">
        <font-awesome-icon  :icon="['fas', 'exclamation-triangle']" />
        Não há itens no carrinho.
    </h3>
    <h3 v-else class="pad-y-20">
        Teu carrinho.
    </h3>

    <CartListItem v-for="(item, index) in items" :key="index" :item="item" />
    <h2 v-if="items.length" class="pad-y-10">Total do Carrinho {{ cartTotalPrice }}</h2>
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
