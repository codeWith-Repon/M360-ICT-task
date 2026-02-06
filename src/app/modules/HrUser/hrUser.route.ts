import { Router } from "express";
import { HrUserController } from "./hrUser.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { HrUserValidation } from "./hrUser.validation";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router()

router.get("/", checkAuth(), HrUserController.getAllHrUser)
router.post(
    "/create",
    validateRequest(HrUserValidation.createHrUserSchema),
    HrUserController.createHrUser
)
router.get("/me", checkAuth(), HrUserController.getMe)
router.get("/:email", HrUserController.getUserByEmail)

router.patch(
    "/",
    checkAuth(),
    validateRequest(HrUserValidation.updateHrUserSchema),
    HrUserController.updateHrUser
)

router.delete("/:email", checkAuth(), HrUserController.deleteHrUser)


export const HrUserRoutes = router