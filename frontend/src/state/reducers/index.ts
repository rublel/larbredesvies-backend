/* 
  this is the root reducer, it combines all the reducers
  and returns the state of the application
*/

import { combineReducers } from "redux";
import { catalogueReducer } from "./catalogue";
import { customerReducer } from "./customer";

const reducers = combineReducers({
  catalogue: catalogueReducer,
  customer: customerReducer,
});

export type State = ReturnType<typeof reducers>;
export default reducers;
