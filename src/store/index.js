import Vue from 'vue'
import Vuex from 'vuex'
import apiService from '../services/products'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [],
        itemOnCart: [],
        orderBy: 'price',
        categories: [],
        filterBy: '',
        rateRange: { min: 0, max: 0 },
        selectedRate: 0,
    },
    mutations: {
        SET_FILTER_BY(state, filterBy) {
            state.filterBy = filterBy
        },

        SET_CATEGORIES(state, categories) {
            state.categories = categories
        },

        SET_RATE_RANGE(state, range) {
            state.rateRange = range
        },

        SET_ITEMS(state, items) {
            state.items = items
        },
        ADD_ITEM_CART(state, item) {
            const index = state.itemOnCart.findIndex((i) => i.id === item.id)

            if (index >= 0) {

                const itemOnChart = { ...state.itemOnCart.find((i) => i.id === item.id) }
                itemOnChart.qtd = itemOnChart.qtd + 1
                Vue.set(state.itemOnCart, index, itemOnChart)
            } else {

                item.qtd = 1
                state.itemOnCart.push(item)
            }

        },

        REMOVE_ITEM_CART(state, itemId) {

            const index = state.itemOnCart.findIndex((i) => i.id === itemId)

            if (index >= 0) {
                const itemOnChart = { ...state.itemOnCart.find((i) => i.id === itemId) }
                itemOnChart.qtd = itemOnChart.qtd - 1

                if (itemOnChart.qtd === 0) {

                    state.itemOnCart.splice(index, 1);
                } else {
                    Vue.set(state.itemOnCart, index, itemOnChart)
                }
            }

        },

        SET_SELECTED_RATE(state, rate) {
            state.selectedRate = rate
        },

    },
    actions: {
        async index({ commit }) {
            try {

                const response = await apiService.read();
                commit("SET_ITEMS", response.data);


                let categories = [...new Set(response.data.map(item => item.category))]

                commit("SET_CATEGORIES", categories);


                const rates = response.data.map(item => item.rating.rate)
                const rangeObject = {
                    min: Math.min(...rates),
                    max: Math.max(...rates)
                }
                commit("SET_RATE_RANGE", rangeObject);

                commit("SET_SELECTED_RATE", rangeObject.min);


            } catch (error) {
                throw new Error("Não foi possível carregar os itens");
            }
        },

    },
    getters: {
        rateRange(state) {
            return state.rateRange
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
            let temp = state.filterBy ? state.items.filter(item => item.category === state.filterBy) : state.items
            return temp.filter(item => item.rating.rate >= state.selectedRate)
        },
        itemsOnCart(state) {
            return state.itemOnCart
        },
        itemQtdOnCart(state) {
            return (id) => {
                const item = state.itemOnCart.find(i => i.id == id)
                return item ? item.qtd : 0
            }
        },
        cartTotalPrice(state) {
            return state.itemOnCart.reduce((acc, curr) => acc + (curr.price * curr.qtd), 0)
        },
    },
 
})
