import React from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import './sing-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => {
    return (
        <div className="sign-in-and-sign-up">
            <SignIn className="sign-in-and-sign-up-column" />
            <SignUp className="sign-in-and-sign-up-column" />
        </div>
    );
};

export default SignInAndSignUpPage; 