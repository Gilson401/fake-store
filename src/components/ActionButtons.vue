<template>
        <div class="row">
          <div class=" flex">

        <button class="cart-button" @click="addToCart()">
          <span > + </span>
        </button>
        <span class="pad-x-10">{{ itemQtdOnCart }}</span>
        <button class="cart-button" @click="removeFromCart()">
          <span > - </span>
        </button>
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
  computed: {
    itemQtdOnCart() {
      return this.$store.getters.itemQtdOnCart(this.item.id);
    },
  },
    methods: {
    addToCart() {
      this.$store.commit("ADD_ITEM_CART", this.item);
    },
    removeFromCart() {
      this.$store.commit("REMOVE_ITEM_CART", this.item.id);
    },
  },
}
</script>

<style scoped>
.row {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  
}

.row>div{
    border-radius: 5px;
    border: 1px solid #fff;
    overflow: hidden;
    justify-content: center;
    align-items: center;
}

.cart-button {
  position: relative;
  padding: 20px;
  border: 0;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  user-select: none;
}

.cart-button:hover {
  background-color: #f5f6f7;
  color: #000000;
}
.cart-button:active {
  transform: scale(0.9);
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

.cart-button:hover span {
  color: rgb(0, 0, 0);
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
</style>