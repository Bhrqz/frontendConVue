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
  }
}
</script>