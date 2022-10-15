// setp 1.1
export const LoginStart = (userCredn) => ({
  type: "LOGINSTART",
})
export const LoginSucc = (user) => ({
  type: "LOGINSUCC",
  payload: user,
})
export const LoginFailure = () => ({
  type: "LOGINFAILED",
})

// logout
export const Logout = () => ({
  type: "LOGOUT",
})

// last
export const updateStart = (userCredn) => ({
  type: "UPDATE_START",
})
export const updateSucc = (user) => ({
  type: "UPDATE_SUCC",
  payload: user,
})
export const updateFailure = () => ({
  type: "UPDATE_FAILED",
})
