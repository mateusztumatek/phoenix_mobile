import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';

Vue.use(InfiniteLoading);
Vue.component('logo-component', require('../components/Logo').default);
Vue.prototype.$eventBus = new Vue();