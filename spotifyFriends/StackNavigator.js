import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './src/pages/Start';
import HomeScreen from './src/pages/Home';
import LoginScreen from './src/pages/Login';
import ActivityScreen from './src/pages/Activity';
import SettingsScreen from './src/pages/Settings';
import {SafeAreaView} from 'react-native-safe-area-context';

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
          headerTintColor: 'white',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'black',
          },
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
          animation: 'none',
          animationEnabled: false,
          headerLeft: () => null,
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          animation: 'none',
          animationEnabled: false,
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
}
