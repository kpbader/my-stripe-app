import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/layout';
import { CartContext } from '../../../context/cart-context';

const Success = () => {
    const { clearCart } = useContext(CartContext);
    useEffect(clearCart, []);
    const navigate = useNavigate()

    return (
        <Layout>
            <div className="checkout">
                <h1>Thank you for your order!</h1>
                <p>We are currently processing your order and will send you a confirmation email shortly after</p>
                <div>
                    <button className="button submit" onClick={() => navigate('/shop')}>Continue Shopping</button>
                </div>
            </div>
        </Layout>
    )
}

export default Success;