<template>
    <v-navigation-drawer
            :value="navigation"
            @input="close"
            color="primary"
            app
            dark
            width="80vw"
            hide-overlay
    >
        <transition name="slide-fade" mode="in-out">
            <div class="pa-4" v-show="activeItem == null">
                <v-list
                        dense
                        flat
                        nav
                        class="py-0"
                >
                    <v-list-item class="mb-5"><h2>Menu strony</h2></v-list-item>
                    <v-list-item :to="(!item.childrens || item.childrens.length == 0)? item.url : null" @click.prevent="clickLink(item)" v-for="item in menu" class="py-5">
                        <v-list-item-title>
                            <span style="font-size: 1.2rem">{{item.title}}</span>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
        </transition>
        <transition-group name="slide-fade" mode="in-out">
            <div class="pa-4" v-show="item == activeItem" v-for="(item, index) in menu" :key="index">
                <v-list
                        v-if="item.childrens"
                        dense
                        flat
                        nav
                        class="py-0"
                >
                    <v-list-item class="mb-5"><v-btn class="mr-3" @click="activeItem = null" icon><v-icon>mdi-arrow-left</v-icon></v-btn><h2>{{item.title}}</h2></v-list-item>
                    <v-list-item :to="child.path" v-for="child in item.childrens" class="py-5">
                        <v-list-item-title>
                            <span style="font-size: 1.2rem">{{child.name}}</span>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </div>
        </transition-group>

    </v-navigation-drawer>
</template>
<script>
    export default {
        watch:{
            navigation: function () {
                if(!this.navigation) this.activeItem = null;
            }
        },
        computed:{
            menu(){
                return this.$store.getters.menu
            },
            navigation(){
                return this.$store.getters.navigation;
            }
        },
        data(){
            return{
                activeItem: null,
            }
        },
        mounted(){
            this.$root.$eventBus.$on('resetNavigation', () => {
                setTimeout(() => {
                    this.activeItem = null;
                }, 50)

            });
        },
        methods:{
            close(data){
                if(!data){
                    this.$store.commit('app/TOGGLE_NAVIGATION', false);
                }
            },
            clickLink(item){
                if(item.childrens){
                    this.activeItem = item;
                }else{
                    this.$router.push(item.url);
                }
            }
        }
    }
</script>
<style lang="scss">
    /* Enter and leave animations can use different */
    /* durations and timing functions.              */
    .slide-fade-enter-active {
        position: absolute;
        transition: all 300ms;
    }
    .slide-fade-leave-active {
        position: absolute;
        transition: all 300ms cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter{
        transform: translateX(-300px);
        opacity: 0;
    }
    .slide-fade-leave-to
        /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(300px);
        opacity: 0;
    }
    .slide-fade-enter-to{
        transform: translateX(0px);
    }
</style>