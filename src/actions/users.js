import { AddAnswerQ } from "./questions";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_QUESTION_TO_USER = "ADD_QUESTION_TO_USER";
export const ADD_ANSWER_TO_USER = "ADD_ANSWER_TO_USER";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function AddQtoUser({ id, author }) {
  return {
    type: ADD_QUESTION_TO_USER,
    id,
    author,
  };
}

export function AddAnswer(authedUser, qid, answer) {
  return {
    type: ADD_ANSWER_TO_USER,
    authedUser,
    qid,
    answer,
  };
}
export function handleQanswer(authUser, qid, answer) {
  return (dispatch) => {
    dispatch(AddAnswer(authUser, qid, answer));
    dispatch(AddAnswerQ(authUser, qid, answer));
  };
}
