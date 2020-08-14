import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HG2OoBHCiBqaYbdipS57WSrO4VzMQr3QLcPeZ3DxQfHcPD7fWCuaUP4ei9TV4gmTnIe0nsesZ9UbciDrG9vKyYF00FJdBPUEp'
    
    const onToken = token => {
        console.log(token);
        alert('Payment Succesful');
    }

    return (
        <StripeCheckout 
            label="Pay now"
            name="Arkhe Clothing"
            billingAddress
            shippingAddress
            image="https://svgshare.com/i/CUz.svg"
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel="Pay now"
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;