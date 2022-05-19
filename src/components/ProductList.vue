<template>
  <div>
    <h1>Nicollas Petit And Alexs Dubois Products</h1>
<ProductListItem 
v-for="(item, index) in items"
:key="index"
:item="item"
/>
    
  </div>
</template>

<script>
import ProductListItem from './ProductListItem.vue'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ProductListItem,
  },

};
</script>

<style></style>
