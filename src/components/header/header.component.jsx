import React, { useContext } from 'react';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';
import {
  HeaderCountainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from './header.styles';
import { userSignoutStart } from '../../redux/user/user.actions';
import CurrentUserContext from '../../context/current-user/current-user.context';
import { CartdropContext } from '../../provider/cart/cart.provider';

const Header = ({ userSignoutStart }) => {
  const currentUser = useContext(CurrentUserContext);

  const {hidden} =useContext(CartdropContext)

  return (
    <HeaderCountainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>

      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>

        <OptionLink to="/contact">CONTACT</OptionLink>

        {currentUser ? (
          <OptionLink as="div" onClick={userSignoutStart}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to="/signin">SIGN IN</OptionLink>
        )}
          <CartIcon />
       
      </OptionsContainer>

      {hidden ? null : <CartDropdown />}
    </HeaderCountainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  userSignoutStart: () => dispatch(userSignoutStart()),
});

// const mapStateToProps = createStructuredSelector({
  // currentUser: selectCurrentUser,
//   hidden: selectCartHidden,
// });

export default connect(null, mapDispatchToProps)(Header);
