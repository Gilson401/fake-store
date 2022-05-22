<template>
  <div>
     
    <div :class="{ active: activeMenu, 'menu-container': true }">
      <div class="hide-large flex east pad-xy-10" @click="activeMenu = false">Fechar</div>

      <ul class="categories__list center">
        <li
          class="categories__listitem"
          v-for="category in categories"
          :key="category"
          @click="setFilterCategory(category)"
        >
          <span
            :class="{
              'categories__listitem-active': filterBy === category,
            }"
          >
            {{ category }}
          </span>
        </li>
        <li class="categories__listitem" @click="setFilterCategory('')">
          <span
            :class="{
              'categories__listitem-active': filterBy === '',
            }"
          >
            Todos
          </span>
        </li>
        <li>
          <div class="flex center pad-xy-10">
             <span>&#x2605;</span>
            <input
              type="range"
              name="rate"
              step="0.1"
              id="rate"
              @change="setRate"
              :min="rateRange.min"
              :max="rateRange.max"
            />
             <label for="rate"> {{ selectedRate }}</label>
          </div>
        </li>
      </ul>
    </div>
     <div class="hide-large flex center pad-xy-10" @click="activeMenu = true">Filtrar</div>
    <ProductListItem v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>

<script>
import ProductListItem from "./ProductListItem.vue";

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      activeMenu: false,
    };
  },
  components: {
    ProductListItem,
  },

  computed: {
    categories() {
      return this.$store.getters.categories;
    },
    filterBy() {
      return this.$store.getters.filterBy;
    },
    rateRange() {
      return this.$store.getters.rateRange;
    },
    selectedRate() {
      return this.$store.getters.selectedRate;
    },
  },
  methods: {
    setRate(e) {
      this.$store.commit("SET_SELECTED_RATE", parseFloat(e.target.value));
    },
    setFilterCategory(category) {
      this.$store.commit("SET_FILTER_BY", category);
      this.activeMenu = false;
    },
  },
};
</script>

<style scoped>
.menu-container {
  position: absolute;
  z-index: 10;
  transform: translateX(-110%);
  transition: transform .5s ease-in-out;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 10px 20px -11px grey;
}

.categories__list {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 1rem 1rem;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
}

.menu-container.active {
  position: absolute;
  transform: translateX(0);
  transition: transform .5s ease-in-out;
}

.categories__listitem {
  cursor: pointer;
  font-size: 1rem;
  line-height: 1.5rem;
  border-bottom: 2px transparent solid;
  text-transform: capitalize;
}
.categories__listitem-active {
  border-bottom: 2px rgba(50, 12, 200, 0.5) solid;
}

@media screen and (min-width: 468px) {
  .menu-container {
    position: relative;
    transform: translateX(0);
    transition: transform 0 linear;
    box-shadow: unset;
  }

  .categories__list {
    display: flex;
    justify-content: space-between;
    width: fit-content;
    margin: 0 auto;

    flex-direction: row;
    gap: 0.5rem;
  }

  .categories__listitem:hover {
    font-weight: hover;
  }
}
</style>
