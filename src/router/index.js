import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

//importamos la informacion de Store, due to necesitaremos
//el token para verificar al usuario autenticado del que no lo esta
//desde el store, ya está exportada la info
import store from '../store' 


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    
    //esto es para proteger la pagina de ruta
    meta: {rutaProtegida: true}
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Otra parte para la proteccion de la ruta
//un middleware que se ejecuta ANTES DE cualquier enrutamiento
//beforeEACH y'know
router.beforeEach ((to, from, next) => {
  const rutaEsProtegida = to.matched.some(item => item.meta.rutaProtegida)


  //si la ruta es protegida y el NO hay token, te mando para el home ('/')
  if (rutaEsProtegida && store.state.token === null) {
    console.log('es protegida')
    next('/')


  }else{
    console.log("no es protegida")
    next()
  }
})


export default router
