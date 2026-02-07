import express from "express"
import filmController from "../controllers/filmController.js"

const router = express.Router();

router.get("/", filmController.index)
router.get("/:id", filmController.show)

export default router