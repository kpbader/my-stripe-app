import React from 'react';
import './featured-product.styles.scss';

const FeaturedProduct = (product) => {

    const { title, img, price } = product;

    return (
        <div className="featured-product">
            <div className="featured-image">
                <img src={img} alt="product" />
            </div>
            <div className="name-price">
                <h3>{title}</h3>
                <p>$ {price}</p>
                <button className="button">Add to Cart</button>
            </div>
        </div>
    )
}

export default FeaturedProduct;