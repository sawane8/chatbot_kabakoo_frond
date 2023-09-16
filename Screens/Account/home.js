import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';

export default ({ navigation }) => {
  return(
    <View style={{flex: 1, backgroundColor:'#55415d'}}>
      <ScrollView>
        <View style={{ margin: 15}}>
          <TouchableOpacity
            onPress={()=> navigation.navigate('chatbot')}
            style={{ padding: 20, borderRadius: 20, backgroundColor:'white'}}>
            <View>
              <Image source={require('../../assets/undraw_Chat_bot_re_e2gj.png')} style={{height: 180, width: 360}} />
            </View>
            <View style={{}}>
              <Text style={{color:'#55415d', fontSize: 13, fontFamily:'MontserratBlack'}}>Kabakoo AI - IA conversationnelle</Text>
              <Text>parlez de tout ce que vous voulez à notre IA générale</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> navigation.navigate('imageGenerator')}
            style={{ padding: 20, borderRadius: 20, backgroundColor:'white', marginVertical: 20}}>
            <View>
              <Image source={require('../../assets/undraw_Making_art_re_ee8w.png')} style={{height: 180, width: 360}} />
            </View>
            <View style={{}}>
              <Text style={{color:'#55415d', fontSize: 13, fontFamily:'MontserratBlack'}}>Kabakoo Image</Text>
              <Text>Kabakoo Image est un générateur d'images IA capable de créer des images et des formes d'art à partir de descriptions textuelles en langage naturel.</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={()=> navigation.navigate('chatbot')}
            style={{ padding: 20, borderRadius: 20, backgroundColor:'white'}}>
            <View>
              <Image source={require('../../assets/undraw_Speech_to_text_re_8mtf.png')} style={{height: 180, width: 360}} />
            </View>
            <View style={{}}>
              <Text style={{color:'#55415d', fontSize: 13, fontFamily:'MontserratBlack'}}>Kabakoo Audio</Text>
              <Text>Kabakoo Audio est un générateur de synthèse vocale par l'intelligence artificielle</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
