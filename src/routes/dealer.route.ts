import { Router } from "express";
import { DealerController } from "../controller";
import { DealerSignInRule, DealerSignUpRule } from "../validations";
import { Validate } from "../utils";

export const DealerRoute = Router();

DealerRoute.get("/dealer", DealerController.GetAllDealers);
DealerRoute.post("/dealer/sign-up", DealerSignUpRule, Validate, DealerController.SignUpDealer);
DealerRoute.post("/dealer/sign-out", DealerController.SignOut);
DealerRoute.post("/dealer/sign-in", DealerSignInRule, Validate, DealerController.SignInDealer);
DealerRoute.put("/dealer/:id", DealerController.UpdateDealer);
