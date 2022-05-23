<template>
  <div class="not-found flex center flex-col">
      <h1>Não encontrou o que procura? </h1>
      <p>Parece que você digitou o endereço errado. Volte para home:</p>
      <router-link to="/">Produtos</router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.not-found{
    height: 80vh;
    gap: 2rem;
}
</style>