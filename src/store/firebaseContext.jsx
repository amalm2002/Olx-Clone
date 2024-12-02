import { createContext, useState } from "react";

export const firbaseContext=createContext(null)

export const AuthContext=createContext(null)

const Context=({children})=> {
    const [user,setUser] =useState(null)

    return (
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default  Context