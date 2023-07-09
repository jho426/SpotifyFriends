/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

<<<<<<< HEAD
import React from 'react';
=======
import React, {useState} from 'react';
>>>>>>> initial-build
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  //   let sp_dc = 'm9imVUYoY3Zm5RkPVV3-VI4FM3Teg6kjTliCg5zLm_tav';

  const buddyList = require('spotify-buddylist');

  // TODO: get this function working
  async function getFriendActivity() {
    console.log('here 1');
    const spDcCookie = 'm9imVUYoY3Zm5RkPVV3-VI4FM3Teg6kjTliCg5zLm_tav';

    const {accessToken} = await buddyList.getWebAccessToken(spDcCookie);
    console.log('here 1.5');
    console.log(accessToken);
    const friendActivity = await buddyList.getFriendActivity(accessToken);

    console.log('here 2');
    // console.log(accessToken)
    // console.log(friendActivity)
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
<<<<<<< HEAD
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <LearnMoreLinks />
        </View>
=======
        <Button
          onPress={() => {
            console.log('hello');
            getFriendActivity();
          }}
          title="friendActivity"></Button>
>>>>>>> initial-build
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
