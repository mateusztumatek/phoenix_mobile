<template>
    <div>
        <v-footer width="100%" class="px-0" dark color="transparent">
            <v-card
                    flat
                    tile
                    width="100%"
                    class="primary lighten-1 text-center">
                <v-card-text>
                    <v-btn
                            v-for="item in menu"
                            exact-active-class
                            active-class="none"
                            :to="(item.url && item.url != '')? item.url : '/'"
                            color="transparent"
                            depressed
                            small
                            style="background-color: transparent !important;"
                    >
                        {{ item.title }}
                    </v-btn>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} — <strong>Raccmooncraft</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </div>
</template>
<script>
    export default {
        computed:{
            menu(){
                return this.$store.getters['app/menu'];
            }
        }
    }
</script>
<style lang="scss">
    .none{
        background-color: transparent !important;
        &:before{
            opacity: 0 !important;
        }
    }
</style>