import { http } from './config'

export default {

    create: (product) => {
        return http.post('products', product);
    },

    update: (product) => {
        return http.put('products', product);
    },

    read: () => {
        return http.get('products')
    },

    delete: (product) => {
        return http.delete('products', { data: product })
    }
}