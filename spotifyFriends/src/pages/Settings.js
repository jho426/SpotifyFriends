import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import React, {useContext} from 'react';

import {BackendContext} from '../utils/Backend';

const SettingsScreen = ({navigation}) => {
  const {
    hardClearCookies,
    yourActivity,
    friendsArray,
    setFriendsArray,
    setYourActivity,
  } = useContext(BackendContext);
  return (
    <>
      <SafeAreaView className="bg-[#121212]">
        <View className="bg-[#121212] h-full">
          <TouchableOpacity
            onPress={async () => {
              await hardClearCookies();
              await setYourActivity({});
              await setFriendsArray([]);
              navigation.navigate('Start');
            }}
            style={{
              marginVertical: 20,
              alignSelf: 'center',
              paddingVertical: 10,
              paddingHorizontal: 15,
              backgroundColor: '#1EB955',
              borderRadius: 50,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{color: '#FFF', fontSize: 18}}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View className="w-full flex flex-row absolute bottom-0 bg-[#121212] items-center justify-center border border-[#181717] border-top-2 h-[100px] opacity-100">
          <View className="my-auto items-center mx-auto">
            <TouchableOpacity>
              <IonIcon
                name="home-outline"
                size={27}
                color="#E0DCDC"
                onPress={async () => {
                  navigation.navigate('Activity');
                }}></IonIcon>
            </TouchableOpacity>
            <Text className="text-[#E0DCDC] text-[11px]">Home</Text>
          </View>
          <View className="my-auto items-center mx-auto">
            <TouchableOpacity>
              <IonIcon
                name="cog"
                size={27}
                color="#E0DCDC"
                onPress={async () => {
                  navigation.navigate('Settings');
                }}></IonIcon>
            </TouchableOpacity>
            <Text className="text-white text-[11px]">Settings</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SettingsScreen;
