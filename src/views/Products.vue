<template>
  <div class="home">
    <span v-if="isLoading"  class="pad-y-10"> Carregando ... </span>
    <span v-else-if="!produtos"  class="pad-y-10"> Não foi possível obter os dados </span>
    <ProductList v-else :items="products" />
    <span v-if="error"> {{error}} </span>
  </div>
</template>

<script>

import ProductList from "@/components/ProductList.vue";

export default {
  name: "Products",

  data() {
    return {
      isLoading: false,
      produtos: [],
      error:''
    };
  },

  components: {
    ProductList,
  },

  async mounted() {
    // await this.listProducts();  
  },
  computed: {
    products() {
      return this.$store.getters.products;
    },
      

  },
  methods: {
    async listProducts() {
    this.isLoading = true;
      this.error = ''
      try {
        await this.$store.dispatch("index");
      } catch (error) {
        this.error = "Erro na listagem de produto"
      }
      this.isLoading = false;
    },
  },
};
</script>
