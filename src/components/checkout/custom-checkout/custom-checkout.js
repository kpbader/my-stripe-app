import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { fetchFromAPI } from '../../../helpers';

const CustomCheckout= ( { shipping, cartItems }) => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    useEffect(() => {
        const items = cartItems.map(item => ({ price: item.price, quantity: item.quantity }));
        if (shipping) {
            const body = {
                cartItems: items,
                shipping: {
                    name: shipping.name,
                    address: {
                        line1: shipping.address
                    }
                },
                description: 'payment intent for shop',
                receipt_email: shipping.email,
            }

            const customCheckout = async () => {
                const { clientSecret } = await fetchFromAPI('create-payment-intent', { 
                    body
                });

                setClientSecret(clientSecret);
            }

            customCheckout();
        }
    }, [shipping, cartItems]);

    const handleCheckout = async () => {
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement)
            }
        });

        if (payload.error) {
            setError(`Payment Failed: ${payload.error.message}`);
        } else {
            navigate('/success');
        }
    }

    const cardHandleChange = event => {
        const { error } = event; 
        // if error is there, error message will display, if not, it will be an empty display  
        setError(error ? error.message: '')
    }

    const cardStyle = {
        style: {
            base: {
                color: "#000", 
                fontFamily: "Copperplate", 
                fontSize: "16px", 
                "::placeholder": {
                    color: "#606060",
                },
            },
            invalid: {
                color: "#fa755a", 
                iconColor: "fa755a"
            }
        }
    };

    return (
        <div>
            <h4>Enter payment details</h4>
            <div className="stripe-card">
                <CardNumberElement 
                    className="card-element" 
                    options={cardStyle} 
                    onChange={cardHandleChange}
                />
            </div>
            <div className="stripe-card">
                <CardExpiryElement
                    className="card-element" 
                    options={cardStyle} 
                    onChange={cardHandleChange}
                />
            </div>
            <div className="stripe-card">
                <CardCvcElement
                    className="card-element" 
                    options={cardStyle} 
                    onChange={cardHandleChange}
                />
            </div>
            <div className="submit-btn">
                <button
                    disabled={processing}
                    className="button submit"
                    onClick={() => handleCheckout()} 
                >
                    {
                        processing ? 'Processing' : 'Pay'
                    }
                </button>
            </div>
            { 
                error && (<p className="error-message">{error}</p>)
            }
        </div>
    )
}

export default CustomCheckout;