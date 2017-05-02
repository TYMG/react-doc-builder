import CurrentDocumentTypeSelection from './CurrentDocumentTypeSelection'
import DocumentTypes from './DocumentTypes'
import Form from './Form'

import { combineReducers } from 'redux';

import {reducer as Local} from 'redux-local-state';
import { routerReducer as Router } from 'react-router-redux'

export const selectLocalState = (state) => state.local;

const RootReducer = combineReducers({
  documentTypes: DocumentTypes,
  form: Form
})

export default RootReducer

// export default {
//     CurrentDocumentTypeSelection,
//     DocumentTypes,
//     Form,
//     Router,
//     Local
// }