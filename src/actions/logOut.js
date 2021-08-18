export const LOG_OUT = "LOG_OUT";

export function LogOut(authedUser) {
  return {
    type: LOG_OUT,
    authedUser,
  };
}
