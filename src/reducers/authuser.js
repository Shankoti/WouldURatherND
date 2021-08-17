import { AUTH_USER } from "../actions/authuser";
export default function authuser(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        ...action.authuser,
      };
    default:
      return state;
  }
}
