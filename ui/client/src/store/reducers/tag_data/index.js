import axios from 'axios';

// ACTION TYPE
const SET_TAG_DATA = 'SET_TAG_DATA';

// ACTION CREATORS
export const set_Tag_Data = tag_data => ({
  value: tag_data,
  type: SET_TAG_DATA,
});

// REDUCER
const initialState = [];
export default function(tag_data = initialState, action) {
  switch (action.type) {
    case SET_TAG_DATA:
      return action.value;
    default:
      return tag_data;
  }
}

// THUNKS (async actions)
export const get_Tag_Data = () => dispatch => {
  return axios
    .get('/tag_data')
    .then(res => res.data)
    .then(data => dispatch(set_Tag_Data(data)))
    .catch(console.error);
};
