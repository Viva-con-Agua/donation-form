<template>
     <div class="success-view">

        <vca-field>
            <img class="thank-you" src="@/assets/thank_you.png"/><br/>

            <div class="thank-you-text">
                Danke, dass du unsere <br/>Projektarbeit unterstützt!
            </div>
            <div class="thank-you-text-sub">
                Mit deinem Mitgliedsbeitrag von {{ getAmount }} {{ getCurrency }} hilfst du uns dabei, Menschen weltweit den Zugang<br/>zu sauberem Trinkwasser und sanitärer Grundversorgung zu ermöglichen.
            </div>
        </vca-field>            

        <vca-field label="So geht es weiter">
            <div class="thank-you-next">
                <div class="next-steps">
                    <strong>Du bekommst von uns automatisch:</strong>
                    <ul>
                        <li>Eine Bestätigung deiner Mitgliedschaft per E-Mail</li>
                        <li>Eine Spendenbescheinigung im Januar des Folgejahres</li>
                    </ul>
                </div>
            </div>
        </vca-field>
    </div>
 </template> 

<script>
export default {
    name: 'StepThanks',
    props: ['payment'],
    computed: {
        getAmount() {
            return this.payment.money.amount / 100
        },
        getCurrency() {
            switch(this.payment.money.currency) {
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
.next-steps {
    text-align: left;

    flex-grow: 2; 
    padding: 2em 7em;
}

.next-steps ul {
    list-style: none;
}

.next-steps ul li:before {
    content: '✓';
}

.thank-you {
    width: 100%;
}

.thank-you-text {
    color: #008fc2;
    font-size: 3em;
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1em;
    text-align: center; 
    
    margin: 1em 0;
}

.thank-you-text-sub {
    font-size: 1.2em;
    text-align: center; 
}

.thank-you-next {
    display: flex; 
    flex-direction: row;
}

/*********************
*** SCREEN 600 PX ***
**********************/

@media only screen and (max-width: 600px) {

    .next-steps strong {
        font-size: .9em;
    }

    .thank-you-text {
        font-size: 1rem;
    }

    .next-steps ul,
    .thank-you-text-sub {
        font-size: .8em;
    }
    .next-steps {
        padding: 0px;
        text-align: center;
    }

    .next-steps ul {
        text-align: left;
        padding-left: 5px;
    }
}

</style>
