import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/index';
import { UserContext } from '../../context/user-context';
import './header.styles.scss';
import Cart from '../cart/cart';

const Header = () => {
    const { user } = useContext(UserContext);
    console.log('user', user)
    return (
        <nav className="nav-menu container">
            <div className="logo">
                <Link to="/">Stripe App</Link>
            </div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/shop">Shop</Link>
                </li>
                {
                    !user &&
                    <li>
                        <Link to="/sign-in">
                            Sign In
                        </Link>
                    </li>
                }
                {
                    user &&
                    <li onClick={() => auth.signOut()}>
                        Sign Out
                    </li>
                }
                {
                    !user &&
                    <li>
                        <Link to="/sign-up">
                            Sign Up
                        </Link>
                    </li>
                }
            </ul>
            <Cart />
        </nav>
    );
}

export default Header;