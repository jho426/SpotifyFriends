import React from 'react';
import { View, Text, Button } from 'react-native';

function StartScreen({ navigation }) {
  return (
    <View>
      <Text>Welcome to the Start Screen!</Text>
      <Button
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

export default StartScreen;