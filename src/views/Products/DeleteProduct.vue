
<script>
    
    import ProductService from '@/services/products.service'
    import router from '@/router'

    export default {
        name: 'DeleteProduct',
        props: {
            id: {
                require: true
            }
        },

        setup(props) {

            ProductService.deleteProduct(props.id)
                                .then(() => router.push({name: 'products.index'}))
        },
        
    } 

</script>