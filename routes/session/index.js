import express from "express";
import { getSession, updateMessageWaitTime, postSession } from "./api.js";

const makeRoutes = (prismaClient) => {
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

  route.put("/messageWaitTime", ({ body }, response) => {
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

  route.post("/session", ({ body }, response) => {
    const { device_id, medication_id, message_wait_period_minutes } = body;
    if (device_id &&
      (medication_id || medication_id === 0) ||
      (message_wait_period_minutes || message_wait_period_minutes === 0)) {
      postSession(prismaClient, device_id, medication_id, message_wait_period_minutes, (result) => {
        response.status(200).json(result);
      })
        .catch(e => {
          response.status(500).json({error: e})
        })
    } else {
      console.log("Body missing required fields")
      response.status(400).json({error: "Body missing required fields"});
    }
  })

  return route;
}

export default makeRoutes;
