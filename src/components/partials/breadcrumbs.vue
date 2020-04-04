<template>
    <div style="z-index: 0">
        <transition name="slide-down">
            <v-toolbar class="breadcrumbs elevation-0" dense v-if="breadcrumbs && breadcrumbs.length > 0 && title != 'Strona główna'">
                <v-btn icon @click="$store.dispatch('app/back')">
                    <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <v-toolbar-title style="font-size: 1rem">{{title}}</v-toolbar-title>
            </v-toolbar>
        </transition>
    </div>
</template>
<script>
    export default {
        computed:{
            breadcrumbs(){
                return this.$store.getters['app/breadcrumbs'];
            },
            title(){
                return this.$store.getters['app/title'];
            }
        }
    }
</script>
<style lang="scss">
    .slide-down-enter-active, .slide-down-leave-active {
        transition: all .3s;
    }
    .slide-down-enter, .slide-down-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(-80px);
        opacity: 0;
    }
    .breadcrumbs{
        z-index: -1;
    }
</style>