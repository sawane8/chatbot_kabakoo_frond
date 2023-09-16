import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';

const { height } = Dimensions.get('window')

export default function ImageGenerator({ navigation }) {

  const [ loading, setLoading ] = useState(false)
  const [ images, setImageLists ] = useState([])

  const textRef = useRef()

  const handbtn = async () => {
    setLoading(true)
    setImageLists([])

    try {
      const resp = await fetch('https://5ee9-137-184-4-156.ngrok.io/image_generator', {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: textRef.current.value
        })
      })
      const res =  await resp.json()
      setImageLists(res.urls)
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ marginTop: 80}}
        showsVerticalScrollIndicator={false}>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom: 60, margin: 10}}>
          <TouchableOpacity
            onPress={()=> navigation.goBack()}
            style={{backgroundColor:'white', borderRadius: 10, padding: 10}}>
            <Ionicons name="chevron-back" size={24}/>
          </TouchableOpacity>
          <View>
            <Text style={{fontFamily:'MontserratBlack', color:'white', fontSize: 18}}>AI Art Generator</Text>
          </View>
          <TouchableOpacity
            onPress={()=> console.log('test')}>
            <Ionicons name="settings-sharp" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{ flex:1, padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor:'#f9d58b'}}>
          <View>
            <Text style={{ margin: 10, fontSize: 16, fontFamily:'MontserratMedium'}}>Décris votre image</Text>
            <TextInput
              ref={textRef}
              multiline={true}
              placeholder="Il n'y a pas de limites dans vos créations: laissez aller votre  imagination de Designer!"
              onChangeText={t => textRef.current.value = t}
              style={{backgroundColor:'whitesmoke', height: 80, borderColor:'white', borderWidth: 1, padding: 20, borderRadius: 10}}
              />
              <TouchableOpacity
                onPress={() => handbtn()}
                style={{ padding: 20, borderRadius: 15, backgroundColor:'#55415d', marginTop: 10}}>
                  <Text style={{fontSize: 18, fontFamily:'MontserratMedium', color:'white', textAlign:'center'}}>Générer</Text>
              </TouchableOpacity>
          </View>
          <View style={{ marginTop: 10}}>
            { images?.length > 0 ?
              <View style={{marginBottom: 20}}>
              {images.map((item) => {
                return(
                  <View style={{ backgroundColor:'whitesmoke', borderRadius: 10, padding: 5, marginVertical: 5}}>
                    <Image source={{uri: item.url}} style={{ height: 320, width: null}} />
                  </View>
                )
              })}
              </View>
              :
              <View style={{height: 480}}>
                {loading && <ActivityIndicator size="large" color="white" />}
              </View>
            }
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#55415d',
  }
});
