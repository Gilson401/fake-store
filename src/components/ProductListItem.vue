<template>
  <div class="product">
    <img :src="item.image" alt="image" class="product__image" />
    <div class="product__information">
      <div class="product__title">{{ item.title }}</div>
      <div class="product__description">{{ item.description }}</div>
      <div class="product__price">{{ item.price }}</div>
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
};
</script>

<style>
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

@media screen and (min-width: 468px) {
  .product {
    flex-direction: row;
  }
}
</style>
