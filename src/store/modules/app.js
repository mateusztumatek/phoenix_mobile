import {getAppInfo, getFilters} from "../../api/app";

const state = {
    menu: null,
    logo: null,
    navigation: false,
    breadcrumbs: [],
    title: '',
    opened_filters: false,
    messages:[]
}

const actions = {
    getAppInfo({state, commit}){
        return new Promise((resolve, reject) => {
            getAppInfo().then(response => {
                commit('SET_APP', response);
                resolve();
            })
        })
    },
    back({state, commit}){
        var index = state.breadcrumbs.length - 1;
        this.app.router.push(state.breadcrumbs[index].path);
    },
}
const mutations = {
    SET_APP: (state, data) => {
        state.menu = data.menu;
        state.logo = data.logo;
    },
    TOGGLE_NAVIGATION:(state, data = null) => {
        if(data != null){
            state.navigation = data
        }else{
            state.navigation = !state.navigation;
        }
    },
    ADD_BREADCRUMB: (state, element) => {
        state.breadcrumbs.push(element);
    },
    SET_TITLE: (state, title) => {
        state.title = title;
    },
    REMOVE_BREADCRUMB: (state) => {
        state.breadcrumbs.splice(state.breadcrumbs.length - 1);
    },
    TOGGLE_FILTERS:(state, data) => {
        if(data) state.opened_filters = data;
        else state.opened_filters = !state.opened_filters;
    },
    ADD_MESSAGE:(state, data) => {
        state.messages.push(data);
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
};
