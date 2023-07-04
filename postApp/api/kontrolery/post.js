import e, { query } from "express"
import {db} from "..//db.js"
import jwt from "jsonwebtoken";

export const getPosts = (req,res) =>{
    const q = req.query.cat ? "SELECT * FROM posty WHERE kategoria=?" : "SELECT * FROM posty"
    db.query(q, [req.query.cat], (err,data)=>{
        if(err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
}
export const getPost = (req,res) =>{
    const q = "SELECT p.id, `uzytkownik`,`tytul`,`opis`,p.zdjecie, u.zdjecie As uzytZdj,`kategoria`,`data` FROM users u JOIN posty p ON u.id=p.uid WHERE p.id=?" 

    db.query(q, [req.params.id], (err,data)=>{
        if(err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
};

export const addPost = (req,res) =>{
    const token  = req.cookies.tokencookie;
    if(!token) return res.status(401).json("Brak dostępu!");

    jwt.verify(token, "jwtkey",(err, userInfo)=>{
        if(err) return res.status(403).json("Token nie poprawny!");
        
        const q = "INSERT INTO posty(`tytul`,`opis`,`zdjecie`,`kategoria`,`data`,`uid`) VALUES (?)"

        const values = [
            req.body.tytul,
            req.body.opis,
            req.body.zdjecie,
            req.body.kategoria,
            req.body.data,
            userInfo.id
        ]
        db.query(q,[values],(err,data) =>{
            if(err) return res.status(500).json(err)
            return res.json("Post utworzony pomyślnie");
        })
});
};
export const delPost = (req,res) =>{
    const token  = req.cookies.tokencookie;
    if(!token) return res.status(401).json("Brak dostępu!");

    jwt.verify(token, "jwtkey",(err, userInfo)=>{
        if(err) return res.status(403).json("Token nie poprawny!");

        const postId = req.params.id
        const q = "DELETE FROM posty WHERE `id` = ? AND `uid` = ? ";

        db.query(q,[postId,userInfo.id],(err,data)=>{
            if(err) return req.status(403).json("Możesz usuwać tylko swoje posty!");

            return res.json("Post został usunięty!")
        });


    });
};
export const updPost = (req,res) =>{
    const token  = req.cookies.tokencookie;
    if(!token) return res.status(401).json("Brak dostępu!");

    jwt.verify(token, "jwtkey",(err, userInfo)=>{
        if(err) return res.status(403).json("Token nie poprawny!");

        const postId = req.params.id

        const q = "UPDATE posty SET `tytul`=?,`opis`=?,`zdjecie`=?,`kategoria`=?  WHERE `id` = ? AND `uid` = ?"

        const values = [
            req.body.tytul,
            req.body.opis,
            req.body.zdjecie,
            req.body.kategoria,
        ]
        db.query(q,[...values,postId,userInfo.id],(err,data) =>{
            if(err) return res.status(500).json(err)
            return res.json("Post zaaktualizowany pomyślnie");
        })
});
}