var stripe = Stripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
var elements = stripe.elements();
var style = {
  base: {
    color: '#32325d',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    },
    ':-webkit-autofill': {
      color: '#32325d',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
    ':-webkit-autofill': {
      color: '#fa755a',
    },
  },
};

var options = {
  style: style,
  supportedCountries: ['SEPA'],
  // Elements can use a placeholder as an example IBAN that reflects
  // the IBAN format of your customer's country. If you know your
  // customer's country, we recommend that you pass it to the Element as the
  // placeholderCountry.
  placeholderCountry: 'DE',
};

// Create an instance of the IBAN Element
var iban = elements.create('iban', options);

// Add an instance of the IBAN Element into the `iban-element` <div>
iban.mount('#iban-element');
