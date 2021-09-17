import * as types from "../types/adminTypes";
import { IUser } from "../../utils/TypeScript";

const adminReducer = (
  state: IUser[] = [],
  action: types.IAdminType
): IUser[] => {
  switch (action.type) {
    case types.GET_USER:
      return action.payload;

    case types.DELETE_USER:
      return state.filter((item) => item._id !== action.payload);

    default:
      return state;
  }
};

export default adminReducer;
