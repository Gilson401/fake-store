import Vue from 'vue'
import VueRouter from 'vue-router'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'Produtos',
    component: Products
  },
  {
    path: '/cart',
    name: 'Carrinho',
    component: Cart
  }
]

const router = new VueRouter({
  routes
})

export default router
