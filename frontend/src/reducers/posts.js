import { FETCH_DATA } from '../constants/actionTypes';

const posts = (initialState = [], action) => {
  switch (action.type) {
    case FETCH_DATA:
      return action.payload;
    default:
      return initialState;
  }
};
export default posts;
