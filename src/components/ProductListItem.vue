<template>
  <div class="product">
    <img
      v-show="hasLoadedImage"
      :src="item.image"
      alt="image"
      class="product__image"
      loading="eager"
      @load="onLoad"
    />
    <div v-show="!hasLoadedImage" class="product__image loading" />

    <div class="product__information">
      <div class="product__title">{{ item.title }}</div>
      <div class="product__rating my-10">
          <span v-for="rate in rating" :key="rate"> &#x2605;</span>
          <span v-if="rating"> ({{item.rating.count}})</span>
        </div>
      <div class="product__description">{{ item.description }}</div>
      <div class="flex space-between vertical-center mt-20 ">
        <div class="product__price">R$ {{ item.price }}</div>
        
        <ActionButtons :item="item"/>

        <div class="product__ref">Ref.: {{ item.id }}</div>
      </div>

    </div>
  </div>
</template>

<script>

import ActionButtons from "@/components/ActionButtons.vue";

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      hasLoadedImage: false,
    };
  },
    components: {
    ActionButtons,
  },

  watch: {
    filterBy() {
      this.hasLoadedImage = false;
    },
  },
  computed: {
    itemQtdOnCart() {
      return this.$store.getters.itemQtdOnCart(this.item.id);
    },
    filterBy() {
      return this.$store.getters.filterBy;
    },
    rating() {
      const  numerador = this.item.rating.rate - this.$store.getters.rateRange.min;
      const denominador  =this.$store.getters.rateRange.max - this.$store.getters.rateRange.min;
      const range = (numerador / denominador) * 5;
      return parseInt(range) || 0;
    },
  },
  methods: {
    addToCart() {
      this.$store.commit("ADD_ITEM_CART", this.item);
    },
    removeFromCart() {
      this.$store.commit("REMOVE_ITEM_CART", this.item.id);
    },
    onLoad() {
      this.hasLoadedImage = true;
    },
  },
};
</script>

<style scoped>


.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  margin: 0.5rem auto;
  border: solid rgb(230, 227, 227) 1px;
  border-radius: 0.25rem;
}

.product__image {
  width: 300px;
  height: 200px;
  object-fit: scale-down;
  border: solid rgb(230, 227, 227) 1px;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0.5rem auto;
  border-radius: 5px;
  overflow: hidden;
}

.product__information {
  text-align: left;
  padding: 8px;
  background-color: rgba(0,0,0,.8);
  border-radius: 5px;
  overflow: hidden;
  color: rgb(231, 231, 231);
}

.product__title {
  font-size: 1.5rem;
  margin-bottom: var(--margin-1);
}

.product__description {
  font-size: var(--font-4);
  margin-bottom: var(--margin-1);
}

.product__price, .product__ref {
  font-size:  var(--font-4);
}

.product__rating{
    color: rgb(255, 241, 112);
    padding: 0.3rem;
    border-radius: 5px;
}

@media screen and (min-width: 769px) {
  .product {
    flex-direction: row;

  }
}

@media screen and (min-width: 468px) {

  .product__image {
    margin: 0.5rem;
  }
}

.loading {
  cursor: progress;
  background: linear-gradient(0.25turn, transparent, #fff, transparent),
    linear-gradient(#eee, #eee), linear-gradient(#eee, #eee);
  background-repeat: cover;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  to {
    background-position: 315px 0, 0 0, 0 190px, 50px 195px;
  }
}
</style>
