import { 
	SET_CURRENT_USER
	} from './user.types';

const INITIAL_STATE = {
	currentUser: null,
  	loading: true
}

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.payload,
        		loading: false
			}
			default: 
				return state
		} 
	}

export default userReducer;