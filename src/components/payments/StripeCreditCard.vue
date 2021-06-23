<template>
    <div class="stripe-payment-container">
        <div class="vca-input-border"><div id="card-element" ref="card" class="stripe-payment"></div></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            stripeAPIToken: process.env.VUE_APP_STRIPE_PUBLIC_KEY,

            stripe: '',
            elements: '',
            card: ''
        }
    },

    mounted(){
        this.includeStripe('js.stripe.com/v3/', function(){
            this.configureStripe();
        }.bind(this) );
    },

    methods: {
        /*
           Includes Stripe.js dynamically
         */
                 includeStripe( URL, callback ){
                     let documentTag = document, tag = 'script',
                     object = documentTag.createElement(tag),
                     scriptTag = documentTag.getElementsByTagName(tag)[0];
                     object.src = '//' + URL;
                     if (callback) { object.addEventListener('load', function (e) { callback(null, e); }, false); }
                     scriptTag.parentNode.insertBefore(object, scriptTag);
                 },

        /*
           Configures Stripe by setting up the elements and 
           creating the card element.
         */
                 configureStripe(){
                     this.stripe = window.Stripe( this.stripeAPIToken );

        this.elements = this.stripe.elements();
        this.card = this.elements.create('card');

        this.card.mount(this.$refs.card);
    },
}
    }
</script>
