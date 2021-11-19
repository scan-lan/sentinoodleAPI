const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const PORT = process.env.PORT || 5000

const app = express()

app.use(helmet())
app.use(cors({
  origin: process.env.NODE_ENV === "development" ? "*" : /sentinoodle-front-end-hx5kt35wna-nw\.a\.run\.app/
}))

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`)
})
