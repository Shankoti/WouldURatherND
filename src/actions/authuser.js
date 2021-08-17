export const AUTH_USER = "AUTH_USER";

export function SetAuthUser(authuser) {
  return {
    type: AUTH_USER,
    authuser,
  };
}
