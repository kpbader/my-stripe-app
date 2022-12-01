import React, { useContext } from 'react'
import {FaShoppingCart} from 'react-icons/fa';
import { CartContext }from '../../context/cart-context';
import { useNavigate } from 'react-router-dom';
import './cart.styles.scss';

const Cart = () => {
    const navigate = useNavigate();
    const { itemCount, cartItems } = useContext(CartContext);

    return (
        <div className="cart-container" onClick={() => navigate('/cart')}>
            <FaShoppingCart className="cart-icon"/>
            {
                itemCount > 0 ? <span className="cart-count">{ itemCount }</span> : null
            }

            
        </div>
    );
}

export default Cart;