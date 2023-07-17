import React, {useContext, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { StyleSheet } from 'react-native';

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
      <Text className="text-white text-3xl font-bold m-4 mb-0">Good Morning, {yourActivity.name}</Text>
      <View className="bg-[#181717] w-11/12 h-[100px] self-center rounded-xl m-4">
        <View className="h-[100px] bg-flex flex-row gap-4 my-auto px-2">
          <View className="h-[50px] w-[50px] my-auto">
            {yourActivity.timedifference === "Now" && <View className = "absolute left-[40px] border border-[#181717] z-10" style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: '#1EB955' }} />}
            <Image
              className="rounded-full"
              source={{uri: yourActivity.photo}}
              style={{width: '100%', height: '100%'}}
            />
          </View>
          <View className="flex flex-col gap-1 w-[230px]">
            <Text className="text-white font-bold" numberOfLines={1} ellipsizeMode="tail">
              {yourActivity.name}
            </Text>
            <Text className="text-white" numberOfLines={1} ellipsizeMode="tail">
              {yourActivity.track.name}
            </Text>
            <Text className="text-white"  numberOfLines={1} ellipsizeMode="tail">
              {yourActivity.type === "playlist" ?
                  <IonIcon name="musical-notes-outline" size={12} color="white" solid /> :
                  <MaIcon name="record-circle-outline" size={12} color="white" solid />
                }
              <View className = "spacer w-[5px]"></View>
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
            <View className="h-[50px] w-[50px] my-auto self-center">
            {item.timedifference === "Now" && <View className = "absolute left-[40px] border z-10" style={{ width: 10, height: 10, borderRadius: 50, backgroundColor: '#1EB955' }} />}
              <Image
                className="rounded-full"
                source={{uri: item.user.imageUrl}}
                style={{width: '100%', height: '100%'}}
                key={item.id}
              />
            </View>
            <View className="flex flex-col gap-1 w-[230px]">
              <Text className="text-white font-bold" numberOfLines={1} ellipsizeMode="tail" key={item.id}>
                {item.user.name}
              </Text>
              <Text className="text-white text-ellipsis" key={item.id}>
                {item.track.name}
              </Text>
              
              <Text className="text-white" numberOfLines={1} ellipsizeMode="tail" key={item.id}>
                {item.track.context.uri.includes("playlist") ?
                  <IonIcon name="musical-notes-outline" size={12} color="white" solid /> :
                  <MaIcon name="record-circle-outline" size={12} color="white" solid />
                }
                 <View className = "spacer w-[5px]"></View>
                {item.track.context.name}
              </Text>
            </View>
            <Text className="text-white text-ellipsis" key={item.id}>
              {item.timedifference}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default ActivityScreen;