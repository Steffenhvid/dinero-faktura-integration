import { Request, Response } from "express"
import { fetchExternalData } from "../services/apiService"

export const getContacts = async (req: Request, res: Response) => {
  try {
    const params = {
      fields: "name,contactGuid,street,zipCode,city,countryKey,phone,email",
    }
    const contacts = await fetchExternalData("/contacts", params)
    res.json(contacts)
  } catch (error: any) {
    console.error(
      "Error fetching contacts:",
      error.response?.data || error.message
    )
    res.status(500).json({ error: "Failed to fetch contacts" })
  }
}
