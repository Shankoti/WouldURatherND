import { combineReducers } from "redux";
import users from "./users";
import questions from "./questions";
import authuser from "./authuser";

export default combineReducers({
  users,
  questions,
  authuser,
});
