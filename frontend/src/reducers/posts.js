import { FETCH_ALL } from '../constants/actionTypes';

const posts = (initialState = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    default:
      return initialState;
  }
};
export default posts;

// export default (initialState =[], action) => {
//   switch (action.type) {
//     case FETCH_ALL:
//       return action.payload;
//     default:
//       return initialState;
//   }
// };