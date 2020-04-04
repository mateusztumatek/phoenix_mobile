<template>
  <v-app :class="{'app-navigation-open': navigation}">
    <header-component></header-component>
    <breadcrumbs></breadcrumbs>
    <v-content :class="{'navigation-open': navigation}">
      <router-view></router-view>
    </v-content>
    <navigation-component></navigation-component>
    <transition name="fade">
      <v-btn
              v-scroll="onScroll"
              v-show="top"
              fab
              dark
              fixed
              bottom
              right
              color="primary"
              @click="toTop"
              small
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </transition>
    <messages-component></messages-component>
    <ask-component></ask-component>
    <footer-component></footer-component>
  </v-app>
</template>

<script>
  import HeaderComponent from './components/partials/header';
  import Breadcrumbs from './components/partials/breadcrumbs';
  import NavigationComponent from './components/partials/navigation';
  import FooterComponent from './components/partials/footer';
  import MessagesComponent from './components/partials/messages'
  import AskComponent from './components/product-ask';
  export default {
    components:{HeaderComponent, NavigationComponent, Breadcrumbs,MessagesComponent, FooterComponent, AskComponent},
    computed:{
      navigation(){
        return this.$store.getters['app/navigation']
      }
    },
    data:() => {
      return{
        top: false,
      }
    },
    mounted() {

    },
    methods:{
      onScroll (e) {
        if (typeof window === 'undefined') return
        const top = window.pageYOffset ||   e.target.scrollTop || 0
        this.top = top > 20
      },
      toTop () {
        this.$vuetify.goTo(0)
      }
    }
  }
</script>
<style lang="scss">
  html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }
  @import "assets/variables";
  @import "assets/default";
  @import "assets/hamburger";
  [v-cloak] {display: none; opacity: 0 !important;}
  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
  }

  .button--green:hover {
    color: #fff;
    background-color: #3b8070;
  }

  .button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
  }

  .button--grey:hover {
    color: #fff;
    background-color: #35495e;
  }
</style>
