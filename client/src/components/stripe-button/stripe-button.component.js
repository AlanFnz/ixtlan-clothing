import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_51HG2OoBHCiBqaYbdipS57WSrO4VzMQr3QLcPeZ3DxQfHcPD7fWCuaUP4ei9TV4gmTnIe0nsesZ9UbciDrG9vKyYF00FJdBPUEp';

  const onToken = token => {
    axios({
      url: '/payment',
      method: 'post',
      data: {
        amount: priceForStripe,
        token: token
      } 
    })
      .then(response => {
        alert('Succesful payment!');
      })
      .catch(error => {
        console.log('Payment Error: ', error);
        console.log(token);
        console.log(error);
        alert(
          'There was an issue with your payment! Please make sure you use the provided credit card.'
        );
      });
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='Ixtlan Clothing'
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