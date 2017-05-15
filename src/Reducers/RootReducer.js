import CurrentDocumentTypeSelection from './CurrentDocumentTypeSelection'
import DocumentTypes from './DocumentTypes'
import BackUpForm from './BackUpForm'
import FormNavigator from './FormNavigator'

import { combineReducers } from 'redux';

import {reducer as Local} from 'redux-local-state';
import { routerReducer as Router } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'


export const selectLocalState = (state) => state.local;

const RootReducer = combineReducers({
  documentTypes: DocumentTypes,
  formNavigator: FormNavigator,
  backUpForm: BackUpForm,
  form: formReducer     // <---- Mounted at 'form'
})

export default RootReducer

// export default {
//     CurrentDocumentTypeSelection,
//     DocumentTypes,
//     Form,
//     Router,
//     Local
// }
