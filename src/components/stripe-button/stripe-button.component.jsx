import axios from 'axios';
import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HvPrKDF48UQcR88mZOUtThFzAJSgZu6VkJwDjguMq6AkGTLCiYtDYefutwVTvPmCkkLyFqC6eDUIrYOoc2k4eEI00oNJzbplx';
  

  const onToken = token => {
   axios({
    url:'payment',
    method:'post',
    data:{
      amount:priceForStripe,
      token
    }
   }).then(response=>{
     alert('succeseful payment')
   }).catch(error=>{
     console.log(' payment error ' ,error);
     alert('there was an isuue with your payment ,please make sure you use provided credit cart')
   })
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
