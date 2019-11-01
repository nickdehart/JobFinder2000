import axios from 'axios';

// ACTION TYPE
const SET_TIME_DATA = 'SET_TIME_DATA';

// ACTION CREATORS
export const set_Time_Data = time_data => ({
  value: time_data,
  type: SET_TIME_DATA,
});

// REDUCER
const initialState = [];
export default function(time_data = initialState, action) {
  switch (action.type) {
    case SET_TIME_DATA:
      return action.value;
    default:
      return time_data;
  }
}

// THUNKS (async actions)
export const get_Time_Data = params => dispatch => {
  return axios
    .get('/time_data', {
      params,
    })
    .then(res => res.data)
    .then(data => dispatch(set_Time_Data(data)))
    .catch(console.error);
};
