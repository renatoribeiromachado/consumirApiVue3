<template>
    <div>
        <input type="checkbox" :checked="completed" @change="toogleStatus">
        {{ product.title }} - {{ product.body }}
        <router-link :to="{name: 'products.edit', params: {id: product.identify}}"><i class="fas fa-edit"></i></router-link>
        <a href="#" @click.prevent="deleteProduct"><i class="fas fa-trash-alt"></i></a>
    </div>
</template>

<script>
import { computed } from 'vue'

import ProductService from '@/services/products.service'

export default {
    name: 'Product',
    props: {
        product: {
            require: true,
            type: Object,
        }
    },
    setup(props, {emit}) {
        const completed = computed(() => props.product.completed == 'S')

        const deleteProduct = () => {
            ProductService.deleteProduct(props.product.id)
                        .then(() => emit('productDeleted', props.product))
        }

        const toogleStatus = () => {
            const product = props.product
            const params = {
                name: product.title,
                description: product.body,
                completed: !completed.value
            }

            ProductService.editProduct(props.product.id, params)
                        .then(() => emit('productUpdated', params))
        }

        return {
            deleteProduct,
            completed,
            toogleStatus
        }
    }
}
</script>