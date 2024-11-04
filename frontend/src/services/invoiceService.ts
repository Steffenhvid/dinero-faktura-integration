import { Invoice } from "@/types/invoice";
import api from "./api";

export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await api.get("/invoices");
    return response.data.Collection.map((item: Invoice) => item);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.response?.data?.error || "An error occurred while fetching products"
    );
  }
};

export const fetchInvoiceByGuid = async (
  guid: string
): Promise<Invoice> => {
  try {
    const response = await api.get(`/invoices/${guid}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching invoice:", error);
    throw new Error(
      error.response?.data?.error ||
        "An error occurred while fetching the invoice"
    );
  }
};
