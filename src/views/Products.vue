<template>
  <div class="home">
     <span v-if="isLoading"> Carregando ... </span> 
     <span v-else-if="!produtos"> Não foi possível obter os dados </span> 
    <ProductList v-else :items="produtos" />
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from "@/components/ProductList.vue";
import productService from "../services/products";

export default {
  name: "Products",

  data() {
    return {
      isLoading: false,
      produtos: [],
    };
  },

  components: {
    ProductList,
  },

  async mounted() {
    await this.listProducts();
  },

  methods: {
    async listProducts() {
       this.isLoading=true 
      try {
        const products = await productService.read();

        if (products) {
          this.produtos = products.data;
        }
      } catch (error) {
          console.log('Erro na listagem de produto')
      }
      this.isLoading=false
    },
  },
};
</script>
