import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React from 'react';

import LoginSvg from '../assets/loginButton.svg';
import StartTitle from '../assets/startTitle.svg';

const StartScreen = ({navigation}) => {
  return (
    <>
      <SafeAreaView className="bg-[#1EB955]" style={{flex: 0}} />
      <SafeAreaView className="bg-[#121212]">
        <View className="bg-[#121212] h-full">
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <View className="bg-[#1EB955] w-[600px] h-[600px] absolute top-[-100px] border rounded-full self-center items-center"></View>
          <View className="top-[100px]">
            <StartTitle />
          </View>
          <View className="bg-white w-[250px] h-[50px] rounded-3xl top-[280px] self-center justify-center items-center">
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <LoginSvg />
            </TouchableOpacity>
          </View>
          <View className="align-center self-center top-[600px]">
            <Text className="text-center text-[#E0DCDC]">Jacqueline Ho</Text>
            <Text className="text-center text-[#E0DCDC]">Dorian Chen</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default StartScreen;
