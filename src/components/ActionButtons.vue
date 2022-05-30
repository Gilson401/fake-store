<template>
  <div class="row text-4">
    <div v-if="mode === 'type'" class="flex">
      <button
        type="button"
        class="text-4 cart-button-type pad-x-10 pad-y-10 flex center space-between"
        @click="addToCart()"
      >
        <div class="inline-block">
          <span>
            <font-awesome-icon :icon="['fas', 'shopping-cart']" />
          </span>
        </div>
        <div>
          <span> Adicionar </span>
        </div>
      </button>
    </div>

    <div v-else class="flex">
      <button type="button" class="text-4 cart-button" @click="addOneUnity()">
        <span>
          <font-awesome-icon :icon="['fas', 'plus-circle']" />
        </span>
      </button>
      <span class="pad-x-10 text-4">{{ itemQtdOnCart }}</span>
      <button
        type="button"
        :disabled="!itemQtdOnCart"
        class="text-4 cart-button"
        @click="removeOneUnity()"
      >
        <span> <font-awesome-icon :icon="['fas', 'minus-circle']" /> </span>
      </button>

    </div>
      <font-awesome-icon 
      v-if="mode !== 'type'"
      class="icon-trash text-3"
      :icon="['fas', 'trash']"
      @click="removeFromCart" />

  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    mode: {
      type: String,
      default: "type",
      validator(str) {
        return ["type", "qtd"].includes(str);
      },
    },
  },
  computed: {
    itemQtdOnCart() {
      return this.$store.getters.itemQtdOnCart(this.item.id);
    },
  },
  methods: {
    addToCart() {
      if (this.itemQtdOnCart > 0) return;
      this.$store.commit("ADD_ITEM_CART", this.item);
      this.$toast.success(`Item ${this.item.id} adicionado  ao carrinho`);
    },
    removeFromCart() {
      if (this.itemQtdOnCart === 0) return;
      this.$store.commit("DELETE_ITEM_CART", this.item.id);
      this.$toast.warning(`Item ${this.item.id} removido carrinho`);
    },

    addOneUnity() {
      this.$store.commit("ADD_ITEM_CART", this.item);
      this.$toast.success(`Item ${this.item.id} adicionado  ao carrinho`);
    },
    removeOneUnity() {
      if (this.itemQtdOnCart === 0) return;
      this.$store.commit("REMOVE_UNITY_CART", this.item.id);
      this.$toast.warning(`Item ${this.item.id} removido carrinho`);
    },
  },
};
</script>

<style scoped>
.icon-trash{
margin: auto 0 auto auto;
cursor: pointer;
}

.row {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.row > div {
  border-radius: 0.5rem;
  border: 0.1rem solid #fff;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.cart-button {
  position: relative;
  padding: 2rem;
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
  color: #fff;
  transform: translate(-50%, -50%);
}

.cart-button:hover span {
  color: rgb(0, 0, 0);
}

.cart-button:disabled:hover {
  cursor: not-allowed;
  background-color: unset;
}

.cart-button:disabled:hover span {
  color: #fff;
}

.cart-button-type {
  padding: 1rem;
  border: 0;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  overflow: hidden;
  user-select: none;
  font-family: inherit;
  gap: 1rem;
}

.cart-button-type:hover {
  background-color: #f5f6f7;
  color: #000000;
}

.cart-button-type span {
  color: #fff;
}

.cart-button-type:hover span {
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
