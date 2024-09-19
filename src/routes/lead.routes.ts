import { Router } from "express";
import { LeadController } from "../controller";

export const LeadRoute = Router();

LeadRoute.get("/lead", LeadController.getMyLeads);
LeadRoute.post("/lead", LeadController.createNewLeads);
LeadRoute.put("/lead/:id", LeadController.updateLead);
LeadRoute.delete("/lead/:id", LeadController.deleteLead);
