<template>
  <div>
    <div :class="{ active: activeMenu, 'menu-container': true }">
      <div
        class="hide-large flex west pad-xy-10 text-3"
        @click="activeMenu = false"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </div>

      <div class="search relative pad-y-5 pad-x-10 mx-10">
        <input
          placeholder="busque por produto ou descrição..."
          type="text"
          class="search__input"
          autocomplete="off"
          v-model="searchTerm"
          @keyup.enter="setSearchTerm"
        /><button
          type="button"
          @click="setSearchTerm"
          aria-label="Pesquisar da loja"
          class="search__button"
        >
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
      </div>
      <ul class="categories__list center">
        <li
          class="categories__listitem"
          v-for="category in categories"
          :key="category"
          @click="manageFilterCategory(category)"
        >
          <span
            :class="{
              'categories__listitem-active': filterBy.includes(category),
            }"
          >
            {{ category }}
          </span>
        </li>
        <li class="categories__listitem" @click="$store.commit('RESET_FILTER')">
          <span
            :class="{
              'categories__listitem-active': !filterBy.length,
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
              ref="rangeRate"
              v-model="rangeContol"
              @change="setRate"
              :min="rateRange.min"
              :max="rateRange.max"
            />
            <label for="rate"> {{ selectedRate }}</label>
          </div>
        </li>
        <li class="pad-y-10">
          <select name="sorter" @change="setSort" title="ordenar" v-model="sortSelect">
            <option value="" selected disabled hidden>Ordenar</option>
            <option value="category">Categoria</option>
            <option value="rate">Classificação</option>
            <option value="price">Preço</option>
          </select>
        </li>
      </ul>
    </div>
    <div
      class="hide-large flex center pad-xy-10 text-3"
      @click="activeMenu = true"
    >
      Menu
    </div>
    <div v-if="messageFallback" class="pad-y-10 my-20 text-3">
      {{ messageFallback }}
    </div>

    <ProductListItem v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>

<script>
import ProductListItem from "./ProductListItem.vue";
import { mapGetters } from "vuex";

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
      searchTerm: "",
      rangeContol: 0,
      sortSelect: ""
    };
  },
  components: {
    ProductListItem,
  },
  watch: {
    activeMenu: function () {
      if (this.activeMenu) {
        document.documentElement.style.overflow = "hidden";
        return;
      }

      document.documentElement.style.overflow = "auto";
    },
    monitoreComputeds(){
        this.mountQueries()
    }
  },
  mounted() {
    this.readQueries();
  },
  computed: {
    ...mapGetters({
      categories: "categories",
      filterBy: "filterBy",
      rateRange: "rateRange",
      selectedRate: "selectedRate",
      isLoading: "isLoading",
      sortedBy: "sortedBy",
    }),
    messageFallback() {
      let message = "";
      if (this.isLoading) {
        message = "";
      } else if (this.searchTerm && !this.items.length) {
        message =
          "Não encontramos nenhum resultado para o termo digitado: " +
          this.searchTerm;
      } else if (!this.searchTerm && !this.items.length) {
        message = "Não foi possível obter os produtos";
      }
      return message;
    },

    monitoreComputeds() {
      return {
        filterBy: this.filterBy,
        searchTerm: this.searchTerm,
        selectedRate: this.selectedRate,
        sortedBy: this.sortedBy,
      };
    },
  },

  methods: {
    readQueries() {
      const queries = this.$route.query;
      if (Object.keys(queries).length > 0) {
        if (queries.filterBy) {
          const categories = queries.filterBy.split(",");
          console.log(categories);
          categories.forEach((category) => this.manageFilterCategory(category));
        }

        if (queries.searchTerm) {
          this.searchTerm = queries.searchTerm;
          this.setSearchTerm();
        }

        if (queries.selectedRate) {
          this.$store.commit(
            "SET_SELECTED_RATE",
            parseFloat(queries.selectedRate)
          );
          this.rangeContol = parseFloat(queries.selectedRate);
        }

        if (queries.sortedBy) {
          this.$store.commit("SET_SORT", queries.sortedBy);
          this.sortSelect = queries.sortedBy
        }
      }
    },

    mountQueries() {
      const query = {
        filterBy: this.filterBy.join(','),
        searchTerm: this.searchTerm,
        selectedRate: this.selectedRate,
        sortedBy: this.sortedBy,
      };

          
      Object.keys(query).forEach((q) => {
        if (!query[q]) delete query[q];
      });

      this.$router.push({
        path: "/",
        query,
      });
    },

    setRate(e) {
      this.$store.commit("SET_SELECTED_RATE", parseFloat(e.target.value));
    },
    setSort(e) {
      this.$store.commit("SET_SORT", e.target.value);
    },
    manageFilterCategory(category) {
      console.log(category);
      this.$store.commit("TOGGLE_FILTER_BY", category);
    },
    setSearchTerm() {
      this.$store.commit("SET_SEARCH_TERM", this.searchTerm);
      this.activeMenu = false;
    },
  },
};
</script>

<style scoped>
.search {
  display: flex;
  flex-basis: 100%;
  background-color: rgb(236, 239, 245);
}

.search__input {
  outline: none;
  border-style: none;
  flex: 1;
  background-color: transparent;
}

.search__button {
  background-color: transparent;
}

.menu-container {
  position: absolute;
  border: black 1px solid;
  z-index: 10;
  transform: translateX(-110%);
  transition: transform 0.5s ease-in-out;
  width: 100%;
  background-color: #fff;
}

.categories__list {
  font-size: var(--font-3);
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
  transition: transform 0.5s ease-in-out;
}

.categories__listitem {
  cursor: pointer;
  padding: 1rem 0;
  font-size: var(--font-3);
  line-height: 1.5rem;
  border-bottom: 0.2rem transparent solid;
  text-transform: capitalize;
}

.categories__listitem-active {
  border-bottom: 0.2rem rgba(50, 12, 200, 0.5) solid;
}

@media screen and (min-width: 468px) {
  .menu-container {
    position: relative;
    transform: translateX(0);
    transition: transform 0 linear;
    box-shadow: unset;
    border: unset;
  }

  .categories__list {
    display: flex;
    gap: 1.5rem;
    justify-content: space-between;
    width: fit-content;
    margin: 0 auto;
    flex-direction: row;
  }

  .categories__listitem:hover {
    font-weight: hover;
  }
}
</style>
