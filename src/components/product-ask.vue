<template>
    <div>
        <v-dialog class="ask-dialog" v-model="active" width="90%">
            <v-card v-if="product">
                <v-card-title style="font-size: 1.1rem">Zapytaj o {{product.name}}
                    <v-spacer></v-spacer>
                    <v-btn icon small @click="active = false"><v-icon>mdi-close</v-icon></v-btn>
                </v-card-title>
                <v-card-text>
                    <div v-if="sended">
                        <h2 style="font-size: 1.2rem" class="my-5">Dziękuję za wysłanie wiadomości</h2>
                        <p>Skontaktuje się z Tobą jak najszybciej na adres: {{message.email}}</p>
                    </div>
                    <v-form v-else ref="ask_form">
                        <!--<v-switch v-model="message.order" label="Złożyć zamówienie"></v-switch>
                        <transition name="slide-down">
                            <div v-if="message.order">
                                <v-text-field :rules="[rules.required]" outlined label="Miasto" v-model="message.city"></v-text-field>
                                <v-text-field :rules="[rules.required]" outlined label="Kod pocztowy" v-model="message.postal"></v-text-field>
                                <v-text-field :rules="[rules.required]" outlined label="Ulica i numer domu" v-model="message.street"></v-text-field>
                                <v-alert color="primary" dark>Po złożeniu zamówienia skontaktuję się z Tobą, .</v-alert>
                            </div>
                        </transition>-->
                        <v-textarea :rules="[rules.required]" outlined label="Wpisz treść wiadomości" v-model="message.text"></v-textarea>
                        <v-text-field :rules="[rules.required, rules.email]" outlined label="Twój adres email" hint="Na ten adres email wyślę wiadomość zwrotną." v-model="message.email"></v-text-field>
                        <v-btn @click="send()" color="primary" depressed style="width: 100%">Wyslij zapytanie</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    import {order} from "../api/app";

    export default {
        data:() => {
            return{
                rules:{
                  required: v => !!v || 'Ten element jest wymagany',
                  email: v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                },
                active: false,
                product: null,
                loading: false,
                sended: false,
                message: {},
            }
        },
        mounted() {
            this.$root.$eventBus.$on('product', (data) => {
                this.product = data;
                this.predefined = [];
                this.active = true;
            })
        },
        methods:{
            send(){
                if(this.$refs.ask_form.validate()){
                    this.loading = true;
                    var data = {...this.message, product_id: this.product.id};
                    order(data).then(response => {
                        this.loading = false;
                        this.sended = true;
                        setTimeout(() => {
                            this.active = false;
                        }, 5000)
                    })
                }
            }
        }
    }
</script>
<style lang="scss">

</style>