import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import onClickOutside from "react-onclickoutside";
// Components
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';
// Style
import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => {
    CartDropdown.handleClickOutside = () => dispatch(toggleCartHidden());

    return (
        <div className="cart-dropdown">
            <div className='cart-close' onClick={() => {
                dispatch(toggleCartHidden());
                    }
                }>x</div>
            <div className='cart-items'>
                {
                    cartItems.length ? 
                    cartItems.map(cartItem => {
                        return (
                            <CartItem key={cartItem.id} item={cartItem} />
                        ); 
                    })
                    :
                    <span className="empty-message">Your cart is empty</span>
                }
            </div>
            <CustomButton onClick={() => {
                history.push('/checkout')
                dispatch(toggleCartHidden());
                    }
                }>GO TO CHECK OUT</CustomButton>
        </div> 
    );
}

const clickOutsideConfig = {
    handleClickOutside: () => CartDropdown.handleClickOutside
};

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
})

export default onClickOutside(withRouter(connect(mapStateToProps)(CartDropdown)), clickOutsideConfig);