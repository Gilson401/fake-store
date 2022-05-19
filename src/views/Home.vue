<template>
  <div class="home">
   Seja bem-vindo
  </div>
</template>

<script>

export default {
  name: "Home",

  data() {
    return {
      produto: {
        id: "",
        nome: "",
        quantidade: "",
        valor: "",
      },
      produtos: [],
      errors: [],
    };
  },

  components: {

  },

  async mounted() {
  
  },

  methods: {

  },
};
</script>
