import { combineReducers } from 'redux'
import { CHANGE_DOC_TYPE, CHANGE_SUB_DOC_TYPE } from './actions'

function changeDocumentTypes(state = [], action){
  switch(action.type){
    case CHANGE_DOC_TYPE:
      return [
        ...state,
        {
          documentType:action.type
        }
      ]
    case CHANGE_SUB_DOC_TYPE:
      return [
        ...state,
        {
          subDocumentType:action.type
        }
      ]
    }
  }

// const modDocTypes = combineReducers({
//   changeDocumentTypes
// })

export default changeDocumentTypes;
