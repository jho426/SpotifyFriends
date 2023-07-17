/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {MyStack} from './StackNavigator';

import BackendProvider from './src/utils/Backend';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <BackendProvider>
        <MyStack />
      </BackendProvider>
    </NavigationContainer>
  );
}

export default App;