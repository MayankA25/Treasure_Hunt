import { Router } from "express";
import { check, login, storeUsers } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.verification.js";


const router = Router()

router.post("/store-users", storeUsers)
router.post("/login", login);
router.get("/check",verifyToken, check)

export default router