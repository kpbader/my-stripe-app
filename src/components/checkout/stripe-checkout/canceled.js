import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../shared/layout';

const Canceled = () => {

    const navigate = useNavigate();

    return(
        <Layout>
            <div className="checkout">
                <h1>Payment Failed</h1>
                <p>Payment was not successful</p>
                <div>
                    <button className="button submit" onClick={() => navigate('/shop')}>Continue Shopping</button>
                </div>
            </div>
        </Layout>
    )
}

export default Canceled;