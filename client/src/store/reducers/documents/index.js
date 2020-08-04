import axios from 'axios';

// ACTION TYPE
const SET_DOCUMENTS = 'SET_DOCUMENTS';

// ACTION CREATORS
export const set_Documents = documents => ({
  value: documents,
  type: SET_DOCUMENTS,
});

// REDUCER
const initialState = [];
export default function(documents = initialState, action) {
  switch (action.type) {
    case SET_DOCUMENTS:
      return action.value;
    default:
      return documents;
  }
}

// THUNKS (async actions)
export const get_Documents = () => dispatch => {
  return axios
    .get('/documents')
    .then(res => res.data)
    .then(data => dispatch(set_Documents(data)))
    .catch(console.error);
};
