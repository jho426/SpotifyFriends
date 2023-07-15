import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './src/pages/Start';
import HomeScreen from './src/pages/Home';
import LoginScreen from './src/pages/Login';
import ActivityScreen from "./src/pages/Activity";

const Stack = createStackNavigator();

export function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
    </Stack.Navigator>
  );
}