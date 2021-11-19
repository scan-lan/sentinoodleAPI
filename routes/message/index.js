import express from "express";
import { addMessage } from "./api.js";

const route = express.Router();

route.post("/message", async ({ body }, response) => {
  const { device_id, message_text } = body;
  if (!device_id || !message_text) {
    response.json({error: "Body missing required fields"});
  } else {
    await addMessage(device_id, message_text, (result) => {
      response.json(result);
    })
  }
})

export default route;
