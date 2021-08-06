import { StateType } from './store';
import { ThunkAction } from "redux-thunk";
import { login, getUser } from "../api/api";

const SET_ERROR_MESSAGE = "auth/SET_ERROR_MESSAGE";
const SET_USER_DATA = "auth/SET_USER_DATA";

type InitialStateType = {
  email: string | null,
  name: string | null,
  accessToken: string | null,
  isAuth: boolean,
  isError: boolean,
  errorMessage: string | null,
}

let initialState: InitialStateType = {
  email: "",
  name: "",
  accessToken: "",
  isAuth: false,
  isError: false,
  errorMessage: "",
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        accessToken: action.accessToken,
        email: action.email,
        name: action.name,
        isAuth: action.isAuth,
      };
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        isError: action.isError,
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

type SetUserDataActionType = {
  type: typeof SET_USER_DATA
  email: string | null,
  name: string | null,
  accessToken: string | null,
  isAuth: boolean,
}

export const setUserData = (
  accessToken: string | null,
  email: string | null,
  name: string | null,
  isAuth: boolean
): SetUserDataActionType => ({
  type: SET_USER_DATA,
  accessToken,
  email,
  name,
  isAuth,
});

type SetErrorActionType = {
  type: typeof SET_ERROR_MESSAGE,
  isError: boolean,
  errorMessage: string | null,
}

export const setError = (isError: boolean, errorMessage: string | null): SetErrorActionType => ({
  type: SET_ERROR_MESSAGE,
  isError,
  errorMessage,
});

type ActionsTypes = SetUserDataActionType | SetErrorActionType;
type ThunkType = ThunkAction<Promise<void>, StateType, unknown, ActionsTypes>;

export const getUserProfile = (accessToken: string): ThunkType => async (dispatch) => {
  let response = await getUser(accessToken);
  const { name, email } = response.data.data;
  dispatch(setUserData(accessToken, email, name, true));
};

export const getLoginThunk =
  (clientId: number | null, email: string, password: string): ThunkType => async (dispatch) => {
    try {
      let response = await login(clientId, email, password);
      const { accessToken } = response.data.data;
      dispatch(getUserProfile(accessToken));
    } catch (error) {
      dispatch(setError(true, error.response.data.message));
    }
  };

export default authReducer;
