<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
    <br>
    <button @click="cerrarSesion">Cerrar Sesión</button>
  </div>
  <router-view/>
</template>


<script>
import {mapActions} from "vuex"


//Disparador de la funcion "leerToken" en store/index
//Lo mismo con la funcion de Cerrar sesion
//se mapean los metodos
//Exportandolos, permites que sean acccedidas
export default {
  methods: {
    ...mapActions(["obtenerToken", "cerrarSesion"])
  },
  created(){
    this.obtenerToken()
  },
  
}
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
