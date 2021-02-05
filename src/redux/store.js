import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

export const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk, logger)); 

export default { store };