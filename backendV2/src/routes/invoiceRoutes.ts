import express from "express"
import {
  getInvoices,
  getInvoice,
  getInvoiceTemplates,
} from "../controllers/invoiceController"

const router = express.Router()

router.get("/invoices", getInvoices)
router.get("/invoices/:guid", getInvoice)
router.get("/invoice/templates", getInvoiceTemplates)

export default router
