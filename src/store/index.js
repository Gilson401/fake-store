import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '../services/products'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      items:[],
      itemOnCart: [] ,
      orderBy: 'price',
      categories: [],
      filterBy: 'jewelery'
    },
  mutations: {
    SET_FILTER_BY(state, filterBy){
        state.filterBy = filterBy
    },

    SET_CATEGORIES(state, categories){
        state.categories = categories
    },


    SET_ITEMS(state, items){
        state.items = items
    },
    ADD_ITEM_CART(state, itemId){
        state.itemOnCart.push(itemId)
    } ,

    REMOVE_ITEM_CART(state, itemId){
        const idx = state.itemOnCart.findIndex(p => p.id == itemId);
        state.itemOnCart.splice(idx,1); 
    } 
      
},
  actions: {  
    async index({ commit }) {
        try {

          const response = await apiService.read();
          commit("SET_ITEMS", response.data);


          let categories = [...new Set(response.data.map(item => item.category))]

          commit("SET_CATEGORIES", categories);
          

        } catch (error) {
          throw new Error("Não foi possível carregar os itens");
        }
      },   

},
  getters: {
    categories(state){
        return state.categories
    },
    products(state){

        return state.filterBy ? state.items.filter(item => item.category === state.filterBy) : state.items
    },
    itemsOnCart(state){
        return state.itemOnCart
    },
    itemsOnCartIdCount(state){
        return (id) => state.itemOnCart.filter(i => i.id == id).length
    },
    cartTotalPrice(state){
        return  state.itemOnCart.reduce((acc,curr) => acc + curr.price, 0)
    },
  },
  modules: {
  }
})
