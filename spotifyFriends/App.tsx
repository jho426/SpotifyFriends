/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import axios from 'axios';
import React, {useState} from 'react';
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

  const [sample, setSample] = useState('');

  // TODO: get this function working
  async function getFriendActivity() {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'sp_dc=AQAtOSb9r-paSlmCcnGavPOq-wOaAfUAaqGTbpuaExXFGNUh1ggx3rqVKiR2W_L43GVYBnbJXNyN_V0ugJDWPbQjOywg5fFuc6I0T16dm_nqj36yWsgLTZC_hywo5zL8Z5MiZFfC7sXFvijI9tkxMmMbwxz7XqcB; sp_t=6bcde1423680832d71e3996fe4457a08',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://open.spotify.com/get_access_token?reason=transport&productType=web_player',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  async function example() {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'sp_dc=AQABbS-f7lknfF0z12vLlBo6trJZy0_SoEzSrXp3sqBm02FTDw0zi27g0iqJyHx4Sx5r4QVBEgkdcbXAiSG1r2oZxJJO-ny1CifPUFXXR2ZLRAJRyR72JaYHpj-CW9cCQ6qWBPn2WhRSCByvaEEd-ltUqx6W4x7c; sp_t=6bcde1423680832d71e3996fe4457a08',
    );

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(
      'https://open.spotify.com/get_access_token?reason=transport&productType=web_player',
      requestOptions,
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Button
          onPress={() => {
            console.log('hello');
            example();
          }}
          title="friendActivity"></Button>
        <Text>{sample}</Text>
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
