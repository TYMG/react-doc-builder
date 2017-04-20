import React, { Component } from 'react';

class MPNForm extends Component {

  constructor(){
    super();
    this.state = {
      mpn: {}
    }
  }

  mpnFormSubmit(e){
    this.setState({mpn:{
      name:this.refs.name.value,
      addr1:this.refs.addr1.value,
      addr2:this.refs.addr2.value,
      addrCity: this.refs.addrCity.value
    }}, function(){
      this.props.createDocument(this.state.mpn);
    });
    e.preventDefault();
  }

  render(){
      return(
        <form onSubmit={this.mpnFormSubmit.bind(this)}>
        <div>
          <h4>Master Promissory Note</h4>
          <label>MPN Name:</label>&nbsp;
          <input type="text" ref="name"/><br/>
          <label>MPN Address Line 1:</label>&nbsp;
          <input type="text" ref="addr1"/><br/>
          <label>MPN Address Line 2:</label>&nbsp;
          <input type="text" ref="addr2"/><br/>
          <label>MPN Address City:</label>&nbsp;
          <input type="text" ref="addrCity"/><br/>
        </div>
        <br />
        <input type="submit" value="Submit"/>
        <br />
        </form>
      )
  }
}

export default MPNForm;
