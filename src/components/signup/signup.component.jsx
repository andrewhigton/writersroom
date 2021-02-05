import React from 'react';
import { Redirect } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'; 
import './signup.scss';

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
      redirectToReferrer: false
    };
  }  

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;
    // const history = useHistory();
    
    if(password !== confirmPassword) {
      alert("passwords don't match");
      return;
      }
    
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      
    await createUserProfileDocument(user, { displayName });  
     this.setState({      
            redirectToReferrer: true
        })    
    //setCurrentUser(user)

    // this.setState({
    //     displayName: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: ''
    //   });
    // history.push('/');
    } catch (error) {
      console.error(error);
      }
    }
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
  };

  render() {
    const { displayName, email, password, confirmPassword, redirectToReferrer } = this.state;
    
        if (redirectToReferrer === true) {
            return <Redirect to="/" />
        }

    return (
      <div className='sign-up form'>
      <h2 className='title'>I do not have an account</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={this.handleSubmit}>
        <FormInput
        type='text'
        name='displayName'
        value={displayName}
        onChange={this.handleChange}
        label='Display Name'
        required
        />
        <FormInput
        type='email'
        name='email'
        value={email}
        onChange={this.handleChange}
        label='Email'
        required
        />
        <FormInput 
        type='password'
        name='password'
        value={password}
        onChange={this.handleChange}
        label='Password'
        required
        />
        <FormInput 
        type='password'
        name='confirmPassword'
        value={confirmPassword}
        onChange={this.handleChange}
        label='confirmPassword'
        required
        />    
        <CustomButton type='submit'>SIGN UP</CustomButton> 
        </form>
      </div>
        )
      }
    };

export default SignUp;