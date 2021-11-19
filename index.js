import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import postMessageRoute from "./routes/message/index.js";
import getSessionRoute from "./routes/session/index";
dotenv.config()


const PORT = process.env.PORT || 5000
const app = express()

app.use(helmet())

const corsOptions = {
  origin: process.env.NODE_ENV === "development" ? "*" : /sentinoodle-front-end-hx5kt35wna-nw\.a\.run\.app/
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(getSessionRoute)
app.use(postMessageRoute)

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`)
})
