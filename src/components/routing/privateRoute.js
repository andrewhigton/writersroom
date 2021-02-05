import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ 
	component: Component, 
	auth: { currentUser, loading }, 
	...rest 
	}) => (
	<Route 
	{...rest} 
		render={props => 
		!currentUser && !loading ? (  
		<Redirect to='/login' />
		) : (
		<Component {...props} />
		)	
	}
	/>
);

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.user
});

export default connect(mapStateToProps)(PrivateRoute);