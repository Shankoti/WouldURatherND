import { AUTHED_USER } from "../actions/authedUser";
import { LOG_OUT } from "../actions/logOut";
export default function authedUser(state = {}, action) {
  switch (action.type) {
    case AUTHED_USER:
      return {
        ...state,
        ...action.authedUser,
      };
    case LOG_OUT:
      return {};
    default:
      return state;
  }
}
