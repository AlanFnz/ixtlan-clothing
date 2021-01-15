import React, { useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// Components
import Header from './components/header/header.component';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
// Styles
import { GlobalStyle } from './global.styles';
// Redux
import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
// Pages
const HomePage = lazy(() => import ('./pages/homepage/homepage.component'));
const ShopPage = lazy(() => import ('./pages/shop/shop.component'));
const Contact = lazy(() => import ('./pages/contact/contact.component'));
const SignInAndSignUpPage = lazy(() => import ('./pages/sing-in-and-sign-up/sing-in-and-sign-up.component'));
const CheckoutPage = lazy (() => import ('./pages/checkout/checkout.component'));

const App = ({ checkUserSession, currentUser }) => {

 useEffect(() => {checkUserSession()}, [checkUserSession]);
    return (
      <div>
        <GlobalStyle />
        <Header/>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
              <Route exact path="/" component={HomePage} />
              <Route path="/contact" component={Contact} />
              <Route path="/shop" component={ShopPage} />
              <Route exact path="/checkout" component={CheckoutPage} />
              <Route 
              exact 
              path="/signin" 
              render={() => currentUser ? (<Redirect to="/" />) : <SignInAndSignUpPage /> } />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
