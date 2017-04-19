import React, { Component } from 'react';

class CorrespondenceForm extends Component {

  constructor(){
    super()
    this.state = {
        correspondence: {}
    }
  }

  corrFormSubmit(e){
    this.setState({correspondence:{
      name:this.refs.name.value,
      addr1:this.refs.addr1.value,
      addr2:this.refs.addr2.value,
      addrCity: this.refs.addrCity.value
    }}, function(){
        this.props.createDocument(this.state.correspondence)
    });
    e.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.corrFormSubmit.bind(this)}>
      <div>
        <h4>Correspondence</h4>
        <label>Correspodence Name:</label>&nbsp;
        <input type="text" ref="name"/><br/>
        <label>Correspodence Address Line 1:</label>&nbsp;
        <input type="text" ref="addr1"/><br/>
        <label>Correspodence Address Line 2:</label>&nbsp;
        <input type="text" ref="addr2"/><br/>
        <label>Correspodence Address City:</label>&nbsp;
        <input type="text" ref="addrCity"/><br/>
      </div>
      <br />
      <input type="submit" value="Submit"/>
      <br />
      </form>
    );
  }

}

export default CorrespondenceForm;
