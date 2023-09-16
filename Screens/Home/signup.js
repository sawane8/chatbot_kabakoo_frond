import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, ScrollView, Text, Image, View, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAccessoryView } from 'react-native';

export default function Signup() {

  const emailRef = useRef()
  const passwordRef = useRef()

  const { align, textInputStyle } = styles

  const textRef = useRef()

  const handbtn = async () => {
    setLoading(true)
    console.log(textRef.current.value);
    try {
      const resp = await fetch('https://2204-41-73-104-59.ngrok-free.app/ai', {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: textRef.current.value
        })
      })
      const res =  await resp.json()
      setText(res.message)
      setLoading(false)
    } catch (e) {
      console.log(e);
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
      <View style={{ backgroundColor:'#F8F3EA', padding: 20, borderRadius: 10, margin: 40}}>
        <View style={{ alignItems:'center'}}>
          <Image source={{uri: "https://kabakoacademiesoopt.herokuapp.com/public/images/KABAKOO.png"}} style={{ height: 128, width: 239, resizeMode:'contain'}} />
        </View>
        <Text style={{fontSize: 24, textAlign:'center'}}>Bienvenue à KabakooAI !</Text>
        <View style={{marginVertical: 20}}>
            <TextInput placeholder="Entrez votre e-mail" ref={emailRef} style={textInputStyle} onChangeText={text => emailRef.current.value = text} />
            <TextInput placeholder="Entrez votre mot de passe" secureTextEntry ref={passwordRef} style={textInputStyle} onChangeText={text => passwordRef.current.value = text} />
        </View>
        <TouchableOpacity style={{backgroundColor:"rgb(85, 65, 93)", padding: 20, borderRadius: 10}}>
          <Text style={{color:"white", textAlign:'center'}}>Se connecter</Text>
        </TouchableOpacity>
        <View style={{ height: 1, backgroundColor:" ", width:'80%'}}/>
        <View style={{ marginTop: 20, alignItems:'center'}}>
          <Text style={{textAlign:'center'}}>Tu n'as pas encore de compte? <TouchableOpacity><Text>Crée un compte ici</Text></TouchableOpacity></Text>
        </View>
      </View>
      <StatusBar style="auto" />
      </ScrollView>
    </View>
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
    height: 50,
    borderRadius: 10
  }
});
