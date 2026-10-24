// throw httpError(409, "Email already registered")
export function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}
