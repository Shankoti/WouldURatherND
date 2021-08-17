export const LOG_OUT = "LOG_OUT";

export function LogOut(authuser) {
  return {
    type: LOG_OUT,
    authuser,
  };
}
