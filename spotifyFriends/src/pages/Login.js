import {WebView} from 'react-native-webview';
import React from 'react';
import {SafeAreaView} from 'react-native';

function LoginScreen({navigation}) {
  const handleNavigationStateChange = newNavState => {
    console.log(newNavState.title);
    if (newNavState.title === 'Status - Spotify') {
      navigation.navigate('Home');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
      <WebView
        style={{flex: 1, backgroundColor: '#121212'}}
        source={{uri: 'https://accounts.spotify.com/login'}}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </SafeAreaView>
  );
}

export default LoginScreen;
