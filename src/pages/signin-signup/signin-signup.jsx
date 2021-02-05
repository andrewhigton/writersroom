import React from 'react';
import './signin-signup.scss';
import SignIn from '../../components/signin/signin.component';
import SignUp from '../../components/signup/signup.component';

const SignInSignUpPage = () => (
		<div className="sign-in-sign-up" to="/">
			<SignIn />
			<SignUp />		
		</div>
)

export default SignInSignUpPage;