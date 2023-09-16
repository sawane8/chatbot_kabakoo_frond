import * as React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';



function GtpMessage({text}) {
  return(
    <View style={{ backgroundColor: '#55415d', marginVertical: 10, padding: 20, alignSelf: 'flex-start', width:'80%', borderRadius: 15, borderTopLeftRadius: 0}}>
      <Text style={{color:"white"}}>{text}</Text>
    </View>
  )
}

function UserMessage({text}) {

  return(
    <View style={{ backgroundColor: 'white', marginVertical: 10, padding: 20, alignSelf: 'flex-end', width:'80%', borderRadius: 15, borderTopRightRadius: 0}}>
      <Text style={{color:"#55415d"}}>{text}</Text>
    </View>
  )
}

export default ({ messages }) => {

  const [test, setTest] = React.useState(null)

  const { role, content } = messages

  // let myText = 'This text is being typed out with javascript';
  // let myArray = myText.split(" ");
  // let loopTimer;
  //
  // function frameLooper() {
  //
  // if(myArray.length > 0) {
  //   setTest(test + myArray.shift())
  // } else {
  //   clearTimeout(loopTimer);
  //   return false;
  // }
  //   loopTimer = setTimeout(frameLooper(),70);
  // }
  // alignSelf: role == "user" ? 'flex-end' : "flex-start" "#55415d"
  // frameLooper();

  return(
    <View>
        { role == "user" ?
          <UserMessage text={content} />
          :
          <GtpMessage text={content} />
        }
    </View>
  );
}
