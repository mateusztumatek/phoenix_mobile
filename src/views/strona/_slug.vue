<template>
    <div v-if="page">
        <v-img :src="storage(page.background)" width="100%"></v-img>
        <div class="my-container">
            <h1 style="font-size: 1.5rem" class="my-3">{{page.name}}</h1>
            <div v-html="page.content"></div>
        </div>

    </div>
</template>
<script>
    import {getPage} from "../../api/pages";

    export default {
        data:() => {
            return{
              page: null
            }
        },
        watch:{
            $route (to, from){
                this.getPage();
            }
        },
        mounted() {
            this.getPage();
        },
        methods:{
            getPage(){
                getPage(this.$route.params.slug).then(response => {
                    this.page = response;
                })
            }
        }
    }
</script>