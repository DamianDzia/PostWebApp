import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';


const Wczytywanie = () =>{
    const state = useLocation().state
    const [value, setValue] = useState(state?.tytul ||'');
    const [tytul,setTytul] = useState(state?.opis ||'');
    const [plik,setPlik] = useState(null);
    const [kategoria,setKat] = useState(state?.cat ||'');

    const upload = async ()=>{
        try{
            const formData = new FormData();
            formData.append("plik",plik)
            const res = await axios.post("http://localhost:8800/api/upload",formData)
            return res.data
        }catch(err){
            console.log(err)
        }
    }
const nawiguj= useNavigate()


const PotwierdzWysl =  async e=>{
    e.preventDefault()
    const imgUrl =  await upload();
    try{
        state 
        ? await axios.put(`http://localhost:8800/api/posty/${state.id}`,{
            tytul,
            opis:value,
            kategoria,
            zdjecie:plik ? imgUrl : "",
        },{withCredentials: true})
         : await axios.post(`http://localhost:8800/api/posty/`,{
            tytul,
            opis:value,
            kategoria,
            zdjecie:plik ? imgUrl : "",
            data: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
        },{withCredentials: true});
        nawiguj('/')

    }catch(err){
        console.log(err)
    }
}
    console.log(value)
    return (
        <div className="dodaj">
            <div className="content">
                <input type="text" value={tytul} placeholder="Tytul" onChange={e=>setTytul(e.target.value)}></input>
                <div className="edytor">
                <ReactQuill className="edit" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Opublikuj</h1>
                    <span>
                        <b>Status: </b> Oczekuje
                    </span>
                    <span>
                        <b>Widoczność: </b> Publiczny
                    </span>
                    <input style={{display:"none"}} type="file" id="file" name="" onChange={e=>setPlik(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Dodaj zdjęcie</label>
                    <div className="buttons">
                        <button>Zapisz wersje testową</button>
                        <button onClick={PotwierdzWysl}>Publikuj</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Kategoria</h1>
                    <div className="cat">
                    <input type="radio" checked={kategoria === "siatkowka"} name="cat" value="siatkowka" id="siatkowka" onChange={e=>setKat(e.target.value)}/>
                    <label htmlFor="siatkowka">Siatkówka</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={kategoria === "pilka_nozna"} name="cat" value="pilka_nozna" id="pilka_nozna" onChange={e=>setKat(e.target.value)}/>
                    <label htmlFor="pilka_nozna">Piłka Nożna</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={kategoria === "formula1"} name="cat" value="formula1" id="formula1" onChange={e=>setKat(e.target.value)}/>
                    <label htmlFor="formula1">Formuła 1</label>
                    </div>
                    <div className="cat">
                    <input type="radio" checked={kategoria === "boks"} name="cat" value="boks" id="boks" onChange={e=>setKat(e.target.value)}/>
                    <label htmlFor="boks">Boks</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wczytywanie