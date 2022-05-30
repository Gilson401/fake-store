import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'  

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {  faExclamationTriangle, faHome, faSpinner , faStar, faShoppingCart, faTrash, faTimes, faPlusCircle, faMinusCircle, faSearch} from '@fortawesome/free-solid-svg-icons'
import { faStar as faReStar} from '@fortawesome/free-regular-svg-icons'

import Toast from "vue-toastification";



import './assets/reset.css'
import "vue-toastification/dist/index.css";
import './assets/global.css'

const options = { timeout: 1500};
Vue.use(Toast, options);

library.add(faStar, faSpinner,
    faHome, faExclamationTriangle, faStar, faReStar, faTimes, faShoppingCart, faPlusCircle, faMinusCircle, faSearch, faTrash)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueMeta, {    
    refreshOnceOnNavigation: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
