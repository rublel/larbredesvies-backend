/*
  reducer for catalogue types
  ------------------------------------------------------------
  This file contains the reducer's type for the catalogue.
  ------------------------------------------------------------
*/

export type Category = {
  id: number | "all";
  count: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  category: number;
  price: number;
  reference: string;
  commandNumber: number;
};

export type CatalogueState = {
  products: Product[];
  categories: (Category | CategoryClass)[];
  checkedCat: number | "all";
  hasError: false | string;
};

export class ProductClass {
  constructor(
    public id: number,
    public name: string,
    public category: number,
    public price: number,
    public reference: string,
    public commandNumber: number
  ) {}
}

export class CategoryClass {
  constructor(
    public count: number,
    public name: string,
    public id: number | "all"
  ) {}
}
