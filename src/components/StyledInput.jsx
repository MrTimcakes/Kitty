import React from 'react';
import { 
  TextInput,
} from 'react-native';

import FieldWrapper from './FieldWrapper';

export default StyledInput = ({ label, formikProps, formikKey, ...rest }) => {
  const inputStyles = {
    backgroundColor: '#ffffff60',
    color: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 3,
  };

  if (formikProps.touched[formikKey] && formikProps.errors[formikKey]) {
    inputStyles.borderColor = 'red';
  }

  return (
    <FieldWrapper label={label} formikKey={formikKey} formikProps={formikProps}>
      <TextInput
        style={inputStyles}
        onChangeText={formikProps.handleChange(formikKey)}
        onBlur={formikProps.handleBlur(formikKey)}
        {...rest}
      />
    </FieldWrapper>
  );
};