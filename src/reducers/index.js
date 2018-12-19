import { combineReducers } from "redux";

import auth from "./auth";
import create from "./create";
import submit from "./submit";
import view from "./view";

export default combineReducers({
  auth: auth,
  create: create,
  submit: submit,
  view: view
});
