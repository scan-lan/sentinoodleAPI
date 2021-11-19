import { Router } from "express";
import { getSession } from "./api.js";

const route = Router()

route.post("/session", async ({ body }, response) => {
  if (!body.session_id) {
    response.json({error: "Body missing required fields"})
  } else {
    await getSession(body.session_id, body.message_text, (result) => {
      response.json(result)
    })
  }
})

export default route;
