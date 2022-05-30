<template>
  <div id="app" class="container flex flex-col">
    <header class="flex-rc space-between menu center pad-xy-10">
      <div class="inline-block">
        <h1 class="hide-small">Nicollas Petit And Alexs Dubois</h1>
        <h1 class="hide-large">Petit Dubois</h1>
      </div>

      <div id="nav" class="pad-y-10 text-1 absolute">
        <router-link v-if="$route.path === '/cart'" class="text-2" to="/">
          <font-awesome-icon :icon="['fas', 'home']" />
        </router-link>

        <router-link v-else class="text-2" to="/cart">
          <div class="relative inline-block">
            <font-awesome-icon :icon="['fas', 'shopping-cart']" />

            <transition
              enter-active-class="duration-200-ease-out"
              enter-from-class="opacity-0"
              enter-to-class="opacity-1"
              leave-active-class="duration-200-ease-in"
              leave-from-class="opacity-1"
              leave-to-class="opacity-0"
            >
              <span v-if="uniqueItemsOnCart" class="cart-badge">
                {{ uniqueItemsOnCart }}</span
              >
            </transition>
          </div>
        </router-link>
      </div>
    </header>
    <div class="content">
      <router-view />
    </div>
    <footer class="footer center flex pad-xy-20">
      <div class="text-3">
        <div class="pad-xy-10">Nicollas Petit And Alexs Dubois</div>
        <div class="pad-xy-10">2022 - Todos os direitos reservados</div>
      </div>
    </footer>
    <GoToTopButton />
  </div>
</template>

<script>
import GoToTopButton from "@/components/GoToTopButton.vue";

export default {
  metaInfo: {
    title: "",
    titleTemplate: "%s | Petit And Dubois",
    htmlAttrs: {
      lang: "pt-br",
      amp: true,
    },
  },
  async mounted() {
    await this.listProducts();
  },
  components: {
    GoToTopButton,
  },

  computed: {
    products() {
      return this.$store.getters.products;
    },
    uniqueItemsOnCart() {
      return this.$store.getters.uniqueItemsOnCart;
    },
  },
  methods: {
    async listProducts() {
      try {
        this.$store.commit("SET_IS_LOADING", true);
        await this.$store.dispatch("index");
      } catch (error) {
        this.$toast.error("Erro na listagem de produto");
      } finally {
        this.$store.commit("SET_IS_LOADING", false);
      }
    },
  },
};
</script>

<style>
.duration-200-ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-duration: 500ms;
}

.duration-200-ease-in {
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
}

.opacity-0 {
  opacity: 0;
}

.opacity-1 {
  opacity: 1;
}

.cart-badge {
  position: absolute;
  right: -9px;
  border-radius: 9999px;
  background-color: blue;
  color: #fff;
  top: -10px;
  padding: 2px 5px;
  font-size: 1.5rem;
}
.menu {
  position: sticky;
  z-index: 10;
  top: 0;
  background-color: white;
  gap: 1rem;
}
.content {
  flex-grow: 1;
}

.footer {
  margin-top: auto;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  margin: 0 auto;
  right: 10px;
}

#nav a {
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  border-bottom: 0.2rem rgba(50, 12, 200, 0.5) solid;
}

@media screen and (min-width: 768px) {
  .menu {
    flex-direction: row;
  }
}
@media screen and (min-width: 468px) {
  #nav {
    margin: unset;
  }
}
</style>
