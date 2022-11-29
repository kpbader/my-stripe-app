import React, { useContext, useState, useEffect } from 'react';
import { ProductsContext } from '../../context/products.context';
import { useNavigate } from "react-router";
import Layout from '../shared/layout';
import './single-product.styles.scss';

const SingleProduct = ({ match, history: { push } }) => {
    const navigate = useNavigate();
    const { products } = useContext(ProductsContext);
    const { id } = match.params;
    const [product, setProduct] = useState(null); 
    useEffect(() => {
        const product = products.find(item => Number(item.id) === Number(id));

        // if product doesn't exist, redirect to shop page 
        if (!product) {
            return push('/shop')
        }

        setProduct(product);
    });

    // while we check for product
    if (!product) { return null }

    const { img, title, price, description } = product;
    return (
        <Layout>
            <div className="single-product-container">
                <div className="product-image">
                    <img src={img} alt="product"/>
                </div>
                <div className="product-details">
                    <div className="name-price">
                        <h3>{title}</h3>
                        <p>{price}</p>
                    </div>
                    <div className="add-to-cart-btns">
                        <button className="button" id="btn-white-outline">
                            Add to Cart
                        </button>
                        <button className="button"> 
                            Checkout
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