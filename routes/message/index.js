import express from "express";
import { postMessage } from "./api.js";

const makeRoute = (prismaClient) => {
  const route = express.Router();

  route.post("/message", (request, response) => {
    const { device_id, message_text } = request.body;
    if (!device_id || !message_text) {
      response.json({error: "Body missing required fields"});
    } else {
      postMessage(prismaClient, device_id, message_text, (result) => {
        response.json(result);
      })
        .catch(e => {
          response.json({error: e})
        })
    }
  })

  return route;
}

export default makeRoute;
