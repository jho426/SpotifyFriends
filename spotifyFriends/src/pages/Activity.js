import React, {useContext, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'

import {
  ScrollView,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {BackendContext} from '../utils/Backend';
import {RefreshControl} from 'react-native-gesture-handler';

const ActivityScreen = ({navigation}) => {
  const {friendsArray, yourActivity, master_get_activity} = useContext(BackendContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    master_get_activity();
    setTimeout(() => {
      setRefreshing(false);
    }, 100);
  }, []);

  return (
    <ScrollView
      className="bg-[#121212] h-full"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text className="text-white text-3xl font-bold m-4">Good Morning,</Text>
      <View className="bg-[#232323] w-11/12 h-[100px] self-center rounded-xl m-4">
        <View className="h-[100px] flex flex-row gap-4  my-auto px-2">
          <Image
            className="rounded-full"
            source={{uri: yourActivity.photo}}
            style={{width: '13%', height: '45%'}}
          />
          <View className="flex flex-col w-[230px]">
            <Text className="text-white font-bold" numberOfLines={1} ellipsizeMode="tail">
              {yourActivity.name}
            </Text>
            <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
              {yourActivity.track.name}
            </Text>
            <Text className="text-white"  numberOfLines={1} ellipsizeMode="tail">
              {yourActivity.track.album.name}
            </Text>
          </View>
          <Text className="text-white text-[11px]">
            {yourActivity.timedifference}
          </Text>
        </View>
      </View>
      <View className="w-11/12 self-center">
        {friendsArray.map(item => (
          <View className="h-[100px] flex flex-row gap-4 text-ellipsis px-2">
            <Image
              className="rounded-full"
              source={{uri: item.user.imageUrl}}
              style={{width: '13%', height: '45%'}}
              key={item.id}
            />
            <View className="flex flex-col w-[230px]">
              <Text className="text-white font-bold" numberOfLines={1} ellipsizeMode="tail" key={item.id}>
                {item.user.name}
              </Text>
              <Text className="text-white"  numberOfLines={1} ellipsizeMode="tail" key={item.id}>
                {item.track.name}
              </Text>
              
              <Text className="text-white" numberOfLines={1} ellipsizeMode="tail" key={item.id}>
                {item.track.context.uri.includes("playlist") ?
                  <IonIcon name="musical-notes-outline" size={12} color="white" solid /> :
                  <MaIcon name="record-circle-outline" size={12} color="white" solid />
                }
              {item.track.context.name}
              </Text>
            </View>
            <Text className="text-white text-[11px]" key={item.id}>
              {item.timedifference}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ActivityScreen;
