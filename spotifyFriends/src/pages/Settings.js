import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React, {useContext} from 'react';
import {BackendContext} from '../utils/Backend';
import AntIcon from 'react-native-vector-icons/AntDesign'

const SettingsScreen = ({navigation}) => {
    const {hardClearCookies} = useContext(BackendContext);
    return (
    <>
      <SafeAreaView className="bg-[#121212]">
        <View className="bg-[#121212] h-full">
          <TouchableOpacity
            onPress={async () => {
              await hardClearCookies();
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
            <Text style={{color: '#FFF', fontSize: 18}}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SettingsScreen;
