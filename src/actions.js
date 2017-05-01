/*
* action types
*/

export const LOAD_DOCUMENT_TYPES = 'LOAD_DOCUMENT_TYPES'
export const MODIFY_DOCUMENT_TYPE = 'MODIFY_DOCUMENT_TYPE'
export const TOGGLE_SUB_DOC_TYPE_DROPDOWN = 'TOGGLE_SUB_DOC_TYPE_DROPDOWN'
export const SUBMIT_FORM = 'SUBMIT_FORM'
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

export function toggleSubDocTypeDropDown(toggle){
  return { type: TOGGLE_SUB_DOC_TYPE_DROPDOWN, toggle:toggle}
}

export function modifyDocSubDocTypeSelection(docSubDocSelection){
  return { type: MODIFY_DOCUMENT_TYPE, currentDocSubDocSelection:docSubDocSelection}
}

export function submitForm(finalFormDraft){
  return { type: SUBMIT_FORM, form:finalFormDraft}
}

export function validateFormSection(section){
  return { type: VALIDATE_FORM_SECTION, section:section}
}
