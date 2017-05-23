import React from 'react'
import { Link } from 'react-router-dom'


const AppHeader = _ =>
  (
    <header>
      <div className="elem__background">
        <h1 className="centered">Welcome to ACDOE Document Creator</h1>
        <div>
          <ul className="header__links">
            <li className="float-left"><Link className="header__link" to='/'>Home</Link></li>
            <li className="float-left"><a className="header__link" href="#">About</a></li>
          </ul>
        </div>
      </div>
    </header>
  )


export default AppHeader
