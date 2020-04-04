<template>
    <div>
        <v-dialog persistent :value="opened" fullscreen hide-overlay transition="dialog-bottom-transition" style="z-index: -10">
            <v-card v-if="filters">
                <v-card-title class="primary" dark><h3 class="white--text">Filtry:</h3>
                    <v-spacer></v-spacer>
                    <v-btn icon class="white--text" @click="closeFilters()"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text style="padding-bottom: 80px">
                    <div class="py-4">
                        <v-text-field outlined class="no-validation my-2" v-model="params.search" label="Szukaj po nazwie"></v-text-field>
                        <v-switch class="no-validation my-2" true-value="1" false-value="0" v-model="params.sellout" label="Przecenione"></v-switch>
                        <v-switch class="no-validation my-2" true-value="1" false-value="0" v-model="params.available" label="Tylko dostępne"></v-switch>
<!--
                        <v-select class="no-validation my-1" dense outlined item-text="attr" return-object label="Sortuj według" v-model="params.sort" :items="sortOptions"></v-select>
-->
                        <v-range-slider
                                step="0.1"
                                v-model="params.prices"
                                :max="150"
                                thumb-label
                                label="Cena"
                                :min="0"
                                hide-details
                                class="align-center my-2"
                        ></v-range-slider>
                        <label>Materiały:</label>
                        <v-checkbox class="no-validation py-1" :value="material.name" v-model="params.materials" multiple v-for="material in filters.materials" :label="material.name"></v-checkbox>
                        <label>Tagi: </label>
                        <v-chip-group
                                v-model="params.tags"
                                column
                                multiple
                        >
                            <v-chip filter outlined :value="tag.tag" v-for="tag in filteredTags">{{tag.tag}}</v-chip>
                        </v-chip-group>
                        <div style="width: 100%" class="d-flex justify-center">
                            <v-btn v-if="max_tags < filters.tags.length" color="grey" class="ma-auto" outlined small @click="max_tags = max_tags + 20">Zobacz więcej</v-btn>
                        </div>
                    </div>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import {getFilters} from "../api/app";
    import queryFilter from 'query-string';
    export default {
        watch:{
            params:{
                deep: true,
                handler: function () {
                    this.emitFilters();
                }
            }
        },
        data:() => {
            return{
                max_tags: 20,
                filters:null,
                params:{
                    prices:[0, 150]
                },
                sortOptions:[
                    {
                        type: 'desc',
                        prop: 'name',
                        attr: 'Nazwa malejąco'
                    },
                    {
                        type: 'asc',
                        prop: 'name',
                        attr: 'Nazwa rosnąco'
                    },
                    {
                        type: 'desc',
                        prop: 'price',
                        attr: 'Cena malejąco'
                    },
                    {
                        type: 'asc',
                        prop: 'price',
                        attr: 'Cena rosnąco'
                    }
                ]
            }
        },
        computed:{
            filteredTags(){
                return this.filters.tags.splice(0, this.max_tags);
            },
            opened(){
                return this.$store.getters.opened_filters;
            },
            filtersCount(){
                var count = 0;
                if(this.params.search && this.params.search != '') count = count +1;
                if(this.params.prices && this.params.prices[0] != 0 && this.params.prices[1] != 150){
                    count = count +1;
                }
                if(this.params.sellout && this.params.sellout == 1) count = count +1;
                if(this.params.available && this.params.available == 1) count = count +1;
                if(this.params.materials){
                    count = count + this.params.materials.length;
                }
                if(this.params.tags){
                    count = count + this.params.tags.length;
                }
                return count;
            }
        },
        mounted() {
            getFilters().then(response => {
                this.filters = response;
            })
            this.$root.$eventBus.$on('resetFilters', () => {
                this.resetFilters();
            })
            var query = queryFilter.parse(this.$route.fullPath, {arrayFormat: 'bracket'});
            if(query.prices == null){
                delete query.prices;
            }
            for(var i in query){
                if(typeof i == 'string' && i.indexOf('?') != -1){
                    delete query[i];
                }
            }
            this.params = {...this.params, ...query};

        },
        methods:{
            emitFilters(){
                var filters = Object.assign({}, this.params);
                if(filters.prices[0] == 0 && filters.prices[1] == 150){
                    delete filters.prices;
                }
                if(filters.sort){
                    var sort = filters.sort;
                    delete filters.sort;
                    filters['sort_attr'] = sort.prop;
                    filters['sort_type'] = sort.type;
                }
                this.$emit('input', {filters: filters, elements: this.filtersCount});
            },
            resetFilters(){
                this.params = {
                    prices:[0, 150]
                };
            },
            closeFilters(){
                this.$store.commit('app/TOGGLE_FILTERS', false)
            }
        }
    }
</script>