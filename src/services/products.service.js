import axios from 'axios'
export default class ProductService {

    static async getAll() {
        return axios.get('/products')
    }

    static async addProduct(params, config)
    {
        return axios.post('/products', params, config)
    }

    static async editProduct(id, params, config)
    {
    console.log("parametros ",config)
        return axios.post(`/products/${id}`, params, config)
    }

    static async getProduct(id)
    {
        return axios.get(`/products/${id}`)
    }

    static async deleteProduct(id)
    {
        return axios.delete(`/products/${id}`)
    }

}