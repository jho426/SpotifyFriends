/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MyStack } from './StackNavigator'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import BackendProvider from './src/utils/Backend';

function App(): JSX.Element {

  return (
    <NavigationContainer>
      <BackendProvider>
        <MyStack/>
      </BackendProvider>
    </NavigationContainer>
  );
}

export default App;
