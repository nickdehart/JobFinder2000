import { combineReducers } from 'redux';
import documents from './documents';
import tag_data from './tag_data';
import time_data from './time_data';
import type_data from './type_data';

export default combineReducers({
   documents,
   tag_data,
   time_data,
   type_data
});
