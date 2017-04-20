import React, { Component } from 'react';

class Home extends Component {
  constructor(){
    super();
    this.state = {
    }
  }

  render(){
    return(
      <div>
        <h3>Welcome to Doc Creator!!</h3>
        <div>
        <p>
          <strong>How to:</strong><br/>
        </p>
        <ol>
          <li>Select a Document from the drop down menu above</li>
          <li>Fill out the fields in the form</li>
          <li>Review; and when ready, Click 'Submit'</li>
          <li>If there are no errors, a Document will be generated and returned</li>
          </ol>
        </div>
      </div>
    )
  }
}

export default Home;
