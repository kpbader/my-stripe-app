import React from 'react'
import {FaShoppingCart} from 'react-icons/fa';
import './cart.styles.scss';

const Cart = () => {
    return (
        <div className="cart-container">
            <FaShoppingCart className="cart-icon"/>
            <span className="cart-count">5</span>
        </div>
    );
}

export default Cart;