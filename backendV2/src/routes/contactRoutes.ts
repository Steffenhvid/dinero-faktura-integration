import express from "express"
import { getContacts } from "../controllers/contactController"

const router = express.Router()

router.get("/contacts", getContacts)

export default router
