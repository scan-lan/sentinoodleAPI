import { Router } from "express";
import { addMessage } from "./api.js";

const app = Router()

app.post("/message", ({ body }, response) => {
  if (!body.session_id || !body.message_text) {
    response.json({error: true})
  } else {
    addMessage(body.session_id, body.message_text, (result) => {
      response.json(result)
    })
  }
})

export default app;
