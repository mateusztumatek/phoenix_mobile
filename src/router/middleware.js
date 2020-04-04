import router from './index';
import store from '../store/index';
import Vue from 'vue';
/*router.beforeEach(async (to, from, next) => {
    if(!store.getters.app.langs){
        store.dispatch('app/getLangs');
    }
    console.log(store.getters.notifications);
    if(store.getters.notifications == null){
        store.dispatch('notifications/getNotifications');
    }
    store.dispatch('user/checkLocation');
    next();
})*/
router.beforeEach(async(to, from, next) => {
    if(!store.getters.menu){
        store.dispatch('app/getAppInfo');
    }
    if(from){
        store.commit('app/ADD_BREADCRUMB', {path: from.fullPath});
    }

    store.commit('app/TOGGLE_NAVIGATION', false);
    Vue.prototype.$eventBus.$emit('resetNavigation');
   next()
});
