import * as React from 'react';
import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
const { height: fullHeight, width: fullWidth } = Dimensions.get('window')

export default ({ visible }) => {
  if (!visible) return
  return(
    <View style={{ position: "absolute", height: fullHeight, width: fullWidth, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0, 0.5)'}}>
      <View style={{ backgroundColor:'white', height: 90, width: 90, borderRadius: 10, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" color="#55415d" />
      </View>
    </View>
  )
}
