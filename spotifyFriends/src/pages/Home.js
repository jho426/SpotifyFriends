import {View, Text, Button} from 'react-native';
import React, {useContext} from 'react';

import {BackendContext} from '../utils/Backend';

const HomeScreen = ({navigation}) => {
  const {masterGetActivity} = useContext(BackendContext);

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
      <Button
        title="Go to Activity"
        onPress={() => navigation.navigate('Activity')}
      />
      <Button
        title="Master"
        onPress={async () => {
          await masterGetActivity();
        }}
      />
    </View>
  );
};

export default HomeScreen;
