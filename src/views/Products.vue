<template>
  <div class="home">
    <div v-if="isLoading"  class="pad-y-10 my-20 text-3"> 
        <font-awesome-icon  class='rotate'  :icon="['fas', 'spinner']" />
        Carregando ... </div>
    
    <ProductList v-show="!isLoading" :items="products" />
  </div>
</template>

<script>

import ProductList from "@/components/ProductList.vue";
import { mapGetters } from 'vuex'

export default {
  name: "Products",

    metaInfo: {
      title: 'Products',
    },

  components: {
    ProductList,
  },

  computed: {
    ...mapGetters({
    products: 'products',
    isLoading: 'isLoading' 
    }),
  },
};
</script>

<style scoped>

.rotate {
  animation: rotation 2s linear infinite;
}
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>