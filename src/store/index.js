import { createStore } from 'vuex'

export default createStore({
  state: {
    token:null
  },
  mutations: {
    setToken(state, payload){
      state.token = payload
    }
  },

  //en actions van todas las funciones llamadas en las vistas
  actions: {
    async login({commit}, usuario){
      console.log(usuario)
    
      try {

        //Todo esto es lo que haciamos con POSTMAN
        const res = await fetch("https://app-43.herokuapp.com/api/user/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuario)
        
        })

        //la respuesta del backend, guardada
        const usuarioDB = await res.json()
        
        //pintar en consola la res completa
        console.log(usuarioDB)

        //ahora solo el token
        console.log(usuarioDB.data.token)

        //guardar el TOKEN en LocalStorage
        commit('setToken', usuarioDB.data.token)
        localStorage.setItem('token', usuarioDB.data.token)

      } catch (error) {
        console.log(error)
      }
    },

      //Para evitar que cuando se reinicie la PAG 
      //se pierda el TOKEN
     obtenerToken({ commit }) {
      if (localStorage.getItem('token')) {
        commit('setToken', localStorage.getItem('token'))
      } else {
        commit('setToken', null)
      }
    },

    //Funcion que se activa al darle al boton Cerrar Sesion
    //remueve el token del storage
    cerrarSesion({commit}){
      localStorage.removeItem("token")
      commit ("setToken", null)
  },
  },

  modules: {
  }
})
