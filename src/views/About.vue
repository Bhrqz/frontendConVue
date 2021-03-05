<template>
  <div class="about">
    <h1>This is an about page, que esta protegido</h1>
    {{token}}
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(["token"])
  },
  methods: {
    async datosProtegidos(){
      try {

        //envío de la informacion  al BackEnd
        const res = await fetch('https://app-43.herokuapp.com/api/admin',
        {
          headers: {
            'Content-Type': 'application/json',

            //aqui va el token previamente obtenido por el usuario
            'auth-token': this.token
        }},
        )

        //respuesta del backEnd
        const resDB = await res.json()
        console.log(resDB)
      }

         catch (error) {
        console.log(error)
      }
    },
    
  },
  
  //ciclo de vida de la funcion datosProtegidos
    created(){
      this.datosProtegidos()
    }

}
</script>