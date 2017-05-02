export const buildDocumentTypeList = (documentTypes) => {
  return documentTypes.map( docType =>{
    return docType.name
  })
}

export const buildSubDocumentTypeList = (documentTypes, selectedDocType) => {
  let subDocsTypes
  documentTypes.forEach( (docType,index) =>{
    if(selectedDocType === docType.name){
      if (docType.subtypes.length!==0) {
        let subDocsTypes = docType.subtypes.map( subtype =>{
           return subtype
         })
      }
    }
  })
  return subDocsTypes
}
