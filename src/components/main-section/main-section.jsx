import React from 'react';
import { useNavigate } from "react-router";
import beachFront from '../../assets/florian-hahn-0N4AXNXt_3U-unsplash.jpg';
import './main-section.styles.scss';

const MainSection = () => {

    const navigate = useNavigate();

    return (
        <div className="main-section-container">
            <div className="main-section-middle">
                <div className="ms-m-image">
                    <img src={beachFront} alt="beach"/>
                </div>
                {/* <div className="ms-m-description">
                    <h2>Description</h2>
                </div> */}
                <button className="button" id="shop-now" onClick={() => navigate('/product1')}>Items</button>
            </div>
        </div>
    )
};

export default MainSection;