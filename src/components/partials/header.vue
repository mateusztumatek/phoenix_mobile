<template>
    <div>
        <v-app-bar
                style="z-index: 100"
                color="primary-color"
                dark
        >
            <v-toolbar-title>
                <logo-component :max-width="80"></logo-component>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn href="https://www.instagram.com/raccmoon.craft/" icon>
                <img style="width: 25px" :src="storage('default/instagram.svg')">
            </v-btn>
            <v-btn href="https://www.facebook.com/raccmoon.craft/" icon>
                <img style="width: 25px" :src="storage('default/facebook.svg')">
            </v-btn>

            <button @click="$store.commit('app/TOGGLE_NAVIGATION')" :class="{'is-active' : navigation}" class="hamburger hamburger--spin" type="button">
                  <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                  </span>
            </button>
        </v-app-bar>
    </div>
</template>
<script>
    export default {
        data:() => {
            return{
                menu_open:false,
            }
        },
        computed:{
            navigation(){
                return this.$store.getters.navigation;
            }
        },

    }
</script>