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

            <input type="text" name="name" placeholder="Nome" v-model="name">
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
        const image = ref('')
        const files = ref('')


        const onFileChange = (e) => {

            const files = e.target.files || e.dataTransfer.files
            if (files.length == 0) return

            console.log("Nome da imagem", files[0])
        }

        const addProduct = () => {

            const formData = new FormData()
            console.log("Files img", formData.append('image', files[0]))
            console.log(formData.get('file'));

            formData.append('category_id', category_id.value);
            formData.append('name', name.value);
            formData.append('description', description.value);
            formData.append('image', files[0]);

            const config = {
                headers:{
                    'Content-type' : 'multipart/form-data'
                }
            }

            const params = {
    
                category_id: category_id.value,
                name: name.value,
                description: description.value,
                image: formData.append('image', files[0]),
                completed: false,
                
            }

            console.log(params);

            ProductService.addProduct(formData,config)
                        .then(() => router.push({name: 'products.index'}))       
        }

        return {
            addProduct,
            category_id,
            name,
            description,
            image,
            onFileChange,
            files,
            FormData
        }       
    }
}
</script>