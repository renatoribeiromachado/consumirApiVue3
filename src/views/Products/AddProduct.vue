<template>
    <div>
        <h1>Adicionar Novo produto</h1>

        <form @submit.prevent="addProduct">
            <select name="category_id" v-model="category_id">
                <option value="0">Selecione a categoria</option>
                <option value="1"> Categoria A</option>
                <option value="2"> Categoria B</option>
                <option value="3"> Categoria C</option>
                <option value="4"> Categoria D</option>
                <option value="5"> Categoria E</option>
            </select>

            <input type="text" name="name" placeholder="Titulo do produto" v-model="name">
            <input type="text" name="description" placeholder="Descrição" v-model="description">
            <input type="file" name="image" ref="fileInput" placeholder="Imagem" @change="onFileChange">
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<script>
import { ref } from 'vue'

import ProductService from '@/services/products.service'
import router from '@/router'

export default {
    name: 'addProduct',
    setup() {

        const category_id = ref('')
        const name = ref('')
        const description = ref('')
        let imageUpload = null


        const onFileChange = (e) => {
            let files = e.target.files || e.dataTransfer.files
            if (files.length == 0) return
            imageUpload = files[0]
        }

        const addProduct = () => {

            const formData = new FormData()
            formData.append('category_id', category_id.value);
            formData.append('name', name.value);
            formData.append('description', description.value);
            if (imageUpload !== null)
                formData.append('image', imageUpload);

            const config = {
                headers:{
                    'content-type': 'multipart/form-data'
                }
            }

            ProductService.addProduct(formData,config)
                            .then(() => router.push({name: 'products.index'}))
        }

        return {
            addProduct,
            category_id,
            name,
            description,
            onFileChange,
            FormData
        }
    }
}
</script>