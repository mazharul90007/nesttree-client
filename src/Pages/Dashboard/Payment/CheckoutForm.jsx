import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import PropTypes from "prop-types";

const CheckoutForm = ({ property }) => {
    console.log(property)
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const { amount, user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (amount > 0) {
            axiosSecure.post('create-payment-intent', { price: amount })
                .then(res => {
                    // console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('Payment error', error);
            setError(error.message);
        } else {
            console.log('PaymentMethod', paymentMethod);
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            // console.log(confirmError);
        } else {
            console.log('Payment Intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                console.log('Transaction ID:', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                //Save payment in the database (if needed)
                const payment = {
                    buyerEmail: property.buyerEmail,
                    buyerName: property.buyerName,
                    price: amount,
                    buyingDate: new Date(),
                    transactionId: paymentIntent.id,
                    buyingPropertyId: property.propertyId,
                    agentEmail: property.agentEmail,
                    agentName: property.agentName,
                    propertyLocation: property.location,
                    propertyImage: property.propertyImage,
                    propertyTitle: property.title,
                    status: 'pending'
                };
                const res = await axiosSecure.post('/payments', payment);
                console.log('Payment Saved', res.data)

            }
        }
    };

    return (
        <div>
            {transactionId ? (
                <div className="mt-10">
                    <span className="inline-block px-3 py-1 text-white bg-green-600 rounded-md">
                        Bought
                    </span>
                    <p className="mt-2 text-green-600">
                        Your Transaction ID: <span className="font-bold">{transactionId}</span>
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                    <button
                        className="py-1 px-2 border border-amber-500 bg-green-100 text-amber-700 rounded-md hover:scale-95 transition-transform transform font-semibold mt-20"
                        type="submit"
                        disabled={!stripe || !clientSecret}
                    >
                        Pay
                    </button>
                    <p className="text-red-600">{error}</p>
                </form>
            )}
        </div>
    );
};

export default CheckoutForm;

CheckoutForm.propTypes = {
    property: PropTypes.object
}
