<template>
  <div>
      <CartList
      :items="itemsOnCart"
      />
   </div>
</template>

<script>
// @ is an alias to /src
import CartList from "@/components/CartList.vue";

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
    CartList,
  },

  computed: {
    itemsOnCart() {
      return this.$store.getters.itemsOnCart;
    },
      
    totalCartValue() {
      const total = this.$store.getters.cartTotalPrice.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
      });
      return total;
    },
  },
  methods: {

  },
};
</script>
<style scoped>

</style>