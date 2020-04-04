<template>
    <div>
        <div class="my-container">
            <div class="row" style="padding-top: 200px">
                <div v-for="(product,index) in products.data" class="col-6" style="position: relative;" :style="{'transform': (index % 2 == 0)? 'translateY(-200px)' : null}">
                    <v-card style="border-radius: 16px; overflow: hidden" @click="setActive(product)" v-bind:class="{'elevation-8': activeProduct == product, 'elevation-0': activeProduct != product}" color="white" >
                        <img :src="storage(product.imgs[0])" style="width: 100%; border-radius: 8px">
                        <v-card-text>
                            <div class="d-flex align-end">
                                <span class="price black--text" style="font-size: 1.3rem; font-weight: 900">{{product.calculated_price | currency}}zł</span>
                                <span class="price-sellout ml-2" v-if="product.is_sellout" style="font-size: 0.9rem">{{product.price | currency}}zł</span>
                            </div>
                            <h3 style="font-size: 0.8rem" class="mt-4 font-weight-bold black--text">{{product.name}}</h3>
                            <v-chip-group column>
                                <v-chip x-small v-if="product.new" color="primary">Nowość</v-chip>
                                <v-chip x-small v-if="product.is_sellout" color="primary">Wyprzedaż</v-chip>
                                <v-chip x-small v-if="product.availability == 0" color="primary">Niedostępny</v-chip>
                                <v-chip x-small v-if="product.availability == 2" color="primary">Dostępny na zamówienie</v-chip>
                                <v-chip x-small v-if="product.availability == 1" color="primary">Dostępny od ręki</v-chip>
                            </v-chip-group>


                          <!--  <transition name="slide-down">
                                <div v-if="activeProduct == product">
                                    <v-chip-group column>
                                        <v-chip x-small v-if="product.new" color="primary">Nowość</v-chip>
                                        <v-chip x-small v-if="product.is_sellout" color="primary">Wyprzedaż</v-chip>
                                        <v-chip x-small v-if="product.availability == 0" color="primary">Niedostępny</v-chip>
                                        <v-chip x-small v-if="product.availability == 2" color="primary">Dostępny na zamówienie</v-chip>
                                        <v-chip x-small v-if="product.availability == 1" color="primary">Dostępny od ręki</v-chip>
                                    </v-chip-group>
                                    <p v-if="product.quantity > 0" class="mb-0">Ilość dostępnych: {{product.quantity}}</p>
                                </div>
                            </transition>-->
                        </v-card-text>
                    </v-card>
                </div>
                <div style="width: 100%" v-if="products.data.length == 0">
                    <h3 style="text-align: center">Brak produktów</h3>
                </div>
            </div>
        </div>
        <div class="my-footer white row justify-center py-3 ma-0" :class="{'my-footer-active': activeProduct != null}">
            <div class="my-container d-flex justify-center">
                <v-btn v-if="activeProduct" :to="'/produkt/'+activeProduct.id+'/'+activeProduct.slug" style="width: 80%;" depressed color="primary">Zobacz produkt</v-btn>
            </div>
            <v-btn absolute fab top right x-small color="primary" @click="setActive(null)"><v-icon>mdi-close</v-icon></v-btn>
        </div>
    </div>
</template>
<script>
    export default {
        props:['products'],
        data:() => {
            return{
                activeProduct: null
            }
        },
        methods:{
            setActive(prod){
                this.$router.push('/produkt/'+prod.id+'/'+prod.slug);
                /*this.activeProduct = prod;
                this.$emit('active', prod);*/
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../assets/variables";
    .v-card--link{
        &:before{
            border-radius: 16px !important;
        }
    }
</style>