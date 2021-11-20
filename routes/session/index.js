import express from "express";
import { getSession } from "./api.js";

const makeRoute = (prismaClient) => {
  const route = express.Router();

  route.get("/session", (request , response) => {
    const { device_id } = request.body;
    if (!device_id) {
      response.json({error: "Body missing required fields"});
    } else {
      getSession(prismaClient, device_id, (result) => {
        response.json(result);
      })
    }
  })

  return route;
}

export default makeRoute;
