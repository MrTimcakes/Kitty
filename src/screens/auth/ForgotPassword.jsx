import React, { useState, useEffect } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import * as yup from 'yup';
import { withFirebaseHOC } from 'kitty/utilities/Firebase'

import TitlePath from 'kitty/assets/SVG/TitlePath';
import Colors from 'kitty/constants/Colors';

import StyledInput from '../../components/StyledInput';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
});



function Signup({firebase, navigation}){

  const handlePasswordReset = async (values, actions) => {
    const { email } = values

    try {
      await this.props.firebase.passwordReset(email)
      console.log('Password reset email sent successfully')
      this.props.navigation.navigate('Login')
    } catch (error) {
      actions.setFieldError('general', error.message)
    }
  }

  return (
    <SafeAreaView>
      <ImageBackground source={require('kitty/assets/images/StickBoi.jpg')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}} resizeMode= 'cover'>
        <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']} style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', }} />
        
        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'flex-end', height: 220}}>
            <TitlePath width='70%' />
          </View>
          <Formik
            initialValues={{
              email: '',
            }}
            onSubmit={(values, actions) => {
              handlePasswordReset(values, actions)
            }}
            validationSchema={validationSchema}
          >
            {formikProps => (
              <React.Fragment>
                <StyledInput
                  formikProps={formikProps}
                  formikKey="email"
                  placeholder="E-mail"
                />

                {formikProps.isSubmitting ? (
                  <ActivityIndicator />
                ) : (
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity onPress={formikProps.handleSubmit} style={{ 
                      backgroundColor: Colors.color2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '80%',
                      height: 60,
                      borderRadius: 10,
                    }}><Text style={{fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: 16, color: '#fff'}}>SEND E-MAIL</Text></TouchableOpacity>
                  </View>
                )}
              </React.Fragment>
            )}
          </Formik>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}><Text style={{color:'#fff'}}>Remembered your password? <Text style={{color: Colors.color1}}>Back to Login!</Text></Text></TouchableOpacity>
          </View>
        </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(Signup);