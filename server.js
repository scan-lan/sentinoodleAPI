import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import prismaPkg from '@prisma/client';
import makeMessageRoute from "./routes/message/index";
import makeSessionRoute from "./routes/session/index";
import makeSummaryRoute from "./routes/daySummary/index";
dotenv.config()
const { PrismaClient } = prismaPkg;


const PORT = process.env.PORT || 5000
const app = express()
const prisma = new PrismaClient()

app.use(helmet())

const corsOptions = {
  origin: process.env.NODE_ENV === "development" ?
    "*" :
    /sentinoodle-front-end-hx5kt35wna-nw\.a\.run\.app|77\.100\.88\.87:[0-9]{1,4}/
}
app.use(cors(true))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(makeSessionRoute(prisma))
app.use(makeMessageRoute(prisma))
app.use(makeSummaryRoute(prisma))

const server = app.listen(PORT, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log(`Express app listening on http://${host}:${port}`)
})
