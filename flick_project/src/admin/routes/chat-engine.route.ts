import { Router } from "express";
import { chatUser } from "../../user/controller";

const router = Router();

router.post("/authenticate-chat-user", chatUser)

export default router;