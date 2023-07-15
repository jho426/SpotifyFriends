import React, {useContext} from 'react';
import {ScrollView, View, Text, Button, Image, TouchableOpacity} from 'react-native';
import {BackendContext} from '../utils/Backend';

const ActivityScreen = ({ navigation }) => {
    const {
        friendsArray
    } = useContext(BackendContext);
    
    return (
        <ScrollView className = "bg-[#121212] h-full">
            <Text className = "text-white text-3xl font-bold m-4">Good Morning,</Text>
            <View className = "bg-[#232323] w-11/12 h-[100px] self-center rounded-xl m-4"></View>
            <View className = "w-11/12 self-center">
            {friendsArray.map((item) => (
                <View className = "h-[100px] flex flex-row gap-4 text-ellipsis">
                    <Image className = "rounded-full" source={{ uri: item.user.imageUrl }} style={{width: '13%', height: '50%'}} key={item.id}/>
                    <View className = "flex flex-col text-ellipsis">
                        <Text className = "text-white text-ellipsis" key={item.id}>{item.user.name}</Text>
                        <Text className = "text-white text-ellipsis" key={item.id}>{item.track.name}</Text>
                        <Text className = "text-white text-ellipsis" key={item.id}>{item.track.context.name}</Text>
                    </View>
                    <Text className = "text-white text-ellipsis" key={item.id}>{item.date.toLocaleString()}</Text>
                </View>
            ))}
            </View>
        </ScrollView>
    );
}

export default ActivityScreen;