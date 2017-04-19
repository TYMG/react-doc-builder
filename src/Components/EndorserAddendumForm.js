import React, { Component } from 'react';

class EndorserAddendumForm extends Component {

  constructor(){
    super()
    this.state = {
        endorderAddendum: {}
    }
  }

  eaFormSubmit(e){
    this.setState({endorderAddendum:{
      name:this.refs.name.value,
      addr1:this.refs.addr1.value,
      addr2:this.refs.addr2.value,
      addrCity: this.refs.addrCity.value
    }}, function(){
        this.props.createDocument(this.state.endorderAddendum)
    });
    e.preventDefault();
  }

  render(){
    return (
      <form onSubmit={this.eaFormSubmit.bind(this)}>
      <div>
        <h4>Endorser Addendum</h4>
        <label>Endorser Name:</label>&nbsp;
        <input type="text" ref="name"/><br/>
        <label>Endorser Address Line 1:</label>&nbsp;
        <input type="text" ref="addr1"/><br/>
        <label>Endorser Address Line 2:</label>&nbsp;
        <input type="text" ref="addr2"/><br/>
        <label>Endorser Address City:</label>&nbsp;
        <input type="text" ref="addrCity"/><br/>
      </div>
      <br />
      <input type="submit" value="Submit"/>
      <br />
      </form>
    );
  }

}

export default EndorserAddendumForm;
