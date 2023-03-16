<template>
    <div>
        <h1>Editar Product</h1>

        <form @submit.prevent="editProduct">
            <select name="category_id" v-model="product.category_id">
                <option value="0">Selecione a categoria</option>
                <option value="1"> Categoria A</option>
                <option value="2"> Categoria B</option>
                <option value="3"> Categoria C</option>
                <option value="4"> Categoria D</option>
                <option value="5"> Categoria E</option>
            </select>

            <input type="text" name="name" placeholder="Titulo do produto" v-model="product.name">
            <input type="text" name="description" placeholder="Descrição" v-model="product.description">
            <input type="file" name="image" ref="fileInput" placeholder="Imagem" @change="onFileChange">
            <button type="submit">Atualizar</button>
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

        let imageUpload = null

        const product = reactive({
            category_id: '',
            name: '',
            description: '',
            image: null,
            completed: false
        })

        const onFileChange = (e) => {
            let files = e.target.files || e.dataTransfer.files
            if (files.length == 0) return
            imageUpload = files[0]
        }

        onMounted(async () => {
            product.loading = true
            ProductService.getProduct(props.id)
            .then(response => {
                console.log(response);
                const productR = response.data
                product.category_id = productR.category_id
                product.name = productR.name
                product.description = productR.description
                product.completed = productR.completed == 'S'
            })
              
        })


        const editProduct = () => {
            
            const formData = new FormData()
            formData.append('category_id', "2")
            formData.append('name', product.name)
            formData.append('description', product.description)
            formData.append('_method', 'PATCH')
            
            if (imageUpload !== null){
                formData.append('image', imageUpload);
            }
            const config = {
                headers:{
                    'content-type': 'multipart/form-data'
                }
            }

            ProductService.editProduct(props.id,formData,config)
                        .then(() => router.push({name: 'products.index'}))
  
        }
 
        return {
          
            editProduct,
            onFileChange,
            FormData,
            product
        }
    }
}
</script>