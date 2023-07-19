import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';

import StartTitle from '../assets/startTitle.svg';
import React from 'react';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ImageBackground} from 'react-native';

const StartScreen = ({navigation}) => {
  return (
    <ImageBackground source={require('../assets/start.png')} style={{flex: 1}}>
      <SafeAreaView className="">
        <View className="h-full">
          <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
          <View className="top-[100px]">
            <StartTitle />
          </View>
          <View className="bg-white w-[250px] h-[50px] rounded-3xl top-[45%] self-center justify-center items-center">
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => navigation.navigate('Login')}>
              <MaIcon name="spotify" size={24} color="black" solid />
              <Text style={{marginLeft: 5}}>Login with Spotify®</Text>
            </TouchableOpacity>
          </View>
          <View className="self-center absolute bottom-10">
            <Text className="text-center text-xs text-[#E0DCDC]">
              Jacqueline Ho
            </Text>
            <Text className="text-center text-xs text-[#E0DCDC]">
              Dorian Chen
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default StartScreen;
