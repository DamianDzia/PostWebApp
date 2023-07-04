import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


const Rejestracja = () =>{
    const [inputs, setInputs] = useState({
        email:"",
        uzytkownik:"",
        haslo:"",
    })
const [err,bladData] = useState(null)

const nawigacja = useNavigate()

const zmiany =e =>{
    setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
}
const zmianyPot = async e=>{
    e.preventDefault()
    try{

    
        const res = await axios.post("http://localhost:8800/api/auth/rejestracja", inputs)
          console.log(res);
        nawigacja("/logowanie")
    }catch(err){
        bladData(err.response.data)

    }
}
console.log(inputs)    
    return (
        <div className="authenticate">
            <h1>Rejestracja</h1>
            <form>
               <input required type="email" placeholder="adres email" name="email" onChange={zmiany}/>
               <input required type="text" placeholder="nazwa użytkownika" name="uzytkownik" onChange={zmiany}/>
               <input required type="password" placeholder="hasło" name="haslo" onChange={zmiany}/>
               <button onClick={zmianyPot}>Zarejestruj się</button>
               {err && <p>{err}</p>}
               <span>Masz już konto? <Link to="/Logowanie">Zaloguj się</Link>
               </span> 
            </form>
            </div>
    )
}

export default Rejestracja