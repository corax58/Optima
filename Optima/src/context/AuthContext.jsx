import { createContext, useReducer, useEffect } from "react";

export const AuthContext =  createContext();


export const authReducer = (state, action)=>{

    switch(action.type){
        case 'Login':
            return {user:action.payload}
        case 'Logout':
            return {user:null}
        default :
        return state;
    }
}

export const AuthContextProvider =({children})=>{
const [state,dispatch]= useReducer(authReducer)

useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
        dispatch({type:'Login', payload:user})
    }
},[])

return(
    <AuthContext.Provider value={{...state,dispatch}}>
{children}
    </AuthContext.Provider>
)

}

