import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { fetchFromAPI } from '../../../helpers';
import { UserContext } from '../../../context/user-context';

const CustomCheckout = ({ shipping, cartItems }) => {
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [clientSecret, setClientSecret] = useState();
    const [cards, setCards] = useState(null);
    const [payment, setPaymentCard] = useState('');
    const [saveCard, setSavedCard] = useState(false);
    const [paymentIntentId, setPaymentIntentId] = useState(null);
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { user } = useContext(UserContext)

    useEffect(() => {
        const items = cartItems.map(item => ({price: item.price, quantity: item.quantity}));
        if (user) {
          const savedCards = async () => {
            try {
              const cardsList = await fetchFromAPI('get-payment-methods', {
                method: 'GET',
              }); 
              setCards(cardsList);
            } catch(error) {
              console.log(error);
            }
          }
          savedCards();
        }
    
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
            const { clientSecret, id } = await fetchFromAPI('create-payment-intent', {
              body
            });
    
            setClientSecret(clientSecret)
            setPaymentIntentId(id);
          }
    
          customCheckout();
        }
      }, [shipping, cartItems, user]);

    const handleCheckout = async () => {
        setProcessing(true);

        let si;
        // check if user has selected to save card 
        if (saveCard) {
            // make to create a setup intent 
            si = await fetchFromAPI('save-payment-method');
        }

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement)
            }
        });

        if (payload.error) {
            setError(`Payment Failed: ${payload.error.message}`);
        } else {
            if (saveCard && si) {
                // send customer's card details to be saved with Stripe 
                await stripe.confirmCardSetup(si.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement)
                    }
                });
                navigate('/success');
            } else {
                navigate('/success');
            }
        }
    }

    const savedCardCheckout = async () => {
        setProcessing(true);
        // update the payment intent to include the customer paramter
        const { clientSecret } = await fetchFromAPI('update-payment-intent', {
            body: { paymentIntentId }, method: 'PUT',
        });

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: payment
        });

        if (payload.error) {
            setError(`Payment Failed: ${payload.error.message}`)
            setProcessing(false);
        } else {
            navigate('/success');
        }

    }

    const cardHandleChange = event => {
        const { error } = event;
        // if error is there, error message will display, if not, it will be an empty display  
        setError(error ? error.message : '')
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

    let cardOption;

    if (cards) {
        cardOption = cards.map(card => {
            const { card: { brand, last4, exp_month, exp_year } } = card;
            return (
                <option key={card.id} value={card.id}>
                    {`${brand}/ **** **** **** ${last4} ${exp_month}/${exp_year}`}
                </option>
            );
        });
        cardOption.unshift(
            <option key="Select a card" value=''>
                Select a card
            </option>
        )
    }

    return (
        <div>
            {
                user && (cards && cards.length > 0) && // there is a user with at least one card 
                <div>
                    <h4>Pay with saved card</h4>
                    <select value={payment} onChange={e => setPaymentCard(e.target.value)}>
                        {cardOption}
                    </select>
                    <button
                        type='submit'
                        disabled={processing || !payment}
                        className='button submit saved-card-btn'
                        onClick={() => savedCardCheckout()}
                    >
                    {
                        processing ? 'Processing' : 'Pay with saved card'
                    }
                    </button>
                </div>
            }
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
            {
                user &&
                <div className="save-card">
                    <label>Save Card</label>
                    <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={e => setSavedCard(e.target.checked)}
                    />
                </div>
            }
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