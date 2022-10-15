// setp 1.1
import { createContext, useEffect, useReducer } from "react"
import Reducer from "./Reducer"

const initState = {
  //user: null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  FetchData: false,
  error: false,
}

export const Context = createContext(initState)

// setp 2
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initState)

  // setp 3 // login ma
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user))
  }, [state.user])

  return (
    <Context.Provider
      value={{
        user: state.user,
        FetchData: state.FetchData,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  )
}
