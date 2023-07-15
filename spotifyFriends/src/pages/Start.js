import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <View className = "bg-white h-full">
      <Text>Welcome to the Start Screen!</Text>
      <View className = "bg-white w-[200px] border rounded-2xl">
      <Image source={require('../assets/login.png')} />
        <Button className = ""
            title="Login to Spotify"
            onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
}

export default StartScreen;