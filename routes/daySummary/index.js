import express from "express";
import { getSummary } from "./api.js";

const makeRoute = (prismaClient) => {
  const route = express.Router();

  route.get("/daySummary/:sessionId", (request , response) => {
    const session_id = parseInt(request.params.sessionId);
    if (!session_id) {
      response.status(400).json({error: "Missing required value in url: sessionId. Please use url like so: {URL}/daySummary/sessionId"});
    } else {
      getSummary(prismaClient, session_id, (result) => {
        response.status(200).json({...result});
      })
        .catch(e => {
          console.log(e)
          response.status(500).json({error: e})
        })
    }
  })

  return route;
}

export default makeRoute;
