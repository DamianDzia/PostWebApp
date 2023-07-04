import React, { useContext, useEffect, useState } from "react"
import Edcycja from "../zdjecia/edcjaikona.png"
import Usun from "../zdjecia/usunikona.png"
import { Link, useLocation, useNavigate} from "react-router-dom"
import Menu from "../komponenty/Menu";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import axios from "axios";

const Autor = () =>{
    const [post,setPost] = useState({});

    const location = useLocation()

    const nawiguj = useNavigate()

    //console.log(location)
    const postId  = location.pathname.split("/")[2]
    
    const {currentUser} = useContext(AuthContext)

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res  = await axios.get(`http://localhost:8800/api/posty/${postId}`);
                setPost(res.data);

            }catch (err){
                console.log(err);
            }

        };
        fetchData();
    },[postId]);

    const handleDelete = async ()=>{
        try{
            await axios.delete(`http://localhost:8800/api/posty/${postId}`,{withCredentials: true});
            nawiguj("/")
        }catch (err){
            console.log(err);
        }
    }
    
    const getTekst = (html) =>{
        const doc = new DOMParser().parseFromString(html,"text/html")
        return doc.body.textContent
    }
    return (
        
        <div className="autor">
            <div className="content">
                <img src={`../uploads/${post?.zdjecie}`} alt="" />
            <div className="user">
                {post.uzytZdj && <img src={post.uzytZdj} alt=""/>}
            <div className="info">
                <span>{post.uzytkownik}</span>
                <p>Dodano {moment(post.data).fromNow()} </p>
            </div>
            {currentUser.uzytkownik === post.uzytkownik && <div className="edycja">
            <Link to={`/wczytywanie?edycja=2`} state={post}>
            <img src={Edcycja} alt=""/>
            </Link>
            <img onClick={handleDelete} src={Usun} alt=""/>
            </div>
            }

            </div>
            <h1>{post.tytul}</h1>
            <p>{getTekst(post.opis)}</p>
            </div>
            
            <Menu cat={post.kategoria}/>
        </div>
        
    );
};
 
export default Autor