import { ADD_COLLAB_DATA } from "./actionTypes";

export const addCollabData = data => ({
  type: ADD_COLLAB_DATA,
  payload: {
    data
  }
});