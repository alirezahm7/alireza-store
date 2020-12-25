import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from './components/header/header.component';
import { GlobalStyle } from './global.styles';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import CurrentUserContext from './context/current-user/current-user.context';
import Spiner from './spiner/spiner.component';
import ErrorBoundary from './error-boundary/error-boundary.component';

const HomePage = lazy(() => import('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import('./pages/shop/shop.component'));
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'));
const SignInAndSignUpPage = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  console.log(currentUser);

  return (
    <div>
      <GlobalStyle />
      <CurrentUserContext.Provider value={{ currentUser }}>
        <Header />
      </CurrentUserContext.Provider>

      <Switch>
      <ErrorBoundary>
      <Suspense fallback={<Spiner />}>
      <Route exact path="/" component={HomePage} />
      <Route path="/shop" component={ShopPage} />
      <Route exact path="/checkout" component={CheckoutPage} />
      <Route
      exact
      path="/signin"
      render={() =>
        currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
      }
      />
      </Suspense>
      </ErrorBoundary>
      </Switch>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
