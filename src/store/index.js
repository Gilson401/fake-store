import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '../services/products' 
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [
          ],
        isLoading: false,
        itemsOnCart: [],
        categories: [],
        filterBy: [],
        rateRange: { min: 0, max: 0 },
        selectedRate: 0,
        sortedBy: 'rate',
        searchTerm: ''
    },
    mutations: {
        TOGGLE_FILTER_BY(state, filterBy) {
            const index = state.filterBy.findIndex((i) => i === filterBy)
            const tempfilters = [...state.filterBy]

            if(index >= 0){
                state.filterBy.splice(index, 1);
            }else{
                tempfilters.push(filterBy)
                state.filterBy = tempfilters
            }
        },

        RESET_FILTER(state) {            
            state.filterBy = []
        },

        SET_SORT(state, sortedBy) {
            state.sortedBy = sortedBy
        },

        SET_CATEGORIES(state, categories) {
            state.categories = categories
        },

        SET_RATE_RANGE(state, range) {
            state.rateRange = range
        },

        SET_IS_LOADING(state, loading) {
            state.isLoading = loading
        },


        SET_ITEMS(state, items) {
            state.items = items
        },
        ADD_ITEM_CART(state, item) {
            const index = state.itemsOnCart.findIndex((i) => i.id === item.id)

            if (index >= 0) {

                const itemOnChart = { ...state.itemsOnCart.find((i) => i.id === item.id) }
                itemOnChart.qtd = itemOnChart.qtd + 1
                Vue.set(state.itemsOnCart, index, itemOnChart)
            } else {

                item.qtd = 1
                state.itemsOnCart.push(item)
            }

        },

        REMOVE_UNITY_CART(state, itemId) {

            const index = state.itemsOnCart.findIndex((i) => i.id === itemId)

            if (index >= 0) {
                const itemOnChart = { ...state.itemsOnCart.find((i) => i.id === itemId) }
                itemOnChart.qtd = itemOnChart.qtd - 1

                if (itemOnChart.qtd === 0) {

                    state.itemsOnCart.splice(index, 1);
                } else {
                    Vue.set(state.itemsOnCart, index, itemOnChart)
                }
            }

        },

        DELETE_ITEM_CART(state, itemId) {

            const index = state.itemsOnCart.findIndex((i) => i.id === itemId)

            if (index >= 0) {
                    state.itemsOnCart.splice(index, 1);
            }
        },

        SET_SELECTED_RATE(state, rate) {
            state.selectedRate = rate
        },

        SET_SEARCH_TERM(state, searchTerm) {
            state.searchTerm = searchTerm
        },

    },
    actions: {
         async index({ commit, state }) {
   
                commit("SET_IS_LOADING", true)

                const response = await apiService.read(); 

                response.data.map((item) =>{
                    item.rate = item.rating.rate,
                    item.votes = item.rating.count
                }  )

                commit("SET_ITEMS", response.data);

                let categories = [...new Set(response.data.map(item => item.category))]

                commit("SET_CATEGORIES", categories);

                const rates = response.data.map(item => item.rating.rate)
                const rangeObject = {
                    min: Math.min(...rates),
                    max: Math.max(...rates)
                }
                commit("SET_RATE_RANGE", rangeObject);

                if(!state.selectedRate){

                    commit("SET_SELECTED_RATE", rangeObject.min);
                }

                commit("SET_IS_LOADING", false)
        },
    },
    getters: {
        rateRange(state) {
            return state.rateRange
        },

        
        sortedBy(state) {
            return state.sortedBy
        },

        selectedRate(state) {
            return state.selectedRate
        },
        categories(state) {
            return state.categories
        },
        filterBy(state) {
            return state.filterBy
        },
        products(state) {

            const isPriceSort = state.sortedBy==="price" ? -1 : 1
            let temp = state.filterBy.length ? 
                state.items.filter(item => state.filterBy.includes(item.category)) : state.items
               
                temp =  temp.filter(item => item.rating.rate >= state.selectedRate)
                .filter(item => 
                    {
                        return  state.searchTerm ? 
                        item.title.concat(item.description).toLowerCase().includes(state.searchTerm.toLowerCase()) 
                        : true
                    } )
                
                .sort(function (a, b) {
                    if (a[state.sortedBy] > b[state.sortedBy]) {
                      return -1 * isPriceSort;
                    }
                    if (a[state.sortedBy] < b[state.sortedBy]) {
                      return 1 * isPriceSort;
                    }
                    return 0;
                  });
                  
            
                return temp
        },
        itemsOnCart(state) {
            return state.itemsOnCart
        },
        uniqueItemsOnCart(state) {
            return state.itemsOnCart.length
        },
        itemQtdOnCart(state) {
            return (id) => {
                const item = state.itemsOnCart.find(i => i.id == id)
                return item ? item.qtd : 0
            }
        },
        cartTotalPrice(state) {
            return state.itemsOnCart.reduce((acc, curr) => acc + (curr.price * curr.qtd), 0)
        },
        isLoading(state) {
            return state.isLoading
        },
    },
 
})
