import React, { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import typewriter from '../../assets/typewriter.png'; 
import hamburger from '../../assets/hamburger.png'; 
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { connect } from 'react-redux';
import './header.scss';
import '../../App.css';

const Header = ({ currentUser, loading }) => {  

    const history = useHistory();
    const [isActive, setisActive] = useState(false);

    function toggleActive() {
        setisActive(!isActive)
    } 
    
    function signOut() {
        auth.signOut();
        history.push('/');
    }
    
    return (  
    <Fragment>
      <div className="header"> 
    	<div className={`${isActive ? 'closebtn' : 'no-button'}`}
        onClick={() => toggleActive()}>
            <p>x</p>
        </div>
        <div className="header-left">
            <Link className="" to="/">
                <img className="logo" alt="" src={typewriter}/>
            </Link>     
    		<h1>The Writer's Room</h1>
        </div>     
       
        
    	 { !currentUser || loading ? 
        
            <Fragment>
            <div className="header-right">    
            <Link className={`option ${isActive ? 'side-links login-side' : 'top-links login'}`}
                to="/login">
                Login
            </Link>
            <Link 
            className={`${isActive ? 'side-links register-side' : 'top-links register'}`}
            to="/register">
                Register
            </Link>
            </div>
            </Fragment>    
            :
            <div className="header-right">    
            <div 
            className={`'option' ${isActive ? 'side-links sign-out' : 'top-links'}`}
            onClick={ signOut }>Sign out
            </div>
            </div>     
        } 
        <div className={`${isActive ? 'navSlider' : 'logo-right'}`}> 
            <img 
            className={`${isActive ? 'hamburger-off' : 'hamburger'}`}
            alt=""
            src={hamburger}
            onClick={() => toggleActive()}
            />
        </div>
        </div> 
    </Fragment>
    );
}

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state)
});

export default connect(mapStateToProps)(Header);