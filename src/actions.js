/*
* action types
*/

export const LOAD_DOCUMENT_TYPES = 'LOAD_DOCUMENT_TYPES'
export const CHANGE_DOC_TYPE = 'CHANGE_DOC_TYPE'
export const CHANGE_SUB_DOC_TYPE = 'CHANGE_SUB_DOC_TYPE'
export const VALIDATE_FORM = 'VALIDATE_FORM'

/*
* Other constraints
*/


/*
* Action Creators
*/

export function loadDocumentTypes(documentTypes){
  return { type: LOAD_DOCUMENT_TYPES, docType:documentTypes}
}

export function changeDocumentType(documentType){
  return { type: CHANGE_DOC_TYPE, docType:documentType}
}

export function changeSubDocumentType(subDocumentType){
  return { type: CHANGE_SUB_DOC_TYPE, subDocType:subDocumentType}
}
