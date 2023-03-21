import {
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO,
  RESET_ALL,
} from "../actions/Types";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
const initialState = {
  // todoList: firestore().collection("Todo").doc(auth().currentUser.email).get(),
  todoList: [
    // {id: 0,username:'user1',useremail:'user.email@demo.com', title: 'todo1', description: 'tododescription1', completed: false},
  ],
};
const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { todoList: [...state.todoList, action.payload] };

    case REMOVE_TODO:
      return {
        todoList: [
          ...state.todoList.filter((item) => item.title !== action.payload),
        ],
      };

    case UPDATE_TODO:
      const ids = state.todoList.findIndex(
        (item) => item.id == action.payload.id
      );
      state.todoList[ids].title = action.payload.title;
      state.todoList[ids].description = action.payload.description;
      return {
        todoList: [...state.todoList],
      };

    case COMPLETE_TODO:
      const id = state.todoList.find((item) => item.id === action.payload);
      id.completed = !id.completed;
      return {
        todoList: [...state.todoList],
      };

    case RESET_ALL:
      return initialState;

    default:
      return state;
  }
};
export default TodoReducer;
