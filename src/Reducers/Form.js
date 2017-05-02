import request from 'request';

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
