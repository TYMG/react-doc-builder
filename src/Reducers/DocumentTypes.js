import documentTypeData from '../../documentTypeData.json';

function parseDocumentTypeData(){
  let docTypes = documentTypeData.documentTypes.map( docType =>{
    return docType;
  })
  return docTypes
}

export default function documentTypes( state = parseDocumentTypeData(), action ) {
    return state;
}


