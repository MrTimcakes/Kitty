import './utilities/bodges';
import React from 'react'
import AppContainer from 'kitty/navigation'
import Firebase, { FirebaseProvider } from 'kitty/utilities/Firebase'


import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en);

export default function App() {
  return (
    <FirebaseProvider value={Firebase}>
      <AppContainer />
    </FirebaseProvider>
  )
}
