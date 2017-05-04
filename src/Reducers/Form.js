import request from 'request';
/**
 * The Form Reducer Handles The Form In The Store
 * 
 * The Form Consists Of:
 * Form <-- The Form Itself; Consists Of Sections and their Input; JSON
 * Section Index <-- Consists of Section Name And Index Within The Array
 * 
 */

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

const Form = (state = {}, action) => {
    switch(action.type) {
        case 'CREATE_FORM':
            return Object.assign({}, state, {
                form:{},
                sectionIndex:1,
                numOfSections:action.numOfSections
            })
        case 'UPDATE_FORM':
            const sectionName = state.sectionName
            Object.assign({}, state, {
                form:{
                    sectionName:state.sectionInfo
                }
            })
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

export default Form
