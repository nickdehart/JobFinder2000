import axios from 'axios';

// ACTION TYPE
const SET_TYPE_DATA = 'SET_TYPE_DATA';

// ACTION CREATORS
export const set_Type_Data = type_data => ({
  value: type_data,
  type: SET_TYPE_DATA,
});

// REDUCER
const initialState = [];
export default function(type_data = initialState, action) {
  switch (action.type) {
    case SET_TYPE_DATA:
      return action.value;
    default:
      return type_data;
  }
}

// THUNKS (async actions)
export const get_Type_Data = params => dispatch => {
  return axios
    .get('/type_data', {
      params,
    })
    .then(res => res.data)
    .then(data => dispatch(set_Type_Data(data)))
    .catch(console.error);
};
