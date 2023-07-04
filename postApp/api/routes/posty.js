import express from "express"
import { addPost, delPost, getPost, getPosts, updPost } from "../kontrolery/post.js"
//import { dodajPost } from "../kontrolery/post.js"


const router = express.Router();

router.get("/",getPosts);
router.get("/:id",getPost );
router.post("/", addPost );
router.delete("/:id", delPost);
router.put("/:id", updPost);



export default router