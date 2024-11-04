export interface Invoice {
  Guid: string;
  ContactName: string;
  ContactGuid: string;
  Date: Date;
  PaymentDate: Date;
  Currency: string;
  Description: string;
  TotalExclVat: number;
  ProductLines: InvoiceLine[];
}

export interface InvoiceLine {
  ProductGuid: string;
  Description: string;
  Comments: string;
  Quantity: number;
  AccountNumber: number;
  Unit: string;
  Discount: number;
  LineType: string;
  AccountName: string;
  BaseAmountValue: number;
  BaseAmountValueInclVat: number;
  TotalAmount: number;
  TotalAmountInclVat: number;
}
