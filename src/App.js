import './utilities/bodges';
import React from 'react'
import AppContainer from 'kitty/navigation'
import Firebase, { FirebaseProvider } from 'kitty/utilities/Firebase'


import JavascriptTimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
JavascriptTimeAgo.locale(en)

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <AppContainer />
    </FirebaseProvider>
  )
}
