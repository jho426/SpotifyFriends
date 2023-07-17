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
    hard_clear_cookies,
    soft_clear_cookies,
    get_cookies,
    parse_friend_activity,
    master_get_activity,
    friendsArray,
    get_your_activity,
    yourActivity,
    get_user_profile
  } = useContext(BackendContext);

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Activity"
        onPress={() => navigation.navigate('Activity')}
      />
      <Button
        title="Get Cookies"
        onPress={async () => {
          await get_cookies();
        }}
      />
      <Button
        title="Hard Clear Cookies"
        onPress={async () => {
          await hard_clear_cookies();
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
          await parse_friend_activity(friendActivity);
        }}
      />
      <Button
        title="Your Activity"
        onPress={async () => {
          await get_your_activity(accessToken);
        }}
      />
      <Button
        title="Master"
        onPress={async () => {
            await master_get_activity(0);
        }}
      />
    </View>
  );
};

export default HomeScreen;
