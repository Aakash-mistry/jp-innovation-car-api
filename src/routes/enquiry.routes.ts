import { Router } from "express";
import { EnquiryController } from "../controller";

export const EnquiryRoute = Router();

EnquiryRoute.get("/enquiry", EnquiryController.getMyEnquiry);
EnquiryRoute.post("/enquiry", EnquiryController.createEnquiry);
EnquiryRoute.put("/enquiry/:id", EnquiryController.updateEnquiry);
EnquiryRoute.delete("/enquiry/:id", EnquiryController.deleteEnquiry);
