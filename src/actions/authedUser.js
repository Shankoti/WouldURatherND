export const AUTHED_USER = "AUTHED_USER";

export function SetAuthedUser(authedUser) {
  return {
    type: AUTHED_USER,
    authedUser,
  };
}
