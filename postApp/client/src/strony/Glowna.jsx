import React, { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Glowna = () =>{
    const [posty,setPosty] = useState([])

    const location = useLocation()

    console.log(location)

    const cat = useLocation().search

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res  = await axios.get(`http://localhost:8800/api/posty${cat}`);
                setPosty(res.data);

            }catch (err){
                console.log(err);
            }

        };
        fetchData();
    },[cat]);
   /* const posty  = [
        {
            id: 1,
            tytul:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            opis:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img:"https://i.imgur.com/Hm5OQGB.jpeg"

        },
        {
            id: 2,
            tytul:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            opis:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img:"https://i.imgur.com/Hm5OQGB.jpeg"


        },
        {
            id: 3,
            tytul:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            opis:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img:"https://i.imgur.com/Hm5OQGB.jpeg"


        },
        {
            id: 4,
            tytul:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            opis:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            img:"https://i.imgur.com/Hm5OQGB.jpeg"


        },
    ];*/

    const getTekst = (html) =>{
        const doc = new DOMParser().parseFromString(html,"text/html")
        return doc.body.textContent
    }
    return (
        <div className="glowna">
            <div className="posty">
                {posty.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../uploads/${post.zdjecie}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/autor/${post.id}`}>
                            <h1>{post.tytul}</h1>
                            </Link>
                            <p>{getTekst(post.opis)}</p>
                            <button>Dowiedz się więcej</button>
                        </div>
                    </div>    
                ))}
            </div>
        </div>
    );
        
    

    
};

export default Glowna