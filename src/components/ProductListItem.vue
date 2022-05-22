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
      <div class="product__rating">
          <span v-for="rate in rating" :key="rate"> &#x2605;</span>
          <span> ({{item.rating.count}})</span>
        </div>
      <div class="product__description">{{ item.description }}</div>
      <div class="flex space-between">
        <div class="product__price">R$ {{ item.price }}</div>
        
        

        <div class="product__ref">Ref.: {{ item.id }}</div>
      </div>
      <div class="row">
        <button class="cart-button" @click="addToCart()">
          <span class="add-to-cart"> + </span>
        </button>
        <span>{{ itemQtdOnCart }}</span>
        <button class="cart-button" @click="removeFromCart()">
          <span class="add-to-cart"> - </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
  watch: {
    filterBy() {
      this.hasLoadedImage = false;
    },
  },
  computed: {
    itemQtdOnCart() {
      return this.$store.getters.itemsOnCartIdCount(this.item.id);
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

<style>
.row {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cart-button {
  position: relative;
  padding: 20px;
  height: 50px;
  border: 0;
  border-radius: 10px;
  background-color: #2b3044;
  outline: none;
  cursor: pointer;
  margin: 0 10px;
  color: #fff;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  user-select: none;
}

.cart-button:hover {
  background-color: #202431;
}
.cart-button:active {
  transform: scale(0.9);
}

.cart-button .fa-shopping-cart {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: -10%;
  font-size: 2em;
  transform: translate(-50%, -50%);
}

.cart-button span {
  position: absolute;
  z-index: 3;
  left: 50%;
  top: 50%;
  font-size: 1.2em;
  color: #fff;
  transform: translate(-50%, -50%);
}
.cart-button span.add-to-cart {
  opacity: 1;
}
.cart-button span.added {
  opacity: 0;
}

.cart-button.clicked .fa-shopping-cart {
  animation: cart 1.5s ease-in-out forwards;
}

.cart-button.clicked span.add-to-cart {
  animation: txt1 1.5s ease-in-out forwards;
}
.cart-button.clicked span.added {
  animation: txt2 1.5s ease-in-out forwards;
}
@keyframes cart {
  0% {
    left: -10%;
  }
  40%,
  60% {
    left: 50%;
  }
  100% {
    left: 110%;
  }
}

@keyframes txt1 {
  0% {
    opacity: 1;
  }
  20%,
  100% {
    opacity: 0;
  }
}
@keyframes txt2 {
  0%,
  80% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

/* ################################## */

.product {
  display: flex;
  flex-direction: column;
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
  margin: 8px;
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

.product__price {
  font-size: 1rem;
}

.product__ref {
  font-size: 1rem;

}

.product__rating{
    color: rgb(255, 241, 112);
    padding: 0.3rem;
    border-radius: 5px;
}

@media screen and (min-width: 468px) {
  .product {
    flex-direction: row;
  }

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
