import request from 'request';
import {defineState} from 'redux-localstore'

/**
 * The Form Reducer Handles The Form In The Store
 * 
 * The Form Consists Of:
 * Form <-- The Form Itself; Consists Of Sections and their Input; JSON
 * Section Index <-- Consists of Section Name And Index Within The Array
 * 
 */

const defaultState = {}

const initialState = defineState(defaultState,'backUpForm')


function createDocument(form){
  console.log("Create Document Function Hit");
  var PATH = window.location.pathname;
  //Check if the document is not null
  var options = {
    url: 'http://localhost:8080'+PATH,
    method: 'POST',
    json: form
  }
  request.post(options);
}

const BackUpForm = (state = initialState, action) => {
    switch(action.type) {
        case 'CREATE_FORM':
            return Object.assign({}, state, {
                form:{}
            })
        case 'UPDATE_FORM':
            const updatedDraft = action.form
           return updatedDraft 
            
        case 'AUTO_GENERATE_FORM':
            return Object.assign({}, state, {
                form:action.form
            })
        case 'SUBMIT_FORM':
            createDocument(action.form)
            return Object.assign({}, state, {
            form: {}
          })
        case 'VALIDATE_FORM_SECTION':
            return state;
        default:
            return state;
    }
}

export default BackUpForm
