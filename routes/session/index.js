import express from "express";
import { getSession } from "./api.js";

const makeRoute = (prismaClient) => {
  const route = express.Router();

  route.get("/sessionByDeviceID/:deviceId", (request , response) => {
    const device_id = request.params.deviceId;
    if (!device_id) {
      response.json({error: "Missing required value in url: deviceId. Please use url like so: {URL}/sessionByDeviceID/deviceId"});
    } else {
      getSession(prismaClient, device_id, (result) => {
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
