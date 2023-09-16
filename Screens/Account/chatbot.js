import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import MessageList from './MessageList';
import LottieView from 'lottie-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';

const { height } = Dimensions.get('window')

export default function Chatbot() {

  const dispatch = useDispatch()
  const messageLists = useSelector( state => state.MessageLists )

  const [ message, setMessage ] = useState(null)
  const [ loading, setLoading ] = useState(false)

  const textRef = useRef()
  const animation = useRef(null);

  const handbtn = async (quickQuestion) => {

    let quiz = quickQuestion || message

    setMessage(null)

    dispatch({type:"UPDATE_MESSAGE", payload: { content: quiz, role: "user" }})

    setLoading(true)
    try {
      const resp = await fetch('https://5ee9-137-184-4-156.ngrok.io/ai', {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: quiz
        })
      })
      const res =  await resp.json()
      dispatch({type:"UPDATE_MESSAGE", payload: { content: `${res.message}`, role: "system" }})
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 20 }}>
        { messageLists.length > 0 ?
          <View style={{ marginBottom: height / 3 }}>
            {messageLists.map((item, index) => <MessageList messages={item} key={item.id.toString()} />)}
            { loading &&
              <View style={{ backgroundColor: '#55415d', marginVertical: 10, padding: 20, alignSelf: 'flex-start', width:'45%', borderRadius: 15, borderBottomLeftRadius: 0}}>
                <Text style={{fontSize: 16, fontFamily:'MontserratSemiBold', color:'white', }}>...</Text>
              </View>
            }
          </View>
          :
          <View>
            <Text style={{fontSize: 16, fontWeight:'bold', marginBottom: 10, fontFamily:'MontserratBold'}}> 👋🏿 Je suis Kabakoo Mentor AI, toujours là pour t'aider en répondant à toutes les questions que tu peux avoir pour réussir ta vie, 24/24 🌊 🚀</Text>
            <Text style={{fontFamily:'MontserratLight'}}>Tu peux me poser toutes tes questions comme :</Text>
            <View style={{ marginTop: 10}}>
              <TouchableOpacity
                onPress={() => handbtn('Comment rester motivé ?')}
                style={{ flexDirection:'row', backgroundColor:'#55415d', padding: 10, borderRadius: 10, alignItems:'center', marginVertical: 10}}>
                <View style={{padding: 15, backgroundColor:'white', borderRadius: 10, marginRight: 20}}>
                  <Text>💪🏿</Text>
                </View>
                <Text style={{color:'white', fontFamily:'Montserrat'}}>Comment rester motivé ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handbtn("Comment gagner de l'argent en ligne ?")}
                style={{ flexDirection:'row', backgroundColor:'#55415d', padding: 10, borderRadius: 10, alignItems:'center', marginVertical: 10}}>
                <View style={{padding: 15, backgroundColor:'white', borderRadius: 10, marginRight: 20}}>
                  <Text>💰</Text>
                </View>
                <Text style={{color:'white', fontFamily:'Montserrat'}}>Comment gagner de l'argent en ligne ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handbtn("Aide moi à apprendre l'anglais ?")}
                style={{ flexDirection:'row', backgroundColor:'#55415d', padding: 10, borderRadius: 10, alignItems:'center', marginVertical: 10}}>
                <View style={{padding: 15, backgroundColor:'white', borderRadius: 10, marginRight: 20}}>
                  <Text>📚</Text>
                </View>
                <Text style={{color:'white', fontFamily:'Montserrat'}}>Aide moi à apprendre l'anglais ?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handbtn('Guide moi pour lancer mon business')}
                style={{ flexDirection:'row', backgroundColor:'#55415d', padding: 10, borderRadius: 10, alignItems:'center', marginVertical: 10}}>
                <View style={{padding: 15, backgroundColor:'white', borderRadius: 10, marginRight: 20}}>
                  <Text>💼</Text>
                </View>
                <Text style={{color:'white', fontFamily:'Montserrat'}}>Guide moi pour lancer mon business ?</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        </View>
        </ScrollView>
        <KeyboardAccessoryView
          hideBorder={true}
          alwaysVisible={true}
          androidAdjustResize>
        <View style={{backgroundColor:'white', padding: 20, borderTopLeftRadius: 25, borderTopRightRadius: 25}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
            <TextInput placeholder="Envoyer un message..." value={message} style={{flex: 1, borderRadius: 20, backgroundColor:'rgba(85, 65, 93, 0.30)', padding: 20}} onChangeText={t => setMessage(t)}/>
            <TouchableOpacity
              onPress={() => handbtn()}
              style={{ marginLeft: 10, backgroundColor:'rgba(85, 65, 93, 0.30)', padding: 15, borderRadius: 20}}>
              <Ionicons name="send" size={23} color="#55415d" />
            </TouchableOpacity>
          </View>
        </View>
        </KeyboardAccessoryView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f3ea',
  },
  align: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
