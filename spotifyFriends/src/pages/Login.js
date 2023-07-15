import React from 'react';
import {View, Text, Button} from 'react-native';
import {WebView} from 'react-native-webview';

function LoginScreen({navigation}) {
  return (
    <>
      <View>
        <Text>Welcome to the Login Screen!</Text>
        <Button
          title="Go to Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <WebView
        ref={ref => (this.webview = ref)}
        source={{uri: 'https://open.spotify.com/'}}
      />
    </>
  );
}

export default LoginScreen;
