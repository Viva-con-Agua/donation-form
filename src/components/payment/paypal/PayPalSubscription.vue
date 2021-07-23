<template>
    <div id="paypal-button" class="paypal-button"></div>
</template>
<script>

let paypal = window.paypal;
let ppActions;
export default {
    props: {
        plan_id: {
            type: String,
            default: ""
        }
    },
    methods: {
        onApprove: function(data, actions) {
            var that = this
            // This function captures the funds from the transaction.
            // This function shows a transaction success message to your buyer.
            this.$emit('payment-completed', data.subscriptionID);
        },
        createSubscription: function(data, actions) {
            var that = this
            return actions.subscription.create({
                'plan_id': that.plan_id
            });
        },
        onCancel(data) {
            console.log('trigger cancel')
            this.$emit('payment-cancelled', data);
        },
        onError(err) {
            console.log('trigger error')
            console.log(err)
            this.$emit('payment-error', err);
        },
        onClick(data) {
            if(this.disabled) {
                this.$emit('payment-validation-error', data);
            } 
        },
        onInit(data, actions) {
            ppActions = actions
            this.disabled ? actions.disable() : actions.enable()
        },
    },
    watch: { 
        disabled: function(nVal) {
            if (nVal == false) {
                ppActions.enable()
            } else {
                ppActions.disable()
            }
        }
    },
    mounted() {
        paypal.Buttons({

            // Pass in the client ids to use to create your transaction
            // on sandbox and production environments
            client: this.client,

            // Pass the payment details for your transaction
            // See https://developer.paypal.com/docs/api/payments/#payment_create for the expected json parameters
            createSubscription: this.createSubscription,

            // Pass a function to be called when the customer completes the payment
            onApprove: this.onApprove,

            // Pass a function to be called when the customer completes the payment
            onAuthorize: this.onAuthorize,

            // onInit is called when the button first renders
            onInit: this.onInit,

            // Pass a function to be called when the button is clicked
            onClick: this.onClick,

            // Pass a function to be called when an error occurs
            onError: this.onError,

            // Pass a function to be called when the customer cancels the payment
            onCancel: this.onCancel,
            style: {
                color:  'blue',
                shape:  'rect',
                label:  'pay',
                size: 'responsive'
            },

        }).render('#paypal-button');
    },
};
</script>
