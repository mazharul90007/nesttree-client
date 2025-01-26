import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";

//TODO:have to add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
    const location = useLocation();
    const property = location.state?.property;
    // console.log(property)
    return (
        <div>
            <h3>Make Your Payment</h3>
            <div className="md:w-96 my-6 p-4 border border-amber-400 bg-amber-50 rounded-md">
                <Elements stripe={stripePromise}>
                    <CheckoutForm property={property}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;