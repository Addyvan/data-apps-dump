import { ADD_COLLAB_DATA } from "../actionTypes";

const initialState = {
  data: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_COLLAB_DATA: {
      const { data } = action.payload;
      return {
        ...state,
        allData: [...state.allData, data]
      };
    }
    default:
      return state;
  }
};