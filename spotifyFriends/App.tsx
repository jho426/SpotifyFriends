/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

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

  const [sample, setSample] = useState("");

  // TODO: get this function working
  async function getFriendActivity() {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'sp_dc=AQAtOSb9r-paSlmCcnGavPOq-wOaAfUAaqGTbpuaExXFGNUh1ggx3rqVKiR2W_L43GVYBnbJXNyN_V0ugJDWPbQjOywg5fFuc6I0T16dm_nqj36yWsgLTZC_hywo5zL8Z5MiZFfC7sXFvijI9tkxMmMbwxz7XqcB; sp_t=ee577364167bc472a3d4fdf5d65c9316',
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
    const accessToken= 'BQCe0wfGCBYOdpYKSfz18GrtZ4zFf4-JWWoz6Qoal6g9y-Drgs3SogKe10BbxnpqHB9PACjyl7_lOSe4B8LsESMZ7slfhWhCEiJeI1CGkmU9fn3EpTXE36Y9tb9t871bhVnLrvRGx3nQTpBYcMSB5GgasvTfv0TedJknr4e2AFBvrnGdKEDU-yoWQMrDBCe82p98Bv0rbfPzo97hPzlEgPI3uS-TEbnMK5t77toWZ5zTUnzNtulBn_jW2bOqPFDS5Trhxr9U8suO5DXUqfsNYEIRpaPpZsoVl_NXRlHX7cj90GRpPw3K7RdlMR8JAaZkVx1M0OcHUHrfzvoUAYFA'
    console.log(accessToken);
    const res = await fetch(
      'https://guc-spclient.spotify.com/presence-view/v1/buddylist',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log(JSON.stringify(res.json(), null, 2));
    console.log(res)
    
    setSample(JSON.stringify(res.json()));
    return res.json()

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
