import { Router } from "express";
import { createTokenController } from "../controllers/login.controller";

const loginRoutes = Router();

loginRoutes.post("", createTokenController);

export { loginRoutes };
