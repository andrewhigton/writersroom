import {
	SET_CURRENT_USER,
  	CLEAR_USER
} from './user.types';

export const setCurrentUser = user => async dispatch => {   
   	dispatch({ type: CLEAR_USER });
    dispatch({
      	type: SET_CURRENT_USER,
		payload: user
    	});
	}