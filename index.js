const express = require("express")
const helmet = require("helmet")

const PORT = process.env.PORT || 5000

const app = express()

app.use(helmet())

app.listen(PORT, function () {
  console.log(`Express app listening on port ${PORT}`)
})
