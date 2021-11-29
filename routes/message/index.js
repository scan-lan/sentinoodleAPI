import express from "express";
import { postMessage } from "./api.js";

const makeRoute = (prismaClient) => {
  const route = express.Router();

  route.post("/message", ({ body }, response) => {
    const { session_id, message_text } = body;
    if (!session_id || !message_text) {
      response.status(400).json({error: `Body missing required fields: ${body}`});
    } else {
      postMessage(prismaClient, session_id, message_text, (result) => {
        response.status(200).json(result);
      })
        .catch(e => {
          response.status(500).json({error: e})
        })
    }
  })

  return route;
}

export default makeRoute;
