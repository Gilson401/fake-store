import Vue from 'vue'
import VueRouter  from 'vue-router'
import Products from '../views/Products.vue'
import Cart from '../views/Cart.vue'
import NotFound from '../views/NotFound.vue'

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
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
