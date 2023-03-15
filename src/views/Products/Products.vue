<template>
    <h1>
        Lista de produtos - <router-link :to="{name: 'products.create'}"><i class="fas fa-plus-square"></i> ADD novo produto</router-link>
   
    </h1>

    <div v-show="loading">
        Carregando os produtos
    </div>

    <ul>
        <li v-for="product in products" :key="product.id">
        {{ product.name }}
        <img :src="`${path}${product.image}`" :alt="product.image" style="max-width: 150px; "/> 
            <router-link :to="{name: 'products.edit', params: {id: product.id}}"><i class="fas fa-edit"></i> Editar</router-link>
        </li>
    </ul>
</template> 

<script>
import { onMounted, ref } from 'vue'

import ProductService from '@/services/products.service'


export default {
    name: 'Products',
    setup() {
        const products = ref([])
        const path = "https://produtos.acessohost.com.br/storage/products/";

        onMounted(() => {

            ProductService.getAll()
                    .then(response => {
                        console.log(response)
                        products.value = response.data.data
                    })
                    .catch(error => console.log(error))        
        })

        return {
            products,
            path

        }
    },
    
}
</script>