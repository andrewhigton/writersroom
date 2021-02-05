import { 
	GET_STORIES,
	GET_STORY,
	GET_CRITS,
	ADD_STORY,
	ADD_STORY_CRIT
	} from './stories.types';

const INITIAL_STATE = {
	story: null,
	stories: [],
	crits: [],
	loading: true
}

const storiesReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	  switch (type) {
	    case GET_STORIES:
	      return {
	        ...state,
	        stories: payload,
	        loading: false
	      };
	    case GET_STORY:
	      return {
	        ...state,
	        story: payload,
	        loading: false
	      };
	    case GET_CRITS:
	      return {
	        ...state,
	        crits: payload,
	        loading: false
	      };
	      case ADD_STORY:
	      return {
	        ...state,
	        stories: [...state.stories, payload],
	        loading: false
	      };
	      case ADD_STORY_CRIT:
	      return {
	        ...state,
	        crits: [...state.crits, payload],
	        loading: false
	      };
		default: 
			return state
	} 
}

export default storiesReducer;