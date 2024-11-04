import { Contact } from "@/types/contact";
import api from "./api";

export const fetchContacts = async (): Promise<Contact[]> => {
  try {
    const response = await api.get("/contacts");
    return response.data.Collection.map((item: Contact) => item);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.response?.data?.error || "An error occurred while fetching products"
    );
  }
};
