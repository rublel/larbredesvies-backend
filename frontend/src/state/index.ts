/*
  index file for all state to export a in the catalogue ux
*/
//action creators
export * as catalogueActionCreators from "./action-creators/catalogue";
export * as customerActionCreators from "./action-creators/customer";
//store
export { store } from "./store";
//reducers
export * from "./reducers";
//types
export * as CatalogTypes from "./reducers/catalogue/catalogueTypes";
export * as CustomerTypes from "./reducers/customer/customerTypes";
