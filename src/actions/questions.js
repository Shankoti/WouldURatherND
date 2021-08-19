import { saveQuestion } from "../util/api";
import { AddQtoUser } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
export function addQustion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleaddQustion(optionOneText, optionTwoText, author) {
  return async (dispatch) => {
    //use Api function to format the Questuion
    const question_1 = await saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    });
    dispatch(addQustion(question_1));
    dispatch(AddQtoUser(question_1));
  };
}
export function handleQanswer() {}
