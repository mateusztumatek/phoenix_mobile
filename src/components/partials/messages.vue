<template>
    <div class="messages">
        <v-alert style="width: 90%" :type="message.type" v-for="message in messages" dismissible>{{message.text}}</v-alert>
    </div>
</template>
<script>
    export default {
        computed:{
            messages(){
                return this.$store.getters['app/messages'];
            }
        }
    }
</script>
<style lang="scss">
    .messages{
        display: flex;
        justify-content: center;
        width: 100%;
        position: fixed;
        z-index: 100;
        left: 0px;
        bottom: 10vh;
    }
</style>