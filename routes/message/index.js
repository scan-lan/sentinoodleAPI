import { Router } from "express";
import { addMessage } from "./api.js";

const app = Router()

app.post("/message", async ({ body }, response) => {
  if (!body.session_id || !body.message_text) {
    response.json({error: true})
  } else {
    await addMessage(body.session_id, body.message_text, (result) => {
      response.json(result)
    })
  }
})

export default app;
