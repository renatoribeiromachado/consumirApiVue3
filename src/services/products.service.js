import axios from 'axios'
export default class ProductService {

    static async getAll() {
        return axios.get('/products')
    }

    static async addProduct(params, config)
    {
        return axios.post('/products', params, config)
    }

    static async editProduct(id, params,formData, config)
    {
        return axios.put(`/products/${id}`, params, formData, config)
    }

    static async getProduct(id)
    {
        return axios.get(`/products/${id}`)
    }

}