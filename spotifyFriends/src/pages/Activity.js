import {RefreshControl} from 'react-native-gesture-handler';
import {
  ScrollView,
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, {useContext, useState} from 'react';

import {BackendContext} from '../utils/Backend';

import noProfile from '../assets/default.jpg';

const ActivityScreen = ({navigation}) => {
  const {friendsArray, yourActivity, masterGetActivity, hardClearCookies} =
    useContext(BackendContext);
  const [refreshing, setRefreshing] = useState(false);

  const currentTime = new Date();
  const hours = currentTime.getHours();

  let greeting;

  if (hours >= 5 && hours < 12) {
    greeting = 'Good Morning';
  } else if (hours >= 12 && hours < 18) {
    greeting = 'Good Afternoon';
  } else {
    greeting = 'Good Evening';
  }

  const fetchActivityData = () => {
    masterGetActivity();
    setRefreshing(false);
  };

  const startRefresh = () => {
    setRefreshing(true);
    fetchActivityData();
  };

  React.useEffect(() => {
    fetchActivityData();
    const interval = setInterval(startRefresh, 120000);

    return () => clearInterval(interval);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    masterGetActivity();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="bg-[#121212]">
      <View>
        <ScrollView
          className="bg-[#121212] h-full"
          refreshControl={
            <RefreshControl
              tintColor={'transparent'}
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['transparent']}
              style={{backgroundColor: 'transparent'}}
              progressBackgroundColor="transparent"
            />
          }>
          {refreshing ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#1EB955" />
              <Text style={styles.loadingText}>Refreshing...</Text>
            </View>
          ) : null}
          <View className="w-[85%]">
            <Text className="text-white text-3xl font-bold mt-4 mx-4 mb-0">
              {' '}
              {greeting},
            </Text>
            {yourActivity?.name && (
              <Text
                className="text-white text-3xl font-bold mb-0 mx-4"
                ellipsizeMode="tail"
                numberOfLines={1}>
                {' '}
                {yourActivity.name}
              </Text>
            )}
          </View>
          {yourActivity && yourActivity.track && (
            <View className="bg-[#181717] w-11/12 h-[100px] self-center rounded-xl m-4">
              <View className="h-[100px] bg-flex flex-row gap-4 my-auto px-2">
                <View className="h-[50px] w-[50px] my-auto">
                  {yourActivity?.timedifference === 'Now' && (
                    <View
                      className="absolute left-[40px] border border-[#181717] z-10"
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 50,
                        backgroundColor: '#1EB955',
                      }}
                    />
                  )}
                  {yourActivity?.photo ? (
                    <Image
                      className="rounded-full"
                      source={{
                        uri: yourActivity.photo,
                      }}
                      style={{width: '100%', height: '100%'}}
                    />
                  ) : (
                    <Image
                      className="rounded-full"
                      source={noProfile}
                      style={{width: '100%', height: '100%'}}
                    />
                  )}
                </View>
                <View className="flex flex-col gap-1 w-[220px]">
                  {yourActivity?.name && (
                    <Text
                      className="text-white font-bold"
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {yourActivity.name}
                    </Text>
                  )}
                  <View className="flex flex-row w-[100%">
                    {yourActivity?.track?.name && (
                      <Text
                        className="text-white max-w-[50%]"
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {yourActivity.track.name}
                      </Text>
                    )}
                    <View className="rounded-full bg-white my-auto mx-[4px] w-[4px] h-[4px]" />
                    {yourActivity?.track?.album?.artists[0]?.name && (
                      <Text
                        className="text-white max-w-[50%]"
                        numberOfLines={1}
                        ellipsizeMode="tail">
                        {yourActivity.track.album.artists[0].name}
                      </Text>
                    )}
                  </View>
                  <Text
                    className="text-white"
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {yourActivity?.type === 'playlist' &&
                    yourActivity?.is_public === true ? (
                      <IonIcon
                        name="musical-notes-outline"
                        size={12}
                        color="white"
                        solid
                      />
                    ) : (
                      <MaIcon
                        name="record-circle-outline"
                        size={12}
                        color="white"
                        solid
                      />
                    )}
                    <View className="spacer w-[5px]"></View>
                    {yourActivity?.type === 'playlist' &&
                    yourActivity?.is_public === true &&
                    yourActivity?.playlist_name ? (
                      <Text>{yourActivity.playlist_name}</Text>
                    ) : (
                      yourActivity?.track?.album?.name && (
                        <Text>{yourActivity.track.album.name}</Text>
                      )
                    )}
                  </Text>
                </View>
                {yourActivity?.timedifference && (
                  <Text className="text-white text-[11px]">
                    {yourActivity.timedifference}
                  </Text>
                )}
              </View>
            </View>
          )}
          <View className="w-11/12 self-center">
            {friendsArray &&
              friendsArray.map(item => (
                <View
                  className="h-[100px] flex flex-row gap-4 text-ellipsis px-2"
                  key={item?.id}>
                  <View
                    className="h-[50px] w-[50px] my-auto self-center"
                    key={item?.id}>
                    {item?.timedifference === 'Now' && (
                      <View
                        className="absolute left-[40px] border z-10"
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 50,
                          backgroundColor: '#1EB955',
                        }}
                        key={item?.id}
                      />
                    )}
                    {item?.user?.imageUrl ? (
                      <Image
                        className="rounded-full"
                        source={{uri: item.user.imageUrl}}
                        style={{width: '100%', height: '100%'}}
                        key={item?.id}
                      />
                    ) : (
                      <Image
                        className="rounded-full"
                        source={noProfile}
                        style={{width: '100%', height: '100%'}}
                        key={item?.id}
                      />
                    )}
                  </View>
                  <View
                    className="flex flex-col gap-1 w-[220px]"
                    key={item?.id}>
                    {item?.user?.name && (
                      <Text
                        className="text-white font-bold"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        key={item.id}>
                        {item.user.name}
                      </Text>
                    )}
                    <View className="flex flex-row w-[100%]" key={item?.id}>
                      {item?.track?.name && (
                        <Text
                          className="text-white max-w-[50%]"
                          key={item.id}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.track.name}
                        </Text>
                      )}
                      <View
                        className="rounded-full bg-white my-auto mx-[4px] w-[4px] h-[4px]"
                        key={item?.id}
                      />
                      {item?.track?.artist?.name && (
                        <Text
                          className="text-white max-w-[50%]"
                          key={item.id}
                          numberOfLines={1}
                          ellipsizeMode="tail">
                          {item.track.artist.name}
                        </Text>
                      )}
                    </View>
                    <Text
                      className="text-white"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      key={item.id}>
                      {item?.track?.context?.uri?.includes('playlist') ? (
                        <IonIcon
                          name="musical-notes-outline"
                          size={12}
                          color="white"
                          solid
                          key={item?.id}
                        />
                      ) : (
                        <MaIcon
                          name="record-circle-outline"
                          size={12}
                          color="white"
                          solid
                          key={item?.id}
                        />
                      )}
                      <View className="spacer w-[5px]" key={item?.id}></View>
                      {item?.track?.context?.name}
                    </Text>
                  </View>
                  <Text className="text-white text-[11px]" key={item?.id}>
                    {item?.timedifference}
                  </Text>
                </View>
              ))}
          </View>
          <View className="w-11/12 self-center h-28" />
        </ScrollView>
      </View>
      <View className="w-full flex flex-row absolute bg-[#121212] items-center justify-center border border-[#181717] border-top-2 h-[100px] opacity-100 bottom-0">
        <View className="my-auto items-center mx-auto">
          <TouchableOpacity>
            <IonIcon
              name="home"
              size={27}
              color="#E0DCDC"
              onPress={async () => {
                navigation.navigate('Activity');
              }}></IonIcon>
          </TouchableOpacity>
          <Text className="text-white text-[11px]">Home</Text>
        </View>
        <View className="my-auto items-center mx-auto">
          <TouchableOpacity>
            <IonIcon
              name="cog-outline"
              size={27}
              color="#E0DCDC"
              onPress={async () => {
                navigation.navigate('Settings');
              }}></IonIcon>
          </TouchableOpacity>
          <Text className="text-[#E0DCDC] text-[11px]">Settings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    marginTop: 1,
    marginBottom: 20,
    height: 40,
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  loadingText: {
    color: '#1EB955',
    marginLeft: 10,
  },
});

export default ActivityScreen;
