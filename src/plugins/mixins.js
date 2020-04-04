import Vue from 'vue';
import config from '../config'
const mixin = {
    transition: 'page',
    data(){
        return{

        }
    },
    methods:{
        storage(path){
            return config.api_url+'/str/'+path;
        },
        resolveImage(json){
            try{
                var tmp = JSON.parse(json);
                if(tmp.length > 0) return tmp[0];
                return null;
            }catch(exception){
                return null;
            }
        }
    }
}
Vue.mixin(mixin);
Vue.filter('currency',  (value) => {
    let val = (value/1).toFixed(2).replace('.', ',')
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
});
Vue.filter('truncate', function (value, limit) {
    if (value.length > limit) {
        value = value.substring(0, (limit - 3)) + '...';
    }
    return value
})
Vue.filter('striphtml', function (value) {
    var text = value.replace(/<[^>]*>?/gm, '');
    return text;
});