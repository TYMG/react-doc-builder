import CurrentDocumentTypeSelection from './CurrentDocumentTypeSelection'
import DocumentTypes from './DocumentTypes'
import Form from './Form'

import {reducer as Local} from 'redux-local-state';
import { routerReducer as Router } from 'react-router-redux'

export const selectLocalState = (state) => state.local;

export default {
    CurrentDocumentTypeSelection,
    DocumentTypes,
    Form,
    Router,
    Local
}