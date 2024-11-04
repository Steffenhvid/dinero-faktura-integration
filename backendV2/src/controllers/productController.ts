// src/controllers/productController.ts
import { Request, Response } from 'express';
import { fetchExternalData, createExternalData } from '../services/apiService';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const params = {
      fields: 'Name,ProductNumber,Quantity,Unit,AccountNumber,BaseAmountValue,BaseAmountValueInclVat,TotalAmount,TotalAmountInclVat,ExternalReference,ProductGuid',
    };
    const products = await fetchExternalData('/products', params);
    res.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const newProduct = await createExternalData('/products', productData);
    res.status(201).json(newProduct);
  } catch (error: any) {
    console.error('Error creating product:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to create product' });
  }
};

