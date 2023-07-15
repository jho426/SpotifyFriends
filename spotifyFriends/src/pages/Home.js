import React, {useState, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {BackendContext} from '../utils/Backend';

const HomeScreen = ({navigation}) => {
  const {
    sp_dc,
    setSp_dc,
    get_sp_dc,
    accessToken,
    setAccessToken,
    get_access_token,
    friendActivity,
    setFriendActivity,
    get_activity,
    clear_cookies,
    get_cookies,
    parseFriendActivity,
    master_get_activity
  } = useContext(BackendContext);

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Start"
        onPress={() => navigation.navigate('Start')}
      />
      <Button
        title="Get Cookies"
        onPress={async () => {
          await get_cookies();
        }}
      />
      <Button
        title="Clear Cookies"
        onPress={async () => {
          await clear_cookies();
        }}
      />
      <Button
        title="Get sp_dc Cookie"
        onPress={async () => {
          await get_sp_dc();
          console.log(sp_dc);
        }}
      />
      <Button
        title="Get Access Token"
        onPress={async () => {
          await get_access_token(sp_dc);
          console.log(accessToken);
        }}
      />
      <Button
        title="Get Activity"
        onPress={async () => {
          await get_activity(accessToken);
          console.log(friendActivity);
        }}
      />
      <Button
        title="Parse Activity"
        onPress={async () => {
          await parseFriendActivity(friendActivity);
        }}
      />
            <Button
        title="Master"
        onPress={async () => {
          await master_get_activity(friendActivity);
        }}
      />
    </View>
  );
};

export default HomeScreen;
