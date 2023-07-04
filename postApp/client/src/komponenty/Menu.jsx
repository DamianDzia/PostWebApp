import axios from "axios";
import React, { useEffect, useState } from "react"

const Menu = ({cat}) =>{
    const [posty,setPosty] = useState([])

    useEffect(()=>{
        const fetchData = async ()=> {
            try{
                const res  = await axios.get(`http://localhost:8800/api/posty/?cat=${cat}`);
                setPosty(res.data);

            }catch (err){
                console.log(err);
            }

        };
        fetchData();
    },[cat]);/*
    const posty  = [
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
    return (
        <div className="menu">
            <h1>Jakie posty lubisz?</h1>
            {posty.map((post) => (
                <div className="post" key={post.id}>
                <img src={`../uploads/${post?.zdjecie}`} alt=""/>
                <h2>{post.tytul}</h2>
                <button>Dowiedz sie wiecej</button>
                </div>
                
            ))}
        </div>
    );
};

export default Menu