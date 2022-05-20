import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '../services/products'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      items:[
        {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
        rate: 3.9,
        count: 120,
        },
        }]
  },
  mutations: {
    SET_ITEMS(state, items){
        state.items = items
    }  
},
  actions: {  
    async index({ commit }) {
        try {

          const response = await apiService.read();
          commit("SET_ITEMS", response.data);
        } catch (error) {
          throw new Error("Não foi possível carregar os itens");
        }
      },   

},
  getters: {
    products(state){
        return state.items
    }
  },
  modules: {
  }
})
