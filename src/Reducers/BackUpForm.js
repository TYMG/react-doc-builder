import request from 'request';
import * as fs from 'fs-extra'
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
  const jsonStringifyForm = JSON.stringify(form)
  console.log(jsonStringifyForm)
  var PATH = window.location.pathname;
  const indexOfReviewPathParam =  PATH.lastIndexOf('/Review')
  const cleanPATH = PATH.substring(0,indexOfReviewPathParam)
  //Check if the document is not null
  var options = {
    url: 'http://localhost:8080'+cleanPATH,
    method: 'POST',
    json: form
  }
  request.post(options)
  .on('response', function(response) {
    console.log(response.statusCode) // 200
    console.log(response.headers['content-type']) // 'image/png'
  })
  .on('error', function(err) {
    console.log(err)
  })
  .pipe(fs.createWriteStream('doodle.png'));
}

const BackUpForm = (state = initialState, action) => {
    switch(action.type) {
        /*case 'CREATE_FORM':
            return Object.assign({}, state, {
                form:{}
            })*/
        case 'CLEAR_FORM':
         return {}
        case 'UPDATE_FORM':
            const updatedDraft = action.form
            if(updatedDraft !== undefined){
           return updatedDraft }
           return state
            
        case 'AUTO_GENERATE_FORM':
            return Object.assign({}, state, {
                form:action.form
            })
        case 'SUBMIT_FORM':
            createDocument(state)
            return {}
        case 'VALIDATE_FORM_SECTION':
            return state;
        default:
            return state;
    }
}

export default BackUpForm
