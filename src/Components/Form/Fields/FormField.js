import React from 'react'

const FormField = ({ input, label, type, meta: { touched, error } }) => (
  <div className="flexbox-row">
    <label className="flex-1">{label}</label>
    <div className="flex-2">
      <input className="wide" {...input} placeholder={label} type='text'/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)

export default FormField