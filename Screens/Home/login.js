import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../Loading'
import { StyleSheet, ScrollView, Text, Image, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';



export default function Login({ navigation }) {


  const dispatch = useDispatch()

  const [loaging, setLoading] = useState(false)

  const emailRef = useRef()
  const passwordRef = useRef()

  const { align, textInputStyle } = styles

  const handbtn = async () => {
    setLoading(true)
    const email = emailRef.current.value
    const password = passwordRef.current.value

    try {
      const resp = await fetch('https://5ee9-137-184-4-156.ngrok.io/login', {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
      })
      const res =  await resp.json()
      const { ok } = res;
      setLoading(false)
      if (ok == "Success") {
        dispatch({type:'CONNEXION', value: true})
      }else {
        alert('Vos identifiants sont incorrect')
      }
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex: 1, justifyContent:'center'}}>
      <View style={{ backgroundColor:'#F8F3EA', padding: 20, borderRadius: 10, margin: 40}}>
        <View style={{ alignItems:'center'}}>
          <Image source={{uri: "https://kabakoacademiesoopt.herokuapp.com/public/images/KABAKOO.png"}} style={{ height: 128, width: 239, resizeMode:'contain'}} />
        </View>
        <Text style={{fontSize: 18, textAlign:'center'}}>Bienvenue à Kabakoo Mentor AI !</Text>
        <KeyboardAvoidingView
         behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
         style={{marginVertical: 20}}>
            <TextInput placeholder="Entrez votre e-mail" ref={emailRef} style={textInputStyle} onChangeText={text => emailRef.current.value = text} />
            <TextInput placeholder="Entrez votre mot de passe" secureTextEntry ref={passwordRef} style={textInputStyle} onChangeText={text => passwordRef.current.value = text} />
        </KeyboardAvoidingView>
        <TouchableOpacity
          onPress={()=> handbtn()}
          style={{backgroundColor:"rgb(85, 65, 93)", padding: 20, borderRadius: 10}}>
          <Text style={{color:"white", textAlign:'center'}}>Se connecter</Text>
        </TouchableOpacity>
        <View style={{ height: 1, backgroundColor:" ", width:'80%'}}/>
        <View style={{ marginTop: 20, alignItems:'center'}}>
          <Text style={{textAlign:'center', fontSize: 16}}>Tu n'as pas encore de compte? <TouchableOpacity onPress={() => navigation.navigate('signup')}><Text style={{fontSize: 16, marginTop: 10}}>Crée un compte ici</Text></TouchableOpacity></Text>
        </View>
      </View>
      <StatusBar style="auto" />
      </ScrollView>
      <Loading visible={loaging} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: '#fff',
  },
  align: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle :{
    backgroundColor:'#fff',
    padding: 20,
    marginVertical: 5,
    height: 55,
    borderRadius: 10
  }
});
