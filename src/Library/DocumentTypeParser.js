export const buildDocumentTypeList = (documentTypes) => {
  let documentTypeList = documentTypes.map( docType =>{
    return docType.name
  })
  return documentTypeList;
}

export const buildSubDocumentTypeList = (documentTypes, selectedDocType) => {
  let subDocsTypes
  documentTypes.forEach( (docType,index) =>{
    if(selectedDocType === docType.name){
      if (docType.subTypes.length!==0) {
        let subDocsTypes = docType.subTypes.map( subtype =>{
           return subtype
         })
      }
    }
  })
  return subDocsTypes
}

export const locateDocumentFields = (documentTypes, docTypeParams) => {
  let documentTypeFields = null 
  documentTypes.forEach( documentType => {
    if(documentType.route === docTypeParams.doc){
      if(documentType.subTypes.length === 0 && documentType.fields.length > 0){
        //If the itr documentType has no subTypes and HAS fields
        documentTypeFields  = documentType.fields
      }else{
        //If the itr document has subTypes
        documentType.subTypes.forEach( subType => {
          if(docTypeParams.subDoc!== undefined && subType.name === docTypeParams.subDoc){
            documentTypeFields =  subType.fields
          }
        })
      }
    }
  })
  return documentTypeFields
}

/*
procesInputs(section) {
    return section.input.map(input => {
      if (input.active) {
        let uniqueRef = input.ref + section.ref;
        return <div key={input.ref}><label>{input.name}:</label>&nbsp;<input type="text" ref={uniqueRef} /><br /></div>
        //  return <option key={subtype.name} value={subtype.name}>{subtype.name}</option>
      }
    })
  }

  processSection(docTypeFields) {
    //Loop through the sections
    return docTypeFields.map((section, index) => {
      //Build The Section Header
      let sectionInputFields = this.procesInputs(section)
      return section =
        <div key={index}><h3>{section.name}</h3><div>{sectionInputFields}</div></div>
    })
  }

  processFormAndFields() {
    const currDocType = this.state.currentDocumentType
    const currSubDocType = this.state.currentSubDocmentType
    let docTypeFieldInputs = null
    if (currDocType.fields.length !== 0 && currDocType.subtypes.length === 0) {
      //Loop Through The Fields Creating Input
      docTypeFieldInputs = this.processSection(currDocType.fields)
    } else {
      if (currSubDocType === 'Select') {
        return this.renderSelectDisplay()
      } else {
        //This assumes that the current DocType doesnt have any fields
        //Need to the loop through subtypes
        currDocType.subtypes.forEach((sdt, index) => {
          //In the case where
          if (sdt.name === currSubDocType) {
            //Loop Through The Fields Create Input Fields
            docTypeFieldInputs = this.processSection(sdt.fields)
          }
        })
      }
    }
    return this.renderFormAndFields(docTypeFieldInputs)
  }*/