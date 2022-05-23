<template>
  <div class="home">
    <div v-if="isLoading"  class="pad-y-10 my-20"> Carregando ... </div>
    <div v-else-if="!products.length"  class="pad-y-10 my-20"> Não foi possível obter os dados </div>
    <ProductList v-else :items="products" />
  </div>
</template>

<script>

import ProductList from "@/components/ProductList.vue";

export default {
  name: "Products",

  components: {
    ProductList,
  },

  computed: {
    products() {
      return this.$store.getters.products;
    },
      
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>
