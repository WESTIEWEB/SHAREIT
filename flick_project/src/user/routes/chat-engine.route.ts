import { Router } from "express";
import { chatUser } from "../controller";

const router = Router();

router.post("/authenticate-chat-user", chatUser)

export default router;