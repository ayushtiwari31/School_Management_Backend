import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan";


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))



app.use(express.json({limit: "50kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev"));


import classRouter from "./routes/class.routes.js";
import teacherRouter from "./routes/teacher.routes.js";
import subjectRouter from "./routes/subject.routes.js";
import testRouter from "./routes/test.routes.js";

app.use("/api/class",classRouter);
app.use("/api/teacher",teacherRouter);
app.use("/api/subject",subjectRouter);
app.use("/api/test",testRouter);


app.all('*',(req, res) => {
    res.send('Sorry !! Request Failed ,Try after sometime.');
});


export { app }