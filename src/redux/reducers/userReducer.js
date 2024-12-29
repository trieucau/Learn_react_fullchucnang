import { LOGIN_USER, LOGOUT_USER } from "../actions/userActions";

const INITIAL_STATE = {
  account: { emai: "", auth: false },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        count: state.count + 1,
      };

    case LOGOUT_USER:
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};

export default userReducer;
