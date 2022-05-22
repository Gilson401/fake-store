<template>
  <div id="app" class="container flex flex-col">
    <header class="flex-rc space-between menu center pad-xy-10">  
      <h1 class="title ">Nicollas Petit And Alexs Dubois Products</h1>
      <div id="nav" class="pad-y-10">
        <router-link to="/">Produtos</router-link> |
        <router-link to="/cart">Carrinho</router-link>
      </div>
    </header>
<div class="content">
    <router-view />

</div>
    <footer class="footer center flex pad-xy-20">
        <div>
            <div class="pad-xy-10">Nicollas Petit And Alexs Dubois Products</div>
            <div class="pad-xy-10">2022 - Todos os direitos reservados  </div>
        </div>
    </footer>
  </div>
</template>

<script>

export default {
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
}
</script>


<style>
.menu {
     position: sticky;
    z-index: 10;
    top: 0;
    background-color: white;
    gap: 1rem;
}
.content{
    flex-grow: 1;
}

.footer {
    margin-top: auto;
    background-color: rgba(0, 0, 0, 0.8);
    color: #FFF;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
    margin: 0 auto;
}

#nav a {
  color: #2c3e50;  
  text-decoration: none;
}

#nav a.router-link-exact-active {
  border-bottom: 2px rgba(50, 12, 200, 0.5) solid;
}

@media screen and (min-width: 768px) {
    .menu{
        flex-direction: row;
    }
}   
@media screen and (min-width: 468px) {

#nav {
    margin: unset;
}
}

</style>
