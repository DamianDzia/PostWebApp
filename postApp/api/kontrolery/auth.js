import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const rejestracja = (req,res)=>{

    //jeśli istnieje i dodanie użytkownika

    const q = "SELECT * FROM users WHERE email = ? OR uzytkownik = ?";
    db.query(q,[req.body.email, req.body.uzytkownik],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("Uzytkownik istnieje");

        //hasło hash
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.haslo, salt);

        const q = "INSERT INTO users(`uzytkownik`,`email`,`haslo`) VALUES (?)"
        const values = [
            req.body.uzytkownik,
            req.body.email,
            hash,
        ]

        db.query(q, [values],(err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json("Uzytkownik utworzony");

        });
    });
};
export const logowanie = (req,res)=>{
    //Czy istnieje uzytkownik

    const q = "SELECT * FROM users WHERE uzytkownik = ?";

    db.query(q,[req.body.uzytkownik],(err,data)=>{
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("Nie ma takiego uzytkownika!");

        const jesliPoprawneHaslo = bcrypt.compareSync(
            req.body.haslo, 
            data[0].haslo);

        if(!jesliPoprawneHaslo) return res.status(400).json("Złe haslo lub uzytkownik");
    
    const token = jwt.sign({id:data[0].id}, "jwtkey");
    const {haslo,...inne} = data[0];
    

    res.cookie("tokencookie", token,{
        httpOnly: true,
    }).status(200).json(inne);
    
    
});
};
export const wyloguj = (req,res)=>{
    
    res.clearCookie("tokencookie",{
        sameSite:"none",
        secure:true

        
    }).status(200).json("Wylogowałeś się")

    
};