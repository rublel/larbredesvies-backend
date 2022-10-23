/*
  action-creators/cusomers
  ------------------------------------------------------------
  This file contains the actions-creators for the customers.
  The actions-creators are used to dispatch actions to the store.
  The actions are then handled by the reducers.
  ------------------------------------------------------------

  The actions-creators are:
    @action filterCustomers
    @action addCustomer
    @action deleteCustomer
    @action updateCustomer
    @action getCustomers
    @action getCustomer
  )
*/

/* eslint-disable no-unreachable */
// import axios from "axios";
import { Dispatch } from "redux";
import { Action } from "../../actions/customer";
import { ActionType } from "../../action-types/customer";
import { CustomerTypes } from "../..";
import axios from "axios";

export const filterCustomers = ({
  text,
  page,
  perPage,
  sortBy,
  isAsc,
}: {
  text: string;
  page: number;
  perPage: number;
  sortBy: string;
  isAsc: "ASC" | "DESC";
}) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.GETCUSTOMERS,
      payload: {
        data: [],
        total: 0,
      },
    });
    const customers = await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}customer/search`,
      data: {
        queryString: text,
        queryFilters: {
          page,
          perPage,
          isAsc,
          sortBy,
        },
      },
    });

    dispatch({
      type: ActionType.GETCUSTOMERS,
      payload: customers.data.records,
    });
  };
};

export const addcustomer = (
  e: Omit<CustomerTypes.Customer, "id" | "solde_init">
) => {
  try {
    return async (dispatch: Dispatch<Action>) => {
      const newClient = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}customer`,
        data: e,
      });
      newClient?.data?.error
        ? dispatch({
            type: ActionType.ADDCUSTOMER,
            payload: newClient?.data?.error,
          })
        : dispatch({
            type: ActionType.ADDCUSTOMER,
            payload: newClient.data.records,
          });
      !newClient?.data?.error &&
        getcustomers({
          sortBy: "id",
          isAsc: "DESC",
          page: 1,
          perPage: 10,
        });
    };
  } catch (e) {
    console.log(e);
  }
};
export const deletecustomer = (id: CustomerTypes.Customer["id"]) => {
  try {
    return async (dispatch: Dispatch<Action>) => {
      const response = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}customer/${id}`,
      });
      if (response.data.affected === 1) {
        dispatch({
          type: ActionType.DELETECUSTOMER,
          payload: id,
        });
      }
    };
  } catch (e) {
    console.log(e);
  }
};
export const updatecustomer = (e: Partial<CustomerTypes.Customer>) => {
  try {
    return async (dispatch: Dispatch<Action>) => {
      const response = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}customer`,
        data: e,
      });
      console.log(response.data.error);

      response?.data?.error
        ? dispatch({
            type: ActionType.UPDATECUSTOMER,
            payload: response?.data?.error,
          })
        : dispatch({
            type: ActionType.UPDATECUSTOMER,
            payload: response?.data?.records,
          });
    };
  } catch (e) {
    console.log(e);
  }
};
export const getcustomers = ({
  sortBy,
  isAsc,
  perPage,
  page,
}: {
  sortBy: keyof CustomerTypes.Customer;
  isAsc: "ASC" | "DESC";
  perPage: number;
  page: number;
}) => {
  try {
    return async (dispatch: Dispatch<Action>) => {
      dispatch({
        type: ActionType.GETCUSTOMERS,
        payload: {
          data: [],
          total: 0,
        },
      });
      const clis = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}customer/all`,
        params: {
          sortBy,
          isAsc,
          perPage,
          page,
        },
      });

      dispatch({
        type: ActionType.GETCUSTOMERS,
        payload: clis.data.records,
      });
    };
  } catch (e) {
    console.log(e);
  }
};
export const getcustomer = (id: number) => {
  try {
    return async (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.GETCUSTOMER,
        payload: id,
      });
  } catch (e) {
    console.log(e);
  }
};
export const setNoError = () => {
  try {
    return (dispatch: Dispatch<Action>) =>
      dispatch({
        type: ActionType.SETNOERROR,
      });
  } catch (e) {
    console.log(e);
  }
};
// export const ordercustomers = (
//   key: Omit<keyof CustomerTypes.Customer, "crdate_creation" | "last_update">,
//   asc: boolean
// ) => ({
//   type: ActionType.ORDERCUSTOMERS,
//   payload: { key: key, asc: asc },
// });
