<template>
    <div v-if="products">
        <div class="section pt-4" style="padding-bottom: 30px; margin-bottom: 80px; border-top-right-radius: 0px !important; border-top-left-radius: 0px !important;">
            <products-component @active="setActive" :products="products"></products-component>
            <div class="my-container" v-if="!showMore">
                <v-btn depressed style="width: 100%" color="primary"  @click="showMore = true">Zobacz więcej</v-btn>
            </div>
            <infinite-loading v-if="products && products.last_page > products.current_page && showMore" @infinite="infiniteHandler"></infinite-loading>
        </div>
        <div class="my-footer white row justify-center py-3 ma-0" :class="{'my-footer-active': activeProduct == null}">
            <div class="my-container d-flex justify-center">
                <v-btn style="width: 80%;" depressed color="primary" v-if="!filters_opened" @click="$store.commit('app/TOGGLE_FILTERS')">Filtruj <span v-if="filters && filters.elements != 0 && filters.elements != null">({{filters.elements}})</span></v-btn>
                <div class="row justify-space-between" v-if="filters_opened">
                    <div class="col-6">
                        <v-btn style="width: 100%" depressed color="primary"  @click.stop.prevent="$root.$eventBus.$emit('resetFilters')">Resetuj filtry</v-btn>
                    </div>
                    <div class="col-6">
                        <v-btn style="width: 100%"  depressed color="primary"  @click="applyFilters()">Zastosuj filtry <span v-if="filters && filters.elements != 0 && filters.elements != null">({{filters.elements}})</span></v-btn>
                    </div>
                </div>
            </div>
        </div>
        <filter-component v-model="filters"></filter-component>
    </div>
</template>
<script>

    import {getProducts} from "../api/products";
    import queryString from 'query-string';
    import ProductsComponent from '../components/products';
    const FilterComponent = () => ({
        component: import('../components/filters'),
    });
    export default{
        components: {FilterComponent, ProductsComponent},
        computed:{
            filters_opened(){return this.$store.getters.opened_filters}
        },
        watch:{
            $route (to, from){
                this.filters = {};
                this.getProducts();
            }
        },
        data:() => {
            return{
                products:null,
                showMore: true,
                filters:{},
                activeProduct: null
            }
        },
        mounted(){
          this.getProducts();
        },
        methods:{
            infiniteHandler($state){
                var filters = this.prepereFilters();
                var page = this.products.current_page + 1;
                getProducts({...filters, page: page}).then(response => {
                    response.data.forEach(item => {
                        this.products.data.push(item);
                    })
                    this.products.current_page = response.current_page;
                    this.products.last_page = response.last_page;
                    this.products.total = response.total;
                    if(this.products.current_page % 2 == 0) this.showMore = false;
                    if(response.last_page == response.current_page) $state.complete();
                    else $state.loaded();
                }).catch(e => {
                    $state.complete();
                })
            },
            prepereFilters(){
                if(this.filters && this.filters.filters){
                    var filters = this.filters.filters;
                }else{
                    var filters = {};
                }
                if(this.$route.params.slug){
                    filters.category = this.$route.params.slug;
                }
                if(this.$route.params.id){
                    filters.collection = this.$route.params.id;
                }
                return filters;
            },
            getProducts(){
                var filters = this.prepereFilters();
                getProducts(filters).then(response => {
                    this.products = response;
                })
            },
            setActive(prod){this.activeProduct = prod},
            applyFilters(){
                this.$store.commit('app/TOGGLE_FILTERS', false);
                this.getProducts();
                var params = this.prepereFilters();
                var string = queryString.stringify(params, {arrayFormat: 'bracket'});
                history.pushState(
                    {},
                    null,
                    this.$route.path + '?' + string
                )
            }
        }
    }
</script>
