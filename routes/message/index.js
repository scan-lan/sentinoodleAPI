import express from "express";
import { addMessage } from "./api.js";

const route = express.Router();

route.post("/message", async ({ body }, response) => {
  if (!body.session_id || !body.message_text) {
    response.json({error: "Missing required headers"});
  } else {
    await addMessage(body.session_id, body.message_text, (result) => {
      response.json(result);
    })
  }
})

export default route;
