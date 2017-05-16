import React from 'react'


export const buildDocumentTypeList = (documentTypes) => {
  let documentTypeList = documentTypes.map(docType => {
    return docType.name
  })
  return documentTypeList;
}

export const buildSubDocumentTypeList = (documentTypes, selectedDocType) => {
  let subDocsTypes = undefined
  documentTypes.forEach((docType, index) => {
    if (selectedDocType === docType.name) {
      if (docType.subTypes.length !== 0) {
        subDocsTypes = docType.subTypes.map(subtype => subtype.name)
      }
    }
  })
  return subDocsTypes
}

export const buildDocumentTypeDropDownList = (documentTypes) => {
  let documentTypeList = buildDocumentTypeList(documentTypes)

}

export const locateDocumentFields = (documentTypes, docTypeParams) => {
  let documentTypeFields = null
  documentTypes.forEach(documentType => {
    if (documentType.route === docTypeParams.doc) {
      if (documentType.subTypes.length === 0 && documentType.fields.length > 0) {
        //If the itr documentType has no subTypes and HAS fields
        documentTypeFields = documentType.fields
      } else {
        //If the itr document has subTypes
        documentType.subTypes.forEach(subType => {
          if (docTypeParams.subDoc !== undefined && subType.name === docTypeParams.subDoc) {
            documentTypeFields = subType.fields
          }
        })
      }
    }
  })
  return documentTypeFields
}

export const identifyDocTypesRoutes = (documentTypes, docTypeParams) => {
  let documentTypeFields = null
  documentTypes.forEach(documentType => {
    if (documentType.route === docTypeParams.doc) {
      if (documentType.subTypes.length === 0 && documentType.fields.length > 0) {
        //If the itr documentType has no subTypes and HAS fields
        documentTypeFields = {"docType":documentType.name}
      } else {
        //If the itr document has subTypes
        documentType.subTypes.forEach(subType => {
          if (docTypeParams.subDoc !== undefined && subType.name === docTypeParams.subDoc) {
            documentTypeFields = {"docType":documentType.name, "subDocType":subType.name}
          }
        })
      }
    }
  })
  return documentTypeFields
}

export const docTypeRoute = (documentTypes, docType) => {
  let docRoute = null
  documentTypes.forEach(documentType => {
    if (documentType.name === docType) {
      docRoute = documentType.route
      if(documentType.fields.length > 0 && documentType.subTypes.length === 0){
        /**
         * This is to take care of EA which has no subtype, but the Route needs one.
         * So for any document without any subtype, 'Default' will concatted to as
         * the SubType 
         */
        docRoute += '/Default'
      }
    }
  })
  return docRoute
}

/*export const calculateLinksInFlow = (documentTypes, docSubDocParams) => {
  let docTypeSectionArr = undefined
  documentTypes.forEach(type => {
    if(type.name === docSubDocParams.doc){
      if(docSubDocParams.subDoc !== undefined){
        type.subTypes.forEach(subType => {
          if(subType.name === docSubDocParams.subDoc){
            doc
          }
        })
      }else{
        docTypeSectionArr = type.fields
      }
    }
  })
  console.log(inputs)
}*/
/*
export const subDocTypeRoute = (documentTypes, docType) => {
  let subDocRoute = null
  documentTypes.forEach(documentType => {
    if (documentType.name === docType) {
      documentType.forEach( subType => {
        if(subType.name === docType)
      })
    })
    return docRoute
  }*/

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