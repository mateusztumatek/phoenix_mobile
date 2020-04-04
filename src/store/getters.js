const getters = {
    menu: (state) => {
        return state.app.menu;
    },
    logo: (state) => {
        return state.app.logo;
    },
    navigation: (state) => {
        return state.app.navigation
    },
    breadcrumbs: (state) => {
        return state.app.breadcrumbs
    },
    title: (state) => {
        return state.app.title;
    },
    opened_filters: (state) => {
        return state.app.opened_filters;
    },
    messages: (state) => {
        return state.app.messages;
    }
};
export default getters;