import React, { Component } from 'react'
import HomeContainer from '../../Containers/HomeContainer'

class Home extends Component {
  componentWillMount(){}

  componentUnmount(){}

  render(){
    return(
      <div className='app_home flexbox-column'>
        <HomeContainer/>
      </div>
    )
  }
}

export default Home;
