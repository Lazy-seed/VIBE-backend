import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import DB_connection from './config/db.js';
import route from './routes/routes.js';
// import { Auth } from './middleware/auth.js';
import cookieParser from 'cookie-parser';
import 'dotenv/config'



console.log(process.env.Base_URL);
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ extended: true }))

app.use(cors({ credentials: true, origin: 'https://vibe77.netlify.app' }))
// app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
// app.use(cors({ credentials: true, origin: 'http://192.168.0.197:3000' }))
const PORT = 8000;

DB_connection();

app.listen(PORT, () => {
    console.log("server is runing ", PORT);
})


app.use('/api', route)

// app.get('/createCookie',Auth, async(req,res)=>{
// res.send("hello from server add ciookie")
// })



















