import {
  ADD_TODO,
  CLEAR_ALL,
  COMPLETE_TODO,
  REMOVE_TODO,
  RESET_ALL,
  UPDATE_TODO,
} from "./Types";

export const addtodoAction = (todo) => async (dispatch) => {
  dispatch({ type: ADD_TODO, payload: todo });
};

export const deletetodoAction = (title) => async (dispatch) => {
  dispatch({ type: REMOVE_TODO, payload: title });
};

export const updatetodoAction = (todo) => async (dispatch) => {
  dispatch({ type: UPDATE_TODO, payload: todo });
};

export const completetodoAction = (ids) => async (dispatch) => {
  dispatch({ type: COMPLETE_TODO, payload: ids });
};

export const resettodoAction = () => async (dispatch) => {
  dispatch({ type: RESET_ALL, payload: "" });
};

export const clearAction = () => async (dispatch) => {
  dispatch({ type: CLEAR_ALL });
};
