import axios from 'axios'
export default class ProductService {

    static async getAll() {
        return axios.get('/products')
    }

    static async addProduct(params, config)
    {
        return axios.post('/products', params, config)
    }


}