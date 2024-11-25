import express from "express"
import { getData } from "../controllers/dataController.js"

const router = express.Router()

router.route("/data/:device").get(getData)

export default router
