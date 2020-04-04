<template>
  <div>
    <router-link :to="'/'"><v-img :src="storage(logo)" :max-width="(maxWidth )? maxWidth : null"></v-img></router-link>
  </div>
</template>
<script>
  export default {
    props:['maxWidth'],
    computed:{
      logo(){
        return this.$store.getters.logo;
      }
    }
  }
</script>