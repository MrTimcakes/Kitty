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
  password: yup
    .string()
    .label('Password')
    .required()
    .min(6, 'Seems a bit short...')
    .max(256, 'There\'s no way you can remember that, try a shorter password.'),
});



function Signup({firebase, navigation}){

  const handleOnSignin = async (values, actions) => {
    const { email, password } = values
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(result) {
      // navigation.navigate('App');
    })
    .catch(function(error) {
      actions.setFieldError('general', error.message)
    })
    .finally(()=>{
      actions.setSubmitting(false)
    });
  }

  return (
    <SafeAreaView>
      <ImageBackground source={require('kitty/assets/images/HandTap.jpg')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height,}} resizeMode= 'cover'>
        <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']} style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', }} />
        
        <ScrollView>
          <View style={{alignItems: 'center', justifyContent: 'flex-end', height: 220}}>
            <TitlePath width='70%' />
          </View>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            onSubmit={(values, actions) => {
              handleOnSignin(values, actions)
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

                <StyledInput
                  formikProps={formikProps}
                  formikKey="password"
                  placeholder="Password"
                  secureTextEntry
                />

                <View style={{width: '100%', alignItems: 'flex-end'}}>
                  <TouchableOpacity style={{margin:5, marginRight: 50, marginBottom: 10}} onPress={()=>{navigation.navigate('ForgotPassword')}}>
                    <Text style={{color: '#fff'}}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
            

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
                    }}><Text style={{fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: 16, color: '#fff'}}>LOGIN</Text></TouchableOpacity>
                  </View>
                )}
              </React.Fragment>
            )}
          </Formik>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40}}>
            <TouchableOpacity onPress={()=>{navigation.navigate('Signup')}}><Text style={{color:'#fff'}}>Don't have an account? <Text style={{color: Colors.color1}}>Signup</Text></Text></TouchableOpacity>
          </View>
        </ScrollView>

      </ImageBackground>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(Signup);