import { Request, Response } from "express"
import { fetchExternalData } from "../services/apiService"

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const params = {
      fields:
        "Guid,ContactName,ContactGuid,Date,PaymentDate,Currency,Description,TotalExclVat",
    }
    const invoices = await fetchExternalData("/invoices", params)
    res.json(invoices)
  } catch (error: any) {
    console.error(
      "Error fetching invoices:",
      error.response?.data || error.message
    )
    res.status(500).json({ error: "Failed to fetch invoices" })
  }
}

export const getInvoice = async (req: Request, res: Response) => {
  const { guid } = req.params
  try {
    const invoice = await fetchExternalData(`/invoices/${guid}`)
    console.log(invoice)
    res.json(invoice)
  } catch (error: any) {
    console.error(
      "Error fetching invoices:",
      error.response?.data || error.message
    )
    res.status(500).json({ error: "Failed to fetch invoice" })
  }
}

export const getInvoiceTemplates = async (req: Request, res: Response) => {
  try {
    const invoices = await fetchExternalData("/invoices/templates")
    res.json(invoices)
  } catch (error: any) {
    console.error(
      "Error fetching invoices:",
      error.response?.data || error.message
    )
    res.status(500).json({ error: "Failed to fetch invoices" })
  }
}

/*
Number, Guid, ExternalReference, ContactName, ContactGuid, Date, PaymentDate, Description, Currency, 
Status, MailOutStatus, LatestMailOutType, TotalExclVatInDkk, TotalInclVatInDkk TotalExclVat, TotalInclVat, 
CreatedAt, UpdatedAt and DeletedAt. If null, defaults to Guid,ContactName,Date,Description
*/
