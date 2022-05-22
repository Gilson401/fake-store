<template>
  <div id="app" class="container flex flex-col">
    <header class="flex-rc space-between menu center">  
      <h1 class="title ">Nicollas Petit And Alexs Dubois Products</h1>
      <div id="nav" class="pad-y-10">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">Sobre</router-link> |
        <router-link to="/products">Produtos</router-link> |
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

<style>
.menu {
    padding: 20px; 
    position: sticky;
    z-index: 10;
    top: 0;
    background-color: white;
}
.content{
    flex-grow: 1;
}

.footer {
    margin-top: auto;
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
  
}

#nav a.router-link-exact-active {
  color: #42b983;
}

@media screen and (min-width: var(--breakpoint-md)) {

#nav {
    margin: unset;
}
}

</style>
