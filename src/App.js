import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sing-in-and-sign-up/sing-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import SignInAndSignUpPage from './pages/sing-in-and-sign-up/sing-in-and-sign-up.component';

class App extends React.Component {

  unsuscribeFromAuth = null

  componentDidMount(){
    const { setCurrentUser } = this.props;

    this.unsuscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            }); 
        });
      } else {
        setCurrentUser (userAuth);
      }
    });
  }

  componentWillUnmount(){
    this.unsuscribeFromAuth();
  }
  
  render () {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : <SignInAndSignUpPage /> } />
        </Switch>
      </div>
    );
  };
};

const mapStateToProps = ({ user }) => {
  return (
    { currentUser: user.currentUser }
  );
}

const mapDispatchToProps = dispatch => {
  return ( 
    { setCurrentUser: user => dispatch(setCurrentUser(user)) }
  )
}

export default connect(mapStateToProps, mapDispatchToProps )(App);
