import express from "express"
import polpost from "./routes/posty.js"
import polauth from "./routes/auth.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"


const app = express()



app.use(express.json())
app.use(cors(
  {
    origin: 'http://localhost:5173',
    credentials: true
    
  
  }
));
app.use(cookieParser())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({storage})

app.post('/api/upload',upload.single('plik'),function (req,res){
const file = req.file;
res.status(200).json(file.filename);

});

/*
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    
    
    
  
    next();
  });
*/

app.use("/api/posty", polpost)
app.use("/api/auth", polauth)


app.listen(8800,()=>{
    console.log("Połączono")
})