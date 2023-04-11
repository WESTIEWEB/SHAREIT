import { Router } from "express";
import { chatUser } from "../../user/controller";
import { chatControllers, controllerGetChat } from "../controllers";

const router = Router();

router.post("/authenticate-chat-user", chatUser)
router.post("/create-chat", chatControllers)
router.get("/chat-messages/:userId/:adminId", controllerGetChat)

export default router;