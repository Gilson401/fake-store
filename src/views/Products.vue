<template>
  <div class="home">
    <span v-if="isLoading"> Carregando ... </span>
    <span v-else-if="!produtos"> Não foi possível obter os dados </span>
    <ProductList v-else :items="products" />
    <span v-if="error"> {{error}} </span>
  </div>
</template>

<script>
// @ is an alias to /src
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
    await this.listProducts();
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
