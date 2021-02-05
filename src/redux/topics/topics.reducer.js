import { 
	GET_TOPICS,
	GET_TOPIC,
	ADD_TOPIC,
	ADD_TOPIC_COMMENT,
	CLEAR_TOPICS,
	GET_TOPIC_COMMENTS
	} from './topics.types';

const INITIAL_STATE = {
	topic: null,
	topics: [],
	comments: [],
	loading: true
}

const topicsReducer = (state = INITIAL_STATE, action) => {
	// console.log(action)
	const { type, payload } = action;
	  switch (type) {
	    case GET_TOPICS:
	      return {
	        ...state,
	        topics: payload,
	        loading: false
	      };
	    case GET_TOPIC:
	      return {
	        ...state,
	        topic: payload,
	        loading: false
	      };
	    case GET_TOPIC_COMMENTS:
	      return {
	        ...state,
	        comments: payload,
	        loading: false
	      };
	    case CLEAR_TOPICS:
			return {
				...state,
				topic: null,
				topics: [],
				comments: [],
				loading: false
				
			};
	    case ADD_TOPIC:
	      return {
	        ...state,
	        topic: [payload, ...state.topics],
	        isFetching: false
	      };  
	    case ADD_TOPIC_COMMENT:
	    // its because you're not fetching from firebase
	    // also, you're not persisting state 
	      return {
	        ...state,
	        comments: [...state.comments, payload],
	        // topic: payload
	        isFetching: false
	      };  
		default: 
			return state
	} 
}

export default topicsReducer;