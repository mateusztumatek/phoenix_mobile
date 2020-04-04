<template>
    <div v-if="gallery">
        <div class="my-container">
            <div class="my-grid">
                <div class="item" v-for="item in gallery">
                    <v-img @click="activeImage = item" :src="storage(item.image)"></v-img>
                </div>
            </div>
        </div>
        <v-dialog :value="activeImage != null" @input="(val) => {(!val)? activeImage = null : null}" persistant width="90%">
            <v-card>
                <v-img v-if="activeImage" :src="storage(activeImage.image)" width="100%">
                    <div class="row justify-center align-center">
                        <v-btn small fab @click="activeImage = null"><v-icon>mdi-close</v-icon></v-btn>
                    </div>
                </v-img>
                <v-card-actions v-if="activeImage != null && (activeImage.url || activeImage.facebook || activeImage.instagram)">
                    <v-btn fab class="mx-1" color="primary" x-small v-if="activeImage.site" :href="activeImage.site"><v-icon>mdi-earth</v-icon></v-btn>
                    <v-btn fab class="mx-1" color="primary" x-small v-if="activeImage.facebook" :href="activeImage.facebook"><v-icon>mdi-facebook</v-icon></v-btn>
                    <v-btn fab class="mx-1" color="primary" x-small v-if="activeImage.instagram" :href="activeImage.instagram"><v-icon>mdi-instagram</v-icon></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import {getGallery} from "../api/gallery";

    export default {
        data:() => {
            return{
                activeImage: null,
                gallery: null,
            }
        },
        mounted(){
            this.getGallery();
        },
        methods:{
            getGallery(){
                getGallery().then(res => {
                    this.gallery = res;
                })
            }
        }
    }
</script>
<style lang="scss">

</style>