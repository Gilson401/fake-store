<template>
  <div class="product">
    <img :src="item.image" alt="image" class="product__image" />
    <div class="product__information">
      <div class="product__title">{{ item.title }}</div>
      <div class="product__description">{{ item.description }}</div>
      <div class="product__price">{{ item.price }}</div>
      <div class="product__ref">Ref.: {{ item.id }}</div>
      
        <div class="row">

    <button class="cart-button"
    @click="addToCart()"
    >
      <span class="add-to-cart"> +  </span>
      <span class="added"></span>
      <i class="fa fa-shopping-cart"></i>
    </button>
<span>{{itemQtdOnCart}}</span>
    <button class="cart-button"
    @click="removeFromCart()"
    >
      <span class="add-to-cart"> -  </span>
      <span class="added"></span>
      <i class="fa fa-shopping-cart"></i>
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
  computed:{
  itemQtdOnCart() {
      return this.$store.getters.itemsOnCartIdCount(this.item.id)
    },
  },
  methods:{
      addToCart(){
          this.$store.commit('ADD_ITEM_CART', this.item)          
      },
      removeFromCart(){
          this.$store.commit('REMOVE_ITEM_CART', this.item.id)          
      },
    
  }

};
</script>

<style>

@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap");

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

.pqt-plus,
.pqt-minus {
  background: #fff;
  border: none;
  font-size: 20px;
  padding: 10px 20px;
  width: 50px;
  border-radius: 10px;
  height: 50px;
  user-select: none;
  line-height: 50px;
}

.pqt-plus:hover,
.pqt-minus:hover {
  background: #202431;
  color: #fff;
  cursor: pointer;
}


/* ################################## */



.product {
  width: 90vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  margin: 0.5rem auto;
  border: solid gray 2px;
  border-radius: 0.25rem;
}

.product__image {
  width: 300px;
  height: 200px;
  object-fit: scale-down;
  border: solid gray 2px;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0.5rem auto;
}

.product__information {
  text-align: left;
}

.product__title {
  font-size: 2rem;
}

.product__description {
  font-size: 1.25rem;
}

.product__price {
  font-size: 1rem;
}

.product__ref {
  font-size: 1rem;
  font-weight: bold;
}

@media screen and (min-width: 468px) {
  .product {
    flex-direction: row;
  }

  .product__image {
  margin: 0.5rem;
  }
}
</style>
