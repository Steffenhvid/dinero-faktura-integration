// src/routes/index.ts
import express from "express"
import tokenRoutes from "./tokenRoutes"
import invoiceRoutes from "./invoiceRoutes"
import productRoutes from "./productRoutes"
import contactRoutes from "./contactRoutes"

export const setupRoutes = (app: express.Application) => {
  app.use("/api", tokenRoutes)
  app.use("/api", invoiceRoutes)
  app.use("/api", productRoutes)
  app.use("/api", contactRoutes)
}
