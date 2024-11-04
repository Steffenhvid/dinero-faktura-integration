import api from "@/services/api";
import { Product } from "@/types/product";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/products");
    return response.data.Collection.map((item: Product) => item);
  } catch (error: any) {
    console.error("Error fetching products:", error);
    throw new Error(
      error.response?.data?.error || "An error occurred while fetching products"
    );
  }
};

export const createProduct = async (product: Product): Promise<void> => {
  try {
    await api.post("/products", product);
  } catch (error: any) {
    console.error("Error creating product:", error);
    throw new Error(
      error.response?.data?.error ||
        "An error occurred while creating the product"
    );
  }
};
