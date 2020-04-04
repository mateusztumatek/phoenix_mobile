import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
require('./plugins/mixins');
require('./plugins/registerComponents');
import './router/middleware';
Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue();
new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
