import React from 'react';
import { View, Text, Button, Image, TouchableOpacity} from 'react-native';
import LoginSvg from "../assets/loginButton.svg"
import StartTitle from "../assets/startTitle.svg"
const StartScreen = ({ navigation }) => {
  return (
    <View className = "bg-[#121212] h-full">
        <View className = "bg-[#1EB955] w-[600px] h-[600px] absolute top-[-100px] border rounded-full self-center items-center">
        </View>
        <View className = "top-[100px]">
            <StartTitle/>
        </View>
        <View className = "bg-white w-[250px] h-[50px] rounded-3xl top-[280px] self-center justify-center items-center">
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}>
                <LoginSvg/>
            </TouchableOpacity>
        </View>
        <View className = "align-center self-center top-[600px]">
            <Text className = "text-center text-[#E0DCDC]">
                Jacqueline Ho
            </Text>
            <Text className = "text-center text-[#E0DCDC]">
                Dorian Chen
            </Text>
        </View>
    </View>
  );
}

export default StartScreen;