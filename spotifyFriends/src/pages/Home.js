import {
  View,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import {BackendContext} from '../utils/Backend';

const HomeScreen = ({navigation}) => {
  const {masterGetActivity} = useContext(BackendContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    masterGetActivity()
      .then(() => {
        setIsLoading(false);
        navigation.navigate('Activity');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        {isLoading && <ActivityIndicator size="small" color="#1EB955" />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
