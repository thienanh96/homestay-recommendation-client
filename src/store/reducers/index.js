import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import homestayReducer from './homestay'
import authReducer from './auth'
import homeReducer from './home'
import guiChangeReducer from './gui-change'
import detailHomestayReducer from './detailHomestay'
import commentsReducer from './comments'
import communityReducer from './community'
import rateHomestayReducer from './rateHomestay'
import profileReducer from './profile'

const IndexReducer = combineReducers({
  form,
  homestayReducer,
  authReducer,
  homeReducer,
  guiChangeReducer,
  detailHomestayReducer,
  commentsReducer,
  communityReducer,
  rateHomestayReducer,
  profileReducer
});

export default IndexReducer;
