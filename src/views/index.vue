<template>
  <div>
    <div v-if="data">
        <hooper :wheelControl="false" :infiniteScroll="true" style="height: 29vh">
          <slide v-for="item in data.carousel">
            <v-img :src="storage(resolveImage(item.image))" height="100%" cover>
              <div class="d-flex flex-wrap justify-center align-center w-100" style="height: 100%">
                <div class="text-center">
                  <h3 class="white--text">{{item.name}}</h3>
                  <div class="col-10 ma-auto my-0">
                    <div class="white--text" style="font-size: 0.8rem">{{item.content | striphtml}}</div>
                  </div>
                </div>
              </div>
            </v-img>
          </slide>
        </hooper>

      <v-lazy
              :value="false"
              :options="{
                threshold: .5
              }"
              transition="fade-transition">
        <hooper :itemsToShow="1" :infiniteScroll="true" :centerMode="true" style="height: 620px" :wheelControl="false">
          <slide v-for="item in data.products">
            <v-card class="text-center py-3 elevation-0 section" style="border-top-left-radius: 0px !important; border-top-right-radius: 0px !important; position: relative">
              <img :src="storage(resolveImage(item.images))" height="320px" contain>
            </v-card>
            <div class="my-container">
              <h2 class="font-weight-bold mt-8 mb-4" style="font-size: 2rem">{{item.name}}</h2>
              <div class="d-flex align-content-end mb-5">
                <span class="price d-flex" style="align-items: flex-end">{{item.calculated_price | currency}} zł</span>
                <span class="price-sellout ml-5 d-flex" v-if="item.is_sellout" style="align-items: center">{{item.price | currency}} zł</span>
              </div>
              <v-btn style="border-radius: 50px" outlined color="primary" :to="'/produkt/'+item.id+'/'+item.slug">Zobacz produkt</v-btn>
            </div>
          </slide>
          <hooper-pagination style="bottom: 265px; right: 52%" slot="hooper-addons"></hooper-pagination>
        </hooper>
      </v-lazy>
      <div class="section py-8">
        <div class="my-container">
          <h3 class="text-center" style="font-weight: 100">Wszystko z pasją</h3>
          <div class="row mt-5">
            <div class="col-6" v-for="service in data.services" data-aos-delay="300" data-aos="fade-up" data-aos-duration="500" data-aos-offset="200">
              <v-img :src="storage(resolveImage(service.image))" max-width="50px" class="mb-5"></v-img>
              <h3 class="my-3">{{service.name}}</h3>
              <div v-html="service.content" style="word-break: break-word" class="text-muted"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-container">
        <div class="py-8">
          <h3 class="text-center" style="font-weight: 100">Galeria klientów</h3>
          <div class="row align-center">
            <div class="col-7" style="position: absolute; z-index: 10">
              <v-card class="elevation-6">
                <div v-for="(gallery, index) in data.gallery" :key="index" v-show="activeIndexGallery == index">
                  <v-card-title>{{gallery.name}}</v-card-title>
                  <v-card-text>
                    <v-btn fab class="mx-1" color="primary" x-small v-if="gallery.site" :to="gallery.site"><v-icon>mdi-earth</v-icon></v-btn>
                    <v-btn fab class="mx-1" color="primary" x-small v-if="gallery.facebook" :to="gallery.facebook"><v-icon>mdi-facebook</v-icon></v-btn>
                    <v-btn fab class="mx-1" color="primary" x-small v-if="gallery.instagram" :to="gallery.instagram"><v-icon>mdi-instagram</v-icon></v-btn>
                    <div class="w-100 mt-4">
                      <v-btn v-if="gallery.prod" :to="'/produkt/'+gallery.prod.id+'/'+gallery.prod.slug" outlined style="border-radius: 60px" color="primary" small>Zobacz produkt</v-btn>
                      <v-btn class="mt-3" to="/galeria" outlined style="border-radius: 60px" color="primary" small>Zobacz galerię</v-btn>
                    </div>
                  </v-card-text>
                </div>
              </v-card>
            </div>
            <div class="col-8 offset-4">
              <div v-for="(gallery, index) in data.gallery" :key="index" v-show="activeIndexGallery == index">
                <v-img height="300px" contain :src="storage(data.gallery[activeIndexGallery].image)" class="w-100"></v-img>
              </div>
            </div>
          </div>
          <div class="col-md-12">
            <v-btn icon @click="slide('left')"><v-icon>mdi-arrow-left</v-icon></v-btn>
            <v-btn icon @click="slide('right')"><v-icon>mdi-arrow-right</v-icon></v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import AOS from "aos";

  import {getHome} from "../api/app";
  import { Hooper, Slide, Pagination as HooperPagination} from 'hooper';
  export default {
    components:{
      Hooper,
      Slide,
      HooperPagination
    },
    data:() => {
      return{
        data: null,
        activeIndexGallery: 0,
      }
    },
    mounted(){
      this.getData();
      AOS.init();
    },
    methods:{
      getData(){
        getHome().then(response => {
          this.data = response;
        })
      },
      slide(type){
        if(type == 'left'){
          (this.activeIndexGallery == 0)? this.activeIndexGallery = this.data.gallery.length - 1 : this.activeIndexGallery = this.activeIndexGallery - 1;
        }else{
          (this.activeIndexGallery == this.data.gallery.length - 1)? this.activeIndexGallery = 0 : this.activeIndexGallery = this.activeIndexGallery + 1;
        }
      },
    }
  }
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
