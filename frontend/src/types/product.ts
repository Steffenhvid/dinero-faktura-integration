export interface Product {
  Name: string;
  ProductNumber: string | null;
  Quantity: number;
  Unit: string;
  AccountNumber: number;
  BaseAmountValue: number;
  BaseAmountValueInclVat: number;
  TotalAmount: number;
  TotalAmountInclVat: number;
  ExternalReference: string | null;
  ProductGuid: string | null;
  Discount: number | null;
}

export function createEmptyProduct(): Product {
  return {
    Name: "",
    ProductNumber: null,
    Quantity: 0,
    Unit: "",
    AccountNumber: 0,
    BaseAmountValue: 0,
    BaseAmountValueInclVat: 0,
    TotalAmount: 0,
    TotalAmountInclVat: 0,
    ExternalReference: null,
    ProductGuid: null,
    Discount: null,
  };
}

export function availableUnits(): { key: string; name: string }[] {
  return [
    {
      key: "hours",
      name: "timer",
    },
    {
      key: "parts",
      name: "stk.",
    },
    {
      key: "km",
      name: "km",
    },
    {
      key: "day",
      name: "dage",
    },
    {
      key: "week",
      name: "uger",
    },
    {
      key: "month",
      name: "mdr.",
    },
    {
      key: "kilogram",
      name: "kg",
    },
    {
      key: "cubicMetre",
      name: "kubikmeter",
    },
    {
      key: "set",
      name: "sæt",
    },
    {
      key: "litre",
      name: "liter",
    },
    {
      key: "box",
      name: "kasser",
    },
    {
      key: "case",
      name: "æsker",
    },
    {
      key: "carton",
      name: "kartoner",
    },
    {
      key: "metre",
      name: "meter",
    },
    {
      key: "package",
      name: "pakker",
    },
    {
      key: "shipment",
      name: "forsendelser",
    },
    {
      key: "squareMetre",
      name: "kvm",
    },
    {
      key: "session",
      name: "sessioner",
    },
    {
      key: "tonne",
      name: "ton",
    },
  ];
}
