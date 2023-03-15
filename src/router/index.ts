import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products/Products.vue'
import AddProduct from '../views/Products/AddProduct.vue'
import EditProduct from '../views/Products/EditProduct.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {  
      path: '/products',
      name: 'products.index',
      component: Products
    },
    {
      path: '/products/create',
      name: 'products.create',
      component: AddProduct,
    },
    {
      path: '/products/:id/edit',
      name: 'products.edit',
      component: EditProduct,
      props: true
    },
  
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
