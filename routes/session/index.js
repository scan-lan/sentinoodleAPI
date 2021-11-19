import { Router } from "express";
import { getSession } from "./api.js";

const route = Router()

route.get("/session", async ({ body }, response) => {
  const { device_id } = body;
  if (!device_id) {
    response.json({error: "Body missing required fields"})
  } else {
    await getSession(device_id, (result) => {
      response.json(result)
    })
  }
})

export default route;
