/*
  This file contains the reducer's for the catalogue.
  ------------------------------------------------------------
  This file contains the reducer's for the catalogue.
  ------------------------------------------------------------
*/

import { ActionType } from "../../action-types/catalogue";
import { CatalogueState } from "./catalogueTypes";
import { Action } from "../../actions/catalogue";

const initState: CatalogueState = {
  products: [],
  categories: [],
  checkedCat: "all",
  hasError: false,
};

export const catalogueReducer = (
  state = initState,
  action: Action
): CatalogueState => {
  switch (action.type) {
    case ActionType.FILTERPROD:
      return {
        ...state,
        products: initState.products.filter((product) => {
          return (
            product.name.includes(action.payload) ||
            `${product.reference}`.includes(action.payload)
          );
        }),
      };
    case ActionType.SETCHECKEDCAT:
      return {
        ...state,
        checkedCat: action.payload,
        products:
          action.payload === "all"
            ? initState.products
            : initState.products.filter(
                (prod) => prod.category === action.payload
              ),
      };
    case ActionType.CREATEPRODUCT:
    case ActionType.DELETEPRODUCT:
    case ActionType.UPDATEPRODUCT:
    case ActionType.CREATECATEGORY:
      return typeof action.payload === "string"
        ? {
            ...state,
            hasError: action.payload,
          }
        : {
            ...state,
          };
    case ActionType.GETPRODUCTS:
      initState.products = action.payload;
      return {
        ...state,
        products: action.payload,
        hasError: false,
      };
    case ActionType.GETCATEGORIES:
      initState.categories = action.payload;
      return {
        ...state,
        categories: action.payload,
        hasError: false,
      };
    case ActionType.SETHASNOERROR:
      return {
        ...state,
        hasError: false,
      };
    default:
      return { ...state };
  }
};

export default catalogueReducer;
