<template>
  <div class="product">
    <div>
      <img
        v-show="hasLoadedImage"
        :src="item.image"
        alt="image"
        class="product__image"
        @load="onLoad"
      />
      <div v-show="!hasLoadedImage" class="product__image loading" />
    </div>

    <div class="product__info">
      <div class="product__description">{{ item.description }}</div>

      <div class="product__information vertical-center space-between">
        <div class="pad-y-10 product__price w-1p3 text-left">
          {{ item.price | brlFormat }}
        </div>
        <ActionButtons class="w-2p3" :item="item" mode="qtd" />
      </div>
    </div>
  </div>
</template>

<script>
import ActionButtons from "@/components/ActionButtons.vue";
import { brlFormat } from "../helpers/numbers";
export default {
  name: "CartListItem",
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  filters: {
    brlFormat,
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
  border: solid rgb(230, 227, 227) 0.1rem;
  border-radius: 0.25rem;
}

.product__image {
  width: 15rem;
  height: 10rem;
  object-fit: scale-down;
  background-color: white;
  border: solid rgb(230, 227, 227) 0.1rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin: 0.5rem auto;
  border-radius: 0.5rem;
  overflow: hidden;
}
.product__info {
  width: 100%;
}
.product__information {
  display: flex;
  justify-content: space-between;
  text-align: left;
  margin: 0.8rem;
  padding: 0.8rem;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0.5rem;
  overflow: hidden;
  color: rgb(231, 231, 231);
}

.product__description {
  font-size: var(--font-4);
  margin-bottom: var(--margin-1);
}

.product__price {
  font-size: var(--font-3);
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
    background-position: 31.5rem 0, 0 0, 0 19rem, 5rem 19.5rem;
  }
}
</style>
