import React, { Component } from 'react'

class MasterForm extends Component {

  constructor(){
    super();
    this.state = {

    }
  }

  componentWillMount(){
    this.setState({
      currentDocumentType:this.props.documentType,
      currentSubDocmentType:this.props.subDocumentType
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      currentDocumentType:nextProps.documentType,
      currentSubDocmentType:nextProps.subDocumentType
    })
  }
  
  formSubmit(e){
    this.setState({correspondence:{
      name:this.refs.name.value,
      addr1:this.refs.addr1.value,
      addr2:this.refs.addr2.value,
      addrCity: this.refs.addrCity.value
    }}, function(){
        this.props.createDocument(this.state.correspondence);
    });
    e.preventDefault();
  }

  procesInputs(section){
    return section.input.map( input =>{
      console.log(input)
    return <div key={input.ref}><label>{input.name}:</label>&nbsp;<input type="text" ref={input.ref}/><br/></div>
    //  return <option key={subtype.name} value={subtype.name}>{subtype.name}</option>
    })
  }

  processSection(docTypeFields){
    //Loop through the sections
      return docTypeFields.map( (section,index) => {
        //Build The Section Header
        let sectionInputFields = this.procesInputs(section)
        return section =
          <div key={index}><h3>{section.name}</h3><div>{sectionInputFields}</div></div>
    })
  }

  processFormAndFields(){
    const currDocType = this.props.documentType
    const currSubDocType = this.props.subDocumentType
    let docTypeFieldInputs = null
    if(currDocType.fields.length !== 0 && currDocType.subtypes.length === 0){
      //Loop Through The Fields Creating Input
      docTypeFieldInputs = this.processSection(currDocType.fields)
    }else{
      if(currSubDocType === 'Select'){
        return this.renderSelectDisplay()
    }else{
          //This assumes that the current DocType doesnt have any fields
          //Need to the loop through subtypes
          currDocType.subtypes.forEach ( (sdt,index) =>{
            //In the case where
            if(sdt.name === currSubDocType){
              //Loop Through The Fields Create Input Fields
              docTypeFieldInputs =this.processSection(sdt.fields)
            }
          })
        }
      }
      return this.renderFormAndFields(docTypeFieldInputs)
    }

    renderFormAndFields(listOfInputFields){
      return(
          <form onSubmit={this.formSubmit.bind(this)}>
          <div>
            <h2>{this.state.currentDocumentType.name}</h2>
            {listOfInputFields}
          </div>
          <br />
          <input type="submit" value="Submit"/>
          <br />
          </form>
        );
    }

  renderSelectDisplay(){
    return (
      <h3>Please select a Sub Document Type to continue</h3>
    )
  }

  render(){
    const masterForm = this.processFormAndFields()
    return (
      <div>
        {masterForm}
      </div>
    );
  }

}

export default MasterForm;
