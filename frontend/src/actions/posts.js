import { FETCH_ALL } from '../constants/actionTypes';
//, CREATE, UPDATE, DELETE, LIKE }
import * as api from '../api/index.js';

export const getT = () => async dispatch => {
  try {
    const { data } = await api.fetchPosts();
    console.log(data["TableNames"]);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log("ERROR");
  }
}