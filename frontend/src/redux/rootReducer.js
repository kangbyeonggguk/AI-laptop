import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import tokenReducer from "./reducers/tokenReducer";

const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

export default rootReducer;
