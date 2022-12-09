import "./hero.styles.scss";
import React from "react";
import './hero.styles.scss';
import { useNavigate } from 'react-router-dom';

const Hero = () => {

  const nav = useNavigate();

  return (
    <section className="hero is-large is-info hero-image">
      <div className="hero-body">
        <div className="container">
          {/* <h1 className="title">Modern Printmaking</h1> */}
          <div className="shop-now-btn">
              <button className="button" id="shop-now" onClick={() => nav('/shop')}>SHOP NOW</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;