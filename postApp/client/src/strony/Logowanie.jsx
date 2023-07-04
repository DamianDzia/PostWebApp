import React, { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { AuthContext } from "../context/authContext"

const Logowanie = () =>{
    const [inputs, setInputs] = useState({
        uzytkownik:"",
        haslo:"",
    })
const [err,bladData] = useState(null)

const nawigacja = useNavigate()

const {zaloguj} =  useContext(AuthContext);
//console.log(currentUser)

const zmiany =e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
}
const zmianyPot = async e=>{
    e.preventDefault()
    try{
        await zaloguj(inputs)
        //const res = await axios.post("http://localhost:8800/api/auth/logowanie", inputs,{withCredentials: true})
        //console.log(res);
        nawigacja("/")
    }catch(err){

        bladData(err.response.data)

    }
}
//console.log(inputs) 
    return (
        <div className="authenticate">
            <h1>Logowanie</h1>
            <form>
               <input required type="text" placeholder="nazwa użytkownika" name="uzytkownik" onChange={zmiany}/>
               <input required type="password" placeholder="hasło" name="haslo" onChange={zmiany}/>
               <button onClick={zmianyPot}>Zaloguj</button>
               {err && <p>{err}</p>}
               <span>Nie masz konta? <Link to="/Rejestracja">Zarejestruj się</Link>
               </span> 
            </form>
            </div>
    )
}

export default Logowanie