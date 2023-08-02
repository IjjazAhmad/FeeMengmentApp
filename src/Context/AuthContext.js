import React, { createContext, useContext, useEffect, useReducer } from 'react'
const AuthContext = createContext();
const initialState = { isAuth: false, user: {} }    
const reducer = (state, {type,payload })=>{
switch(type){
  case "SET_LOGGED_IN":
    return{isAuth: true, user: payload.user}
  case "SET_LOGGED_OUT":
    return initialState
  default:
    return state
}
}
export default function AuthContextProvider({children}) {
  const [state, dispatch] = useReducer(reducer,initialState)
  useEffect(()=>{
    let user =JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"SET_LOGED_IN", payload: {user}})
    }
  },[])
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
    {children}
</AuthContext.Provider>
  )
}


export const useAuthContext=()=>useContext(AuthContext);