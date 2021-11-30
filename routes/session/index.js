import express from "express";
import { getSession, updateMessageWaitTime } from "./api.js";

const makeRoute = (prismaClient) => {
  const route = express.Router();

  route.get("/sessionByDeviceID/:deviceId", (request , response) => {
    const device_id = request.params.deviceId;
    if (!device_id) {
      response.status(400).json({error: "Missing required value in url: deviceId. Please use url like so: {URL}/sessionByDeviceID/deviceId"});
    } else {
      getSession(prismaClient, device_id, (result) => {
        response.status(200).json(result);
      })
        .catch(e => {
          response.status(500).json({error: e})
        })
    }
  })

  route.post("/messageWaitTime", ({ body }, response) => {
    const { session_id, message_wait_period_minutes } = body;
    if (!session_id || (!message_wait_period_minutes && message_wait_period_minutes !== 0)) {
      console.log("Body missing required fields")
      response.status(400).json({error: "Body missing required fields"});
    } else {
      updateMessageWaitTime(prismaClient, session_id, message_wait_period_minutes, (result) => {
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
