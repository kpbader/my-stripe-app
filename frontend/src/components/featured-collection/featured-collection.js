import React, { useContext } from 'react';
import { ProductsContext } from '../../context/products-context';
import FeaturedProduct from '../shared/featured-product';
import './featured-collection.styles.scss';

const FeaturedCollection = () => {
    const { products } = useContext(ProductsContext);
    const productItems = products.filter((product, i) => i < 3).map(product => (
        <FeaturedProduct {...product} key={product.id} />
    ));

    return (
        <div className="featured-collection-container">
            <h2 className="featured-section-title">Featured Gallery</h2>
            <div className="products">
                {
                    productItems
                }
            </div>
        </div>
    )
}

export default FeaturedCollection;
