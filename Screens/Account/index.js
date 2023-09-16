import * as React from 'react';
import home from './home';
import chatbot from './chatbot';
import { useDispatch } from 'react-redux';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import imageGenerator from './ImageGenerator';
import { getHeaderTitle } from '@react-navigation/elements';
import { View, SafeAreaView, TouchableOpacity, Text, Platform } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator()

export default () => {

  const dispatch = useDispatch()

  return(
    <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="home" component={home} options={({navigation}) => ({
        title: null,
        headerShadowVisible: false,
        headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: Platform.OS == 'android' ? 11 : 14,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={()=> dispatch({type:'DECONNEXION'})}>
              <SimpleLineIcons name="logout" size={24} color="#55415d" />
            </TouchableOpacity>
          ),

        headerRight: () => (
          <TouchableOpacity
            style={{backgroundColor:'#55415d', padding: 5, borderRadius: 5}}
            onPress={()=> console.log('test')}>
            <Ionicons name="menu-outline" size={24} color="#f9d58b" />
          </TouchableOpacity>
        )
      })} />
      <Stack.Screen name="imageGenerator" component={imageGenerator} options={({navigation}) => ({ headerShown: false})} />
      <Stack.Screen name="chatbot" component={chatbot} options={({navigation}) => ({
        header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);
            return (
              <View style={{ backgroundColor:'#f8f3ea', }}>
                <SafeAreaView style={{ height: 160, backgroundColor:'white', borderBottomRightRadius: 30, borderBottomLeftRadius: 30}}>
                <View style={{flexDirection: 'row', justifyContent:'space-between', marginTop: Platform.OS == 'android' ? 30 : 0, alignItems: 'center', padding: 20}}>
                  <TouchableOpacity
                    style={{ backgroundColor:'#55415d', padding: 15, borderRadius: 90}}
                    onPress={()=> navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#f9d58b" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ backgroundColor:'#55415d', padding: 15, borderRadius: 90}}
                    onPress={()=> dispatch({type:'CLEAR_MESSAGE'})}>
                    <Ionicons name="trash" size={24} color="#f9d58b" />
                  </TouchableOpacity>
                </View>
                </SafeAreaView>
              </View>
            );
          }
        })}/>
    </Stack.Navigator>
  )
}
