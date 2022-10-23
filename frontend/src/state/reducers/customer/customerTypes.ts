/*
  reducer for catalogue types
  ------------------------------------------------------------
  This file contains the reducer's type for the catalogue.
  ------------------------------------------------------------
*/

export type Customer = {
  id: number;
  name: string;
  siret: string;
  tel: string;
  email: string | null;
  password: string | null;
  address: string;
  cp: string;
  solde_init: number;
  crdate_creation?: string | null;
  last_update?: string | null;
  contact?: string | null;
};
export class CustomerSclass {
  constructor(
    public id: number,
    public name: string,
    public siret: string,
    public tel: string,
    public email: string | null,
    public password: string | null,
    public address: string,
    public cp: string,
    public solde_init: number,
    public crdate_creation?: string | null,
    public last_update?: string | null,
    public contact?: string | null
  ) {}
}

export type CustomerState = {
  customers: Customer[] | [];
  selectedCustomerId: number | null;
  hasError: false | string;
  total: number;
};
