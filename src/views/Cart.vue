<template>
  <div>
      <CartList
      :items="itemsOnCart"
      />
   </div>
</template>

<script>

import CartList from "@/components/CartList.vue";

export default {
  name: "Cart",

 components: {
    CartList,
  },

  computed: {
    itemsOnCart() {
      return this.$store.getters.itemsOnCart;
    },
  },
};
</script>
