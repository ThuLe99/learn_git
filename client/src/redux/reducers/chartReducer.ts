import { IChart } from "./../types/adminTypes";
import * as types from "../types/adminTypes";

const chartReducer = (
  state: IChart[] = [],
  action: types.IAdminType
): IChart[] => {
  switch (action.type) {
    case types.CHART:
      return state.map((item) => item);
    default:
      return state;
  }
};
export default chartReducer;
