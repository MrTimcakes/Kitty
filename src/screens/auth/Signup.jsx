import React, { useState, useEffect } from 'react';
import { 
  ScrollView, 
  Text, 
  View,
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
import StyledSwitch from '../../components/StyledSwitch';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .label('Username')
    .required()
    .min(5, 'Username must be atleast ${min} characters')
    .max(256, `Woah, slow down there!`),
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
  confirmPassword: yup
    .string()
    .required()
    .label('Confirm password')
    .test('passwords-match', 'Passwords must match ya fool', function(value) {
      return this.parent.password === value;
    }),
  agreeToTerms: yup
    .boolean()
    .label('Terms')
    .test(
      'is-true',
      'Must agree to terms to continue',
      value => value === true
    ),
});


function Signup({firebase, navigation}){

  // const handleOnSignup = async (values, actions) => {
  //   const { username, email, password } = values;
  //   firebase.auth().createUserWithEmailAndPassword(email, password)
  //   .then(function(result) {
  //     const userData = {
  //       badges: [],
  //       bio: null,
  //       cookingSkill: 0.0,
  //       username: username,
  //       profilePhoto: null,
  //       uid: result.user.uid,
  //       xp: 0.0,
  //       followers: 0,
  //       following: 0,
  //     };
  //     return firebase.createNewUser(userData)
  //     .then(result => {
  //       return result.user.updateProfile({
  //         displayName: username
  //       })
  //       .then(()=>{
  //         navigation.navigate('App')
  //       })
  //     })
  //   }).catch(function(error) {
  //     actions.setFieldError('general', error.message)
  //   })
  //   .finally(()=>{
  //     actions.setSubmitting(false)
  //   });
  // }
  
  const handleOnSignup = async (values, actions) => {
    const { username, email, password } = values;

    firebase.auth().createUserWithEmailAndPassword(email, password) // Create user in auth
    .then( (e) => firebase.auth().currentUser.updateProfile({ displayName: username }) ) // Set Username
    .then( (e) => {
      const userData = {
        badges: [],
        bio: null,
        cookingSkill: 0.0,
        username: username,
        profilePhoto: null,
        uid: firebase.auth().currentUser.uid,
        xp: 0.0,
        followers: 0,
        following: 0,
      };
      return firebase.createNewUser(userData) // Create user in database
    } )
    .catch((error)=>{actions.setFieldError('general', error.message)})
    // .finally(()=>{
    //   if(actions){actions.setSubmitting(false)}
    // });


    // .then( user => {
    //   const userData = {
    //     badges: [],
    //     bio: null,
    //     cookingSkill: 0.0,
    //     username: username,
    //     profilePhoto: null,
    //     uid: user.uid,
    //     xp: 0.0,
    //     followers: 0,
    //     following: 0,
    //   };
    //   console.log(userData);
    //   return firebase.createNewUser(userData) // Create user in database
    // } )
    // .catch((error)=>{actions.setFieldError('general', error.message)})
    // .finally(()=>{
    //   if(actions){actions.setSubmitting(false)}
    // });

  }

  return (
    <SafeAreaView>
      <ImageBackground source={require('kitty/assets/images/Butterfly.jpg')} style={{position: 'absolute', left: 0, right: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height,}} resizeMode='stretch' />
      <LinearGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.9)']} style={{ position: 'absolute', left: 0, right: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }} />
      
      <ScrollView>
        <View style={{alignItems: 'center', justifyContent: 'flex-end', height: 180}}>
          <TitlePath width='70%' />
        </View>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
          }}
          onSubmit={(values, actions) => {
            handleOnSignup(values, actions)
          }}
          validationSchema={validationSchema}
        >
          {formikProps => (
            <React.Fragment>
              <StyledInput
                formikProps={formikProps}
                formikKey="username"
                placeholder="Username"
                autoFocus
              />

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

              <StyledInput
                formikProps={formikProps}
                formikKey="confirmPassword"
                placeholder="Confirm Password"
                secureTextEntry
              />

              <StyledSwitch
                label="Agree to Terms"
                formikKey="agreeToTerms"
                formikProps={formikProps}
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
                  }}><Text style={{fontFamily: 'sans-serif', fontWeight: 'normal', fontSize: 16, color: '#fff'}}>REGISTER</Text></TouchableOpacity>
                </View>
              )}
            </React.Fragment>
          )}
        </Formik>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40}}>
          <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}><Text style={{color:'#fff'}}>Already have an account? <Text style={{color: Colors.color1}}>Login</Text></Text></TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withFirebaseHOC(Signup);