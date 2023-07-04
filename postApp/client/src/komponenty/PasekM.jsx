import React, { useContext } from "react"
import Logo from "../zdjecia/logo.png"
import { Link } from "react-router-dom"
import { AuthContext } from "../context/authContext";

const PasekM = () =>{

    const {currentUser, wyloguj} =  useContext(AuthContext);
    return (
        <div className="pasekmenu">
            <div className="kontener">
                <div className="logo">
                    <Link to="/">
                    <img src={Logo} alt=""/></Link>
                </div>
                <div className="linki">
                    <Link className="link" to={"/?cat=siatkowka"}><h6>Siatkówka</h6></Link>
                    <Link className="link" to={"/?cat=pilka_nozna"}><h6>Piłka Nożna</h6></Link>
                    <Link className="link" to={"/?cat=formula1"}><h6>Formuła 1</h6></Link>
                    <Link className="link" to={"/?cat=boks"}><h6>Boks</h6></Link>
                    <span>{currentUser?.uzytkownik}</span>
                    {currentUser ? <span onClick={wyloguj}>Wyloguj</span>: <Link className="link" to={"/logowanie"}>Zaloguj</Link>}
                    <span className="wczytywanie">
                        <Link className="link" to="/wczytywanie">Napisz</Link>
                        </span>
                </div>
            </div>
        </div>
    
    )
}

export default PasekM