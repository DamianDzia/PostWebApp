import { createContext, useEffect, useState } from "react";
import axios from "axios";



export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("uzytkownik")) || null);

   const zaloguj = async(inputs)=>{
       const res = await axios.post("http://localhost:8800/api/auth/logowanie", inputs,{withCredentials: true});
       setCurrentUser(res.data);
       
    };
    

    const wyloguj = async()=>{
        const res = await axios.post("http://localhost:8800/api/auth/wyloguj");
        setCurrentUser(null);
     };
    useEffect(()=>{
        localStorage.setItem("uzytkownik",JSON.stringify(currentUser));

    }, [currentUser]);
    return(
        <AuthContext.Provider value={{currentUser,zaloguj,wyloguj}}>
            {children}
            </AuthContext.Provider>
    );
};
