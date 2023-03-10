<template>
    <div>
        <h1>Editar Product</h1>

        <form action="#" method="post" @submit.prevent="editProduct">
            <input type="text" name="title" placeholder="Título" v-model="product.name">
            <input type="text" name="description" placeholder="Descrição" v-model="product.description">
            <button type="submit" :disabled="product.loading">
                <span v-if="product.loading">Aguarde...</span>
                <span v-else>Enviar</span>
            </button>
        </form>
    </div>
</template>

<script>
import { onMounted, reactive } from 'vue'

import ProductService from '@/services/products.service'
import router from '@/router'

export default {
    name: 'EditProduct',
    props: {
        id: {
            require: true
        }
    },
    setup(props) {
        const product = reactive({
            name: '',
            description: '',
            completed: false,
            loading: false
        })

        onMounted(async () => {
            product.loading = true
            TodoService.getProduct(props.id)
                        .then(response => {
                            const todoR = response.data.data
                            product.name = todoR.title
                            todo.description = todoR.body
                            todo.completed = todoR.completed == 'S'
                        })
                        .finally(() => product.loading = false)
        })

        const editProduct = () => {
            product.loading = true
            TodoService.editTodo(props.id, {...product})
                        .then(() => router.push({name: 'products.index'}))
                        .finally(() => product.loading = false)
        }

        return {
            editProduct,
            product
        }
    }
}
</script>