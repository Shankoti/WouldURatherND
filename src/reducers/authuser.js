import { AUTH_USER } from "../actions/authuser";
import { LOG_OUT } from "../actions/logOut";
export default function authuser(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        ...action.authuser,
      };
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}
