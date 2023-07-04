import express from "express"
import { logowanie, rejestracja, wyloguj } from "../kontrolery/auth.js"


const router = express.Router()

router.post("/rejestracja",rejestracja)
router.post("/logowanie",logowanie)
router.post("/wyloguj",wyloguj)


export default router