import { connect } from 'react-redux'
import { modifyDocSubDocTypeSelection } from '../actions'
import Selector  from '../Components/Selector'
import { Home } from '../Components/Home'

import React , { Component } from 'react';


const mapStateToProps = (state) => {
    return {
        documentTypes: state.documentTypes
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectDocumentType: (docSubDocSelection) => {
            dispatch(modifyDocSubDocTypeSelection(docSubDocSelection))
        }
    }
}

class TestSelector extends Component {
  constructor(){
        super();
        this.state = {
          documentType:'',
          subDocumentType:'',
          documentTypes:[],
          documentSubTypes:[],
          subTypeDD:false
      }
    }
    render(){
      return(
        <div>
          Hello world!!!
          </div>
      )
    }
}

const DocumentTypeSelector = connect (
    mapStateToProps,
    mapDispatchToProps
)(Selector)

export default DocumentTypeSelector