/*
* action types
*/

export const LOAD_DOCUMENT_TYPES = 'LOAD_DOCUMENT_TYPES'

export const MODIFY_DOCUMENT_TYPE = 'MODIFY_DOCUMENT_TYPE'

export const NEXT_FORM_SECTION = 'NEXT_FORM_SECTION'

export const CLEAR_FORM = 'CLEAR_FORM'
export const SUBMIT_FORM = 'SUBMIT_FORM'
export const UPDATE_FORM = 'UPDATE_FORM'
export const AUTO_GENERATE_FORM = 'AUTO_GENERATE_FORM'
export const VALIDATE_FORM_SECTION = 'VALIDATE_FORM_SECTION'

/*
* Other constraints
*/


/*
* Action Creators
*/

export function loadDocumentTypes(documentTypes){
  return { type: LOAD_DOCUMENT_TYPES, docType:documentTypes}
}


export function modifyDocTypeSelection(newDocTypeSelection){
  return { type: MODIFY_DOCUMENT_TYPE, docTypeSelection:newDocTypeSelection}
}

export function nextFormSection(nextFormSection){
  return { type: NEXT_FORM_SECTION, nextFormSection}
}

export function clearForm(finalFormDraft){
  return { type: CLEAR_FORM, finalFormDraft}
}

export function submitCompletedForm(finalFormDraft){
  return { type: SUBMIT_FORM, finalFormDraft}
}

export function updateBackupForm(formDraft){
  return { type: UPDATE_FORM, form:formDraft}
}

export function autoGenerateForm(finalFormDraft){
  return { type: AUTO_GENERATE_FORM, form:finalFormDraft}
}

export function validateFormSection(section){
  return { type: VALIDATE_FORM_SECTION, section:section}
}
