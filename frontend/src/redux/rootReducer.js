import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import tokenReducer from "./reducers/tokenReducer";
import { LOGOUT_USER } from "./actions/userActions";

const appReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT_USER) {
    // 로그아웃 시에만 user와 token 상태를 초기화
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
