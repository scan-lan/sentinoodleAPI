import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import prismaPkg from '@prisma/client';
import postMessageRoute from "./routes/message/index.js";
import makeRoute from "./routes/session/index";
dotenv.config()
const { PrismaClient } = prismaPkg;


const PORT = process.env.PORT || 5000
const app = express()
const prisma = new PrismaClient()

app.use(helmet())

const corsOptions = {
  origin: process.env.NODE_ENV === "development" ? "*" : /sentinoodle-front-end-hx5kt35wna-nw\.a\.run\.app|77\.100\.88\.87/
}
app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(makeRoute(prisma))
app.use(postMessageRoute)

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Express app listening on http://${host}:${port}`)
})
