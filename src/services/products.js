import { http } from './config'

export default {
    read: () => {
        return http.get('products')
    },
}