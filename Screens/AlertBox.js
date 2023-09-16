import * as React from 'react';
import { Ionicons  } from '@expo/vector-icons';
import { View, Text, Button } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming, Easing } from 'react-native-reanimated';

export default function AlertBox({ config, onPress }){

  const { title, message, visible } = config

  console.log(config);

  const sharedVal = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: sharedVal.value }]
    }
  }, [])

  React.useEffect(() => {
    sharedVal.value = withSpring(1)
    return () =>{
      sharedVal.value = 0
    }
  },[visible])

  if (!visible) {
    return null
  }

  return(
    <View
      style={[{ position:'absolute', height: "100%", width:"100%", backgroundColor:"rgba(0,0,0,0.7)", justifyContent:'center', alignItems:'center', zIndex: 1000},

    {}]}>
      <Animated.View style={[{ backgroundColor:'#fefefe', borderRadius: 20, width:'70%'}, animatedStyle]}>
        <View style={{ padding: 40 }}>
          {title && <Text style={{fontSize: 18, fontWeight:'600', textAlign:'center', fontFamily:'OutfitBlack'}}>{title}</Text> }
          <View style={{marginTop: 5}}>
            <Text style={{textAlign:'center', fontSize:15, color:'grey', fontWeight:'500', fontFamily:'OutfitSemiBold'}}>{message}</Text>
          </View>
        </View>
        <View style={{height: 1, backgroundColor:'#f5f5f5', width:'100%'}} />
        <View style={{margin: 10}}>
          <Button title="Ok" color="#ee2c51" onPress={() => onPress({title: null, message:null, visible: false })} />
        </View>
      </Animated.View>
    </View>
  )
}
