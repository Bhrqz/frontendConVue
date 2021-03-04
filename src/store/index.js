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
    }
  },
  modules: {
  }
})
