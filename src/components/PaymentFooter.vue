<template>
    <div class="payment-footer">
        <div class="payment-footer-text">Danke, dass du unsere Projekte für sauberes Trinkwasser mit {{ getAmount }} {{ getCurrency }} {{ getInterval }} unterstützen möchtest!</div>
        <div class="payment-footer-image"><img src="~@/assets/thank_you_small.png" /></div>
    </div>

</template>
<script>

export default {
    name: 'PaymentFooter',
    props: {
        money: {
            type: Object,
            default: function () {
                return {
                    "amount": 1312,
                    "currency": "EUR"
                }
            }
        },
        interval: {
            type: String,
            default: 'month'
        }
    },
    computed: {
        getInterval() {
            return (this.interval == 'month') ? 'monatlich' : 'jährlich'
        },
        getAmount() {
            return this.money.amount / 100
        },
        getCurrency() {
            switch(this.money.currency) {
                case 'CHF':
                    return 'Schweizer Franken'
                default:
                    return 'Euro'
            }
        }
    }
}
</script>
<style type="text/css">

.payment-footer {
    color: white;
    background-color: #008fc2;

    vertical-align: middle;
    display: flex;
}

.payment-footer-text {
    font-size: 1.6em;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1.3;

    margin: auto 20px auto 50px;
    padding: 10px 0;
}

.payment-footer-image img {
    margin: auto;
    width: inherit;
}

.payment-footer-image {
    display: flex;
    margin-right: 50px;
}

/*********************
*** SCREEN 1000 PX ***
**********************/

@media only screen and (max-width: 1000px) {

    .payment-footer-text {
        font-size: 1.4em;
    }

}

/*********************
*** SCREEN 800 PX ***
**********************/

@media only screen and (max-width: 800px) {

    .payment-footer-text {
        font-size: 1.1em;
    }

}

/*********************
*** SCREEN 600 PX ***
**********************/

@media only screen and (max-width: 600px) {

    .payment-footer {
        flex-wrap: wrap;
    }
    .payment-footer-text {
        font-size: 1em;
        text-align: center;
        margin: 10px;
        padding: 0;
    }

    .payment-footer-image {
        width: 100%;
        margin: 0 0 10px 0;
    }

    .payment-footer-image img {
        margin: 0 auto !important;
    }

}

</style>