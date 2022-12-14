import React, { useContext, useState, useEffect } from 'react';
import { ProductsContext } from '../../context/products-context';
import { CartContext } from '../../context/cart-context';
import { isInCart } from '../../helpers';
import Layout from '../shared/layout';
import './single-product.styles.scss';
import { useParams, useNavigate } from 'react-router-dom';

const SingleProduct = () => {
    const { products } = useContext(ProductsContext);
    const { addProduct, cartItems, increase } = useContext(CartContext);
    const { id } = useParams();
    const navigate = useNavigate()
    const [product, setProduct] = useState(null);

    useEffect(() => {

        const product = products.find(item => Number(item.id) === Number(id));

        // if product doesn't exist, redirect to shop page 
        if (!product) {
            return navigate('/shop')
        }

        setProduct(product);
    }, [products, product, navigate, id]);

    // while we check for product
    if (!product) { return null }

    const { img, title, price, description } = product;
    const itemInCart = isInCart(product, cartItems);
    return (
        <Layout>
            <div className="single-product-container">
                <div className="product-image">
                    <img src={img} alt="product" />
                </div>
                <div className="product-details">
                    <div className="name-price">
                        <h3>{title}</h3>
                        <p>{price}</p>
                    </div>
                    <div className="add-to-cart-btns">
                        {
                            !itemInCart &&
                            <button className="button" id="btn-white-outline" onClick={() => addProduct(product)}>
                                Add to Cart
                            </button>
                        }
                        {
                            itemInCart &&
                            <button className="button is-white" id="btn-white-outline" onClick={() => increase(product)}>
                                Add More
                            </button>
                        }

                        <button className="button">
                            Proceed to Checkout
                        </button>
                    </div>
                    <div className="product-description">
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SingleProduct;