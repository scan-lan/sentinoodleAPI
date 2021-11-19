import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import postMessage from "./postMessage.js";



const PORT = process.env.PORT || 5000
const app = express()

postMessage()

app.use(helmet())

app.use(cors({
  origin: process.env.NODE_ENV === "development" ? "*" : /sentinoodle-front-end-hx5kt35wna-nw\.a\.run\.app/
}))

app.use(bodyParser.json)
app.use(bodyParser.urlencoded({ extended: false }))

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`)
})
