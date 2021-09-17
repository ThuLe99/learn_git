import { IUser } from "../../utils/TypeScript";
import {
  GET_OTHER_INFO,
  FOLLOW,
  UN_FOLLOW,
  IGetOtherInfoType,
  IProfileType,
} from "../types/profileType";

const otherInfoReducer = (
  state: IUser[] = [],
  action: IProfileType
): IUser[] => {
  switch (action.type) {
    case GET_OTHER_INFO:
      return [...state, action.payload];
    case FOLLOW:
      console.log(action.payload);
      return state.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );

    default:
      return state;
  }
};

export default otherInfoReducer;
