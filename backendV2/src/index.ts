import dotenv from "dotenv"
dotenv.config()
import express from "express"

import cors from "cors"
import { setupMiddleware } from "./middleware/setupMiddleware"
import { setupRoutes } from "./routes"

const app = express()
const PORT = process.env.PORT || 3000

setupMiddleware(app)
setupRoutes(app)

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`)
})
