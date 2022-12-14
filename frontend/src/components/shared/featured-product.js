import React, { useContext } from 'react';
import { isInCart } from '../../helpers';
import { CartContext } from '../../context/cart-context';
import { useNavigate } from 'react-router-dom';
import './featured-product.styles.scss';

const FeaturedProduct = (props) => {
    const navigate = useNavigate();
    const { title, img, price, id, description } = props;
    const product = { title, img, price, id, description };
    const { addProduct, cartItems, increase } = useContext(CartContext);
    const itemInCart = isInCart(product, cartItems);
    return (
        <div className="featured-product">
            <div className="featured-image" onClick={() => navigate(`/product/${id}`)}>
                <img src={img} alt="product" />
            </div>
            <div className="name-price">
                <h3>{title}</h3>
                <p>{description}</p>
                <p>$ {price}</p>
                {
                    !itemInCart && 
                    <button className="button" onClick={() => addProduct(product)}>Add to Cart</button>
                }
                {
                    itemInCart && 
                    <button id="btn-white-outline" className="button" onClick={() => increase(product)}>Add More</button>
                }
            </div>
        </div>
    )
}

export default FeaturedProduct;