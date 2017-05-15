import documentTypeData from '../../documentTypeData.json';

function parseDocumentTypeData(){
  let docTypes = documentTypeData.documentTypes.map( docType =>{
    return docType;
  })
  return docTypes
}

const DocumentTypes = (state = parseDocumentTypeData(), action) => {
  switch(action.type){
    case 'LOAD_DOCUMENT_TYPES':
      return parseDocumentTypeData()
    default:
      return state
  }
}

export default DocumentTypes
