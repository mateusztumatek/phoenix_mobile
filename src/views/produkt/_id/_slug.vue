<template>
    <div v-if="product">
        <v-lazy
                :value="false"
                :options="{threshold: .5}"
                transition="fade-transition">
            <hooper :itemsToShow="1" :centerMode="true" style="height: 350px" :wheelControl="false">
                <slide v-for="image in product.imgs">
                    <v-card class="text-center py-3 elevation-0 section" style="border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; position: relative">
                        <img :src="storage(image)" height="320px" contain>
                    </v-card>
                </slide>
                <hooper-pagination style="bottom: 10px; right: 52%" slot="hooper-addons"></hooper-pagination>
            </hooper>
        </v-lazy>
        <div class="my-container" style="padding-bottom: 80px">
            <div class="mt-8 mb-4">
                <h2 class="font-weight-bold" style="font-size: 2.3rem">{{product.name}}</h2>
                <v-rating  :half-increments="true" background-color="primary" readonly :value="rate"></v-rating>
            </div>

            <div class="d-flex align-content-end mb-5">
                <span class="price d-flex" style="align-items: flex-end">{{product.calculated_price | currency}} zł</span>
                <span class="price-sellout ml-5 d-flex" v-if="product.is_sellout" style="align-items: center">{{product.price | currency}} zł</span>
            </div>
            <v-chip-group column>
                <v-chip small v-if="product.new" color="primary">Nowość</v-chip>
                <v-chip small v-if="product.is_sellout" color="primary">Wyprzedaż</v-chip>
                <v-chip small v-if="product.availability == 0" color="primary">Niedostępny</v-chip>
                <v-chip small v-if="product.availability == 2" color="primary">Dostępny na zamówienie</v-chip>
                <v-chip small v-if="product.availability == 1" color="primary">Dostępny od ręki</v-chip>
            </v-chip-group>
            <p class="mb-1 text-muted">Waga: {{product.weight}}</p>
            <div class="d-flex mb-1">
                <p class="text-muted">Rozmiary:</p>
                <div class="ml-2">
                    <span class="text-muted" v-for="size in getSizeArray(product)">{{size}} <br></span>
                </div>
            </div>
            <p class="mb-1 font-weight-bold">Opis:</p>
            <div v-html="product.content" class="text-muted"></div>
            <p class="mb-1 font-weight-bold mt-4">Tagi:</p>
            <v-chip-group column>
                <v-chip color="primray" small v-for="tag in product.tags">{{tag.tag}}</v-chip>
            </v-chip-group>
            <p class="mb-1 font-weight-bold mt-4">Materiały:</p>
            <v-chip-group column>
                <v-chip color="primray" small v-for="material in product.materials">{{material.name}}</v-chip>
            </v-chip-group>
            <div class="my-footer my-footer-active white row justify-center py-3 ma-0 elevation-5" style="z-index: 100 !important;">
                <div class="my-container d-flex justify-center flex-wrap">
                    <transition name="slide-down">
                        <div v-if="product.rating" class="row">
                            <div class="col-8" v-if="!data.send">
                                <v-form ref="rate_form" >
                                    <v-rating :half-increments="true" background-color="primary" v-model="data.rate"></v-rating>
                                    <v-text-field class="validation-only" :rules="[rules.required]" v-model="data.rate"></v-text-field>
                                </v-form>
                            </div>
                            <div class="col-4 d-flex justify-end" v-if="!data.send">
                                <v-btn depressed color="primary" @click="rateProduct()" :loading="loading">Oceń</v-btn>
                            </div>
                            <div class="col-12" v-if="data.send">
                                <h3 class="font-weight-light" style="font-size: 1rem">Ocena została wysłana</h3>
                            </div>
                        </div>
                    </transition>

                    <div class="row">
                        <div class="col-2">
                            <v-btn @click="(!product.rating)? $set(product, 'rating', true) : product.rating = false" style="width: 100%; min-width: unset" outlined color="primary"><v-icon>mdi-star-outline</v-icon></v-btn>
                        </div>
                        <div class="col-10">
                            <v-btn style="width:100%" depressed color="primary" @click="$root.$eventBus.$emit('product', product)">Zapytaj o ten produkt</v-btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getProduct, rateProduct} from "../../../api/products";
    import { Hooper, Slide, Pagination as HooperPagination} from 'hooper';
    export default {
        computed:{
          rate(){
              var total = 0;
              this.product.rates.forEach(item => {
                  total = total + item.rate;
              })
              total = total / this.product.rates.length;
              if(total == 0) return 5;
              return total;
          }
        },
        watch:{
            $route (to, from){
                this.getProduct();
            }
        },
        data:() => {
            return{
                loading: false,
                product: null,
                data: {},
                rules:{
                    required: (v) => !!v || 'Te pole jest wymagane',
                    email: v => /.+@.+\..+/.test(v) || 'Te pole musi być poprawnym adresem email',
                }
            }
        },
        components:{
            Hooper,
            Slide,
            HooperPagination
        },

        mounted() {
            this.getProduct();
        },
        methods:{
            getProduct(){
                getProduct(this.$route.params.id).then(response => {
                    this.product = response;
                })
            },
            getSizeArray(product){
                return product.size.split(',');
            },
            rateProduct(){
                if(this.$refs.rate_form.validate()){
                    this.loading = true;
                    rateProduct(this.product.id, this.data).then(response => {
                        this.product.rates.push(response);
                        this.$set(this.data, 'send', true);
                        this.loading = false;
                    })
                }
            }
        }
    }
</script>
<style lang="scss">
    .v-rating{
        button{
            padding-left: 0px !important;
        }
    }
</style>