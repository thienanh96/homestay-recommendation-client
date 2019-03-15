import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import homestayReducer from './homestay'
import authReducer from './auth'
import homeReducer from './home'
import guiChangeReducer from './gui-change'
import detailHomestayReducer from './detailHomestay'

const IndexReducer = combineReducers({
  form,
  homestayReducer,
  authReducer,
  homeReducer,
  guiChangeReducer,
  detailHomestayReducer
});

export default IndexReducer;
