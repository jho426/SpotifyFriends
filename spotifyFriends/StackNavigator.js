import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './src/pages/Start';
import HomeScreen from './src/pages/Home';
import LoginScreen from './src/pages/Login';
import ActivityScreen from './src/pages/Activity';
import SettingsScreen from './src/pages/Settings';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntIcon from 'react-native-vector-icons/AntDesign'

import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="Start"
        component={StartScreen}
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Activity"
        component={ActivityScreen}
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
      />
         <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            headerShown: false,
            headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
