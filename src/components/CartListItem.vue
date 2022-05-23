<template>
  <div class="product">
    <div>
      <img
        v-show="hasLoadedImage"
        :src="item.image"
        alt="image"
        class="product__image "
        @load="onLoad"
      />
      <div v-show="!hasLoadedImage" class="product__image loading" />
    </div>

    <div class="product__info">
      <div class="product__description">{{ item.description }}</div>

      <div class="product__information vertical-center">
        <div class="pad-y-10 product__price w-1p3 text-left">R$ {{ item.price }}</div>
         <ActionButtons :item="item" class="w-1p3"/>
        <div class="pad-y-10 product__qtd w-1p3 text-right">Qtd: {{ itemQtdOnCart }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import ActionButtons from "@/components/ActionButtons.vue";

export default {
  name: "CartListItem",
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
    onLoad() {
      this.hasLoadedImage = true;
    },
  },
};
</script>

<style scoped>
.row {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

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
  width: 150px;
  height: 100px;
  object-fit: scale-down;
  background-color: white;
  border: solid rgb(230, 227, 227) 1px;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0.5rem auto;
  border-radius: 5px;
  overflow: hidden;
}

.product__information {
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin: 8px;
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  overflow: hidden;
  color: rgb(231, 231, 231);
}

.product__description {
  font-size: var(--font-4);
  margin-bottom: var(--margin-1);
}

.product__price {
  font-size: 1rem;
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

  .product__information {
    display: flex;
    flex-wrap: wrap;
    text-align: right;
    flex-shrink: 0;
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
