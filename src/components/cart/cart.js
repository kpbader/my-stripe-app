import React, { useContext } from 'react'
import {FaShoppingCart} from 'react-icons/fa';
import { CartContext }from '../../context/cart-context';
import './cart.styles.scss';

const Cart = () => {

    const { itemCount } = useContext(CartContext);

    return (
        <div className="cart-container">
            <FaShoppingCart className="cart-icon"/>
            {
                itemCount > 0 ? <span className="cart-count">{ itemCount }</span> : null
            }

            
        </div>
    );
}

export default Cart;