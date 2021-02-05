import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import topicsReducer from './topics/topics.reducer';
import storiesReducer from './stories/stories.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user', 'topics', 'stories']
}

const rootReducer = combineReducers({
	user: userReducer,
	topics: topicsReducer,
	stories: storiesReducer
});

export default persistReducer(persistConfig, rootReducer);