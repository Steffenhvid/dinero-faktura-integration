// src/index.ts
import express, { Request, Response } from "express"
import axios from "axios"
import dotenv from "dotenv"
import qs from "qs"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const BASEADRESS = `https://api.dinero.dk/v1/${process.env.COMPANY_ID}`

// Middleware
app.use(
  cors({
    origin: "http://localhost:8080", // Adjust to your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.use(express.json())

// In-memory token cache
let cachedToken: string | null = null
let tokenExpiry: number | null = null

// Function to get a valid token
const getToken = async (): Promise<string> => {
  const currentTime = Date.now()

  if (cachedToken && tokenExpiry && currentTime < tokenExpiry) {
    return cachedToken
  }

  const { CLIENT_ID, CLIENT_SECRET, API_KEY, SCOPE, TOKEN_URL, COMPANY_ID } =
    process.env

  if (
    !CLIENT_ID ||
    !CLIENT_SECRET ||
    !API_KEY ||
    !SCOPE ||
    !TOKEN_URL ||
    !COMPANY_ID
  ) {
    throw new Error("Server configuration error")
  }

  const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  )

  const headers = {
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/x-www-form-urlencoded",
  }

  const data = qs.stringify({
    grant_type: "password",
    username: API_KEY,
    password: API_KEY,
    scope: SCOPE,
  })

  try {
    const response = await axios.post(TOKEN_URL, data, { headers })
    const { access_token, expires_in } = response.data

    cachedToken = access_token as string
    tokenExpiry = currentTime + expires_in * 1000 - 60 * 1000 // Subtract 1 minute for safety

    return cachedToken
  } catch (error: any) {
    console.error(
      "Error fetching token:",
      error.response?.data || error.message
    )
    throw new Error("Failed to fetch token")
  }
}

// Endpoint to get the bearer token
app.get("/api/token", async (req: Request, res: Response) => {
  try {
    const token = await getToken()
    res.json({ access_token: token })
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
})

// Proxy endpoint to external API
app.get("/api/external-data", async (req: Request, res: Response) => {
  try {
    const token = await getToken()
    const externalResponse = await axios.get(BASEADRESS + "/invoices", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    res.json(externalResponse.data)
  } catch (error: any) {
    console.error(
      "Error fetching external data:",
      error.response?.data || error.message
    )
    res.status(500).json({ error: "Failed to fetch external data" })
  }
})

app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const params: Record<string, string | number> = {}
    params.fields =
      "Name,ProductNumber,Quantity,Unit,AccountNumber,BaseAmountValue,BaseAmountValueInclVat,TotalAmount,TotalAmountInclVat,ExternalReference,ProductGuid"
    const token = await getToken()
    const externalResponse = await axios.get(BASEADRESS + "/products", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      params,
    })

    res.json(externalResponse.data)
  } catch (error: any) {
    console.error(
      "Error fetching external data:",
      error.response?.data || error.message
    )
    res.status(500).json({ error: "Failed to fetch external data" })
  }
})

app.post("/api/products", async (req: Request, res: Response) => {
  try {
    const token = await getToken()
    const productData = req.body // Assuming the product data is sent in the request body

    const externalResponse = await axios.post(
      BASEADRESS + "/products",
      productData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )

    res.status(201).json(externalResponse.data)
  } catch (error: any) {
    console.error(
      "Error creating product:",
      error.response?.data || error.message
    )
    res.status(500).json({ error: "Failed to create product" })
  }
})

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
