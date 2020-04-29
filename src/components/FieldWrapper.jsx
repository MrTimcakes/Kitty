import React from 'react';
import { 
  Text, 
  View,
} from 'react-native';

export default FieldWrapper = ({ children, label, formikProps, formikKey }) => (
  <View style={{ marginHorizontal: 40, marginVertical: -10 }}>
    <Text style={{ marginBottom: 3, color: '#fff' }}>{label}</Text>
    {children}
    <Text style={{ color: 'red' }}>
      {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
    </Text>
  </View>
);