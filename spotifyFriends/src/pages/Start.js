import React from 'react';
import { View, Text, Button } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <View>
      <Text className = "text-red-500 ">Welcome to the Start Screen!</Text>
      <Button
        title="Login to Spotify"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

export default StartScreen;