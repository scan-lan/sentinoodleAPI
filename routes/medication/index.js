import express from "express";
import { getMedication, postMedication } from "./api.js";

const makeRoute = (prismaClient) => {
  const route = express.Router();

  route.get("/medicationById/:id", (request, response) => {
    const id = parseInt(request.params.id);
    if (id) {
      getMedication(prismaClient, id, (medication) => {
        response.status(200).json(medication);
      })
        .catch(e => {
          console.log(e)
          response.status(500).json({error: e})
        })
    } else {
      console.log("URL missing required param ID e.g. /medicationById/2")
      response.status(400).json({error: "URL missing required param ID e.g. /medicationById/2"});
    }
  })

  route.post("/medication", ({ body }, response) => {
    const { name, dosage, dosage_frequency } = body;
    if (name && dosage && dosage_frequency) {
      postMedication(prismaClient, name, dosage, dosage_frequency, (medication) => {
        response.status(200).json(medication)
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

export default makeRoute;
