<template>
  <div class="product">
    <img
      v-show="hasLoadedImage"
      :src="item.image"
      alt="image"
      class="product__image"
       @load="onLoad"
    />
    <div v-show="!hasLoadedImage" class="product__image loading" />

    <div class="product__information">
      <div class="product__title">{{ item.title }}</div>
      <div class="product__rating my-10">

          <span>
          <font-awesome-icon v-for="rates in rating" :key="rates" :icon="['fas', 'star']" />

          </span>

           <span>
          <font-awesome-icon v-for="rate in (5 - rating)" :key="rate + 10" :icon="['far', 'star']" />
              
          </span>
          <span v-if="rating"> ({{item.rating.count}})</span>
        </div>
      <div class="product__description">{{ item.description }}</div>
      <div class="flex space-between vertical-center mt-20 ">
        <div class="product__price">{{ item.price | brlFormatter }}</div>
        
        <ActionButtons 
        :item="item"
        mode="type"/>

        <div class="product__ref">Ref.: {{ item.id }}</div>
      </div>

    </div>
  </div>
</template>

<script>

import ActionButtons from "@/components/ActionButtons.vue";
import { brlFormat } from "../helpers/numbers"
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
    filters:{
      brlFormatter(value){
          return brlFormat(value)
      }
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
      return  Math.floor(this.item.rating.rate) ;
    },
  },
  methods: {
    addToCart() {
      this.$store.commit("ADD_ITEM_CART", this.item);
    },
    removeFromCart() {
      this.$store.commit("REMOVE_UNITY_CART", this.item.id);
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
  border: solid rgb(230, 227, 227) .1rem;
  border-radius: 0.25rem;
}

.product__image {
  width: 30rem;
  height: 20rem;
  object-fit: scale-down;
  background-color: white;
  border: solid rgb(230, 227, 227) .1rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0.5rem auto;
  border-radius: .5rem;
  overflow: hidden;
}

.product__information {
  width: 100%;
  text-align: left;
  padding: .8rem;
  background-color: rgba(0,0,0,.8);
  border-radius: .5rem;
  overflow: hidden;
  color: rgb(231, 231, 231);
}

.product__title {
  font-size: var(--font-2);
  margin-bottom: var(--margin-1);
}

.product__description {
  font-size: var(--font-4);
  margin-bottom: var(--margin-1);
}

.product__price, .product__ref {
  font-size:  var(--font-3);
}

.product__rating{
    color: rgb(255, 241, 112);
    padding: 0.3rem;
    border-radius: .5rem;
}

@media screen and (min-width: 769px) {
  .product {
    flex-direction: row;

  }
}

@media screen and (min-width: 46.8rem) {

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
    background-position: 31.5rem 0, 0 0, 0 19rem, 5rem 19.5rem;
  }
}
</style>
