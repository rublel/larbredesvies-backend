/*
  action-creators/catalogue
  ------------------------------------------------------------
  This file contains the actions-creators for the catalogue.
  The actions-creators are used to dispatch actions to the store.
  The actions are then handled by the reducers.
  ------------------------------------------------------------

  The actions-creators are:
    @action filterCatalogue
    @action setCheckedCategory
    @createProduct
    @deleteProduct
    @updateProduct
    @createCategory

  )
*/

/* eslint-disable no-unreachable */
// import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "../../actions/catalogue";
import { ActionType } from "../../action-types/catalogue";
import { CatalogTypes } from "../..";
import axios from "axios";

//Read Actions
export const getProducts = () => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}catalog/all`
    );

    dispatch({
      type: ActionType.GETPRODUCTS,
      payload: response.data.records.data,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getCategories = () => async (dispatch: Dispatch<Action>) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}catalog/categories`
    );
    dispatch({
      type: ActionType.GETCATEGORIES,
      payload: response.data.records,
    });
  } catch (error) {
    console.log(error);
  }
};

export const filterProducts = (e: string) => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.FILTERPROD,
        payload: e,
      });
  } catch (error) {
    console.log(error);
  }
};

export const setCheckedCategory = (e: number | "all") => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.SETCHECKEDCAT,
        payload: e,
      });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = (
  e: Omit<CatalogTypes.Product, "id" | "commandNumber">
) => {
  try {
    return async (dispatch: any) => {
      const newProduct = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}catalog/product`,
        data: e,
      });
      if (newProduct?.data?.error)
        return dispatch({
          type: ActionType.CREATEPRODUCT,
          payload: newProduct?.data?.error,
        });
      else {
        dispatch(getProducts());
        dispatch(getCategories());
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = (e: CatalogTypes.Product["id"]) => {
  try {
    return async (dispatch: any) => {
      const deleted = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}catalog/product?id=${e}`,
      });
      if (deleted?.data?.records?.affected > 0) {
        dispatch(getProducts());
        dispatch(getCategories());
      } else {
        dispatch({
          type: ActionType.DELETEPRODUCT,
          payload: "la supression a échoué veuillez reessayer",
        });
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = (e: {
  product: Omit<CatalogTypes.Product, "commandNumber">;
  newCategory: boolean;
}) => {
  try {
    return async (dispatch: any) => {
      let id;

      if (e.newCategory) {
        const newCategory = await axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}catalog/category`,
          data: { name: e.product.category },
        });
        if (newCategory?.data?.error)
          return dispatch({
            type: ActionType.UPDATEPRODUCT,
            payload: newCategory?.data?.error,
          });
        else {
          id = newCategory?.data?.records?.id;
        }
      }
      if (id) e.product.category = id;
      const updated = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}catalog/product`,
        data: e.product,
      });

      if (updated?.data?.error)
        return dispatch({
          type: ActionType.UPDATEPRODUCT,
          payload: updated?.data?.error,
        });
      else {
        dispatch(getProducts());
        dispatch(getCategories());
      }
    };
  } catch (error) {
    console.log(error);
  }
};
export const createCategory = (e: string) => {
  try {
    return async (dispatch: any) => {
      const newCategory = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}catalog/category`,
        data: {
          name: e,
        },
      });
      if (newCategory?.data?.error)
        return dispatch({
          type: ActionType.CREATECATEGORY,
          payload: newCategory?.data?.error,
        });
      else {
        dispatch(getProducts());
        dispatch(getCategories());
      }
    };
  } catch (error) {
    console.log(error);
  }
};

export const setHasNoError = () => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.SETHASNOERROR,
      });
  } catch (error) {
    console.log(error);
  }
};
