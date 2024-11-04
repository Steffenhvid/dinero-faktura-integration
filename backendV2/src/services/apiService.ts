import axios from "axios"
import { getToken } from "./tokenService"
import { BASEADRESS } from "../config/constants"

const getHeaders = async () => {
  const token = await getToken()
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

export const fetchExternalData = async (
  endpoint: string,
  params: Record<string, string | number> = {}
) => {
  const headers = await getHeaders()
  console.log(`${BASEADRESS}${endpoint}`)
  const response = await axios.get(`${BASEADRESS}${endpoint}`, {
    headers,
    params,
  })
  return response.data
}

export const createExternalData = async (endpoint: string, data: any) => {
  const headers = await getHeaders()
  const response = await axios.post(`${BASEADRESS}${endpoint}`, data, {
    headers,
  })
  return response.data
}

export const updateExternalData = async (endpoint: string, data: any) => {
  const headers = await getHeaders()
  const response = await axios.put(`${BASEADRESS}${endpoint}`, data, {
    headers,
  })
  return response.data
}

export const deleteExternalData = async (endpoint: string) => {
  const headers = await getHeaders()
  const response = await axios.delete(`${BASEADRESS}${endpoint}`, {
    headers,
  })
  return response.data
}
