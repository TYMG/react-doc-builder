import React from 'react';
import { Field, reduxForm } from 'redux-form';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const RadioButton = props => {
  const { handleSubmit, previousPage, radio } = props;
  return (
      <div>
        <label>{radio.label}</label>
        <div>
          <label>
            <Field name={radio.field} component="input" type="radio" value="male" />
            {' '}
            {radio.option1}
          </label>
          <label>
            <Field name={radio.field} component="input" type="radio" value="female" />
            {' '}
            {radio.option2}
          </label>
          <Field name={radio.field} component={renderError} />
        </div>
      </div>
  )
};

export default RadioButton